package org.techtoolkit.backend.service.pdf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitUntilState;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.state.PDExtendedGraphicsState;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.util.Matrix;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.techtoolkit.backend.dto.pdf.PdfJsonPage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.graphics.PDXObject;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;


import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.*;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class PdfService {


    public byte[] merge(List<MultipartFile> files) {
        try {
            PDFMergerUtility merger = new PDFMergerUtility();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            merger.setDestinationStream(out);

            for (MultipartFile file : files) {
                merger.addSource(file.getInputStream());
            }

            merger.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly());

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to merge PDFs", e);
        }
    }


    public byte[] toWord(MultipartFile file) throws Exception {
        PDDocument pdf = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(pdf);

        XWPFDocument docx = new XWPFDocument();
        XWPFParagraph para = docx.createParagraph();
        para.createRun().setText(text);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        docx.write(out);

        pdf.close();
        docx.close();

        return out.toByteArray();
    }


    public byte[] toMarkdown(MultipartFile file) throws Exception {
        PDDocument pdf = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(pdf);

        String markdown = text
                .replaceAll("(?m)^(.+)$", "$1\n")
                .replace("\n\n", "\n");

        pdf.close();
        return markdown.getBytes();
    }


    public byte[] toJson(MultipartFile file) throws Exception {
        PDDocument pdf = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();

        List<PdfJsonPage> pages = new ArrayList<>();

        for (int i = 1; i <= pdf.getNumberOfPages(); i++) {
            stripper.setStartPage(i);
            stripper.setEndPage(i);
            pages.add(new PdfJsonPage(i, stripper.getText(pdf)));
        }

        pdf.close();
        return new ObjectMapper().writeValueAsBytes(pages);
    }


    public byte[] toCsv(MultipartFile file) throws Exception {
        PDDocument pdf = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(pdf);

        String csv = text.replaceAll("\\s{2,}", ",");
        pdf.close();

        return csv.getBytes();
    }

    public byte[] toImagesZip(MultipartFile file) throws Exception {
        PDDocument pdf = PDDocument.load(file.getInputStream());
        PDFRenderer renderer = new PDFRenderer(pdf);

        ByteArrayOutputStream zipOut = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(zipOut);

        for (int i = 0; i < pdf.getNumberOfPages(); i++) {
            BufferedImage img = renderer.renderImageWithDPI(i, 200);
            ByteArrayOutputStream imgOut = new ByteArrayOutputStream();
            ImageIO.write(img, "jpg", imgOut);

            zip.putNextEntry(new ZipEntry("page_" + (i + 1) + ".jpg"));
            zip.write(imgOut.toByteArray());
            zip.closeEntry();
        }

        zip.close();
        pdf.close();

        return zipOut.toByteArray();
    }

    public byte[] compressPdf(MultipartFile file, String level) throws Exception {

        File input = File.createTempFile("input-", ".pdf");
        File output = File.createTempFile("output-", ".pdf");
        file.transferTo(input);

        String gsCommand =
                System.getProperty("os.name").toLowerCase().contains("win")
                        ? "gswin64c"
                        : "gs";

        String pdfSetting = switch (level) {
            case "screen" -> "/screen";     // 🔥 maximum compression
            case "printer" -> "/printer";
            case "prepress" -> "/prepress";
            default -> "/ebook";             // balanced
        };

        ProcessBuilder pb = new ProcessBuilder(
                gsCommand,
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                "-dPDFSETTINGS=" + pdfSetting,
                "-dNOPAUSE",
                "-dQUIET",
                "-dBATCH",
                "-sOutputFile=" + output.getAbsolutePath(),
                input.getAbsolutePath()
        );

        Process process = pb.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("Ghostscript failed");
        }

        byte[] result = Files.readAllBytes(output.toPath());
        input.delete();
        output.delete();
        return result;
    }



    public byte[] splitPdf(MultipartFile file, int from, int to) throws Exception {

        PDDocument original = PDDocument.load(file.getInputStream());
        PDDocument result = new PDDocument();

        int totalPages = original.getNumberOfPages();

        if (from < 1 || to > totalPages || from > to) {
            throw new IllegalArgumentException("Invalid page range");
        }

        for (int i = from - 1; i < to; i++) {
            result.addPage(original.getPage(i));
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        result.save(out);

        original.close();
        result.close();

        return out.toByteArray();
    }

    public int getPageCount(MultipartFile file, String password) throws Exception {
        try (PDDocument doc = (password == null || password.isEmpty())
                ? PDDocument.load(file.getBytes())
                : PDDocument.load(file.getBytes(), password)) {

            return doc.getNumberOfPages();
        }
    }


    public byte[] reorderPdf(MultipartFile file, List<Integer> order) throws Exception {
        byte[] bytes = file.getBytes();

        PDDocument src = PDDocument.load(bytes);
        PDDocument out = new PDDocument();

        for (int i : order) {
            out.addPage(src.getPage(i - 1));
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        out.save(baos);

        src.close();
        out.close();

        return baos.toByteArray();
    }

    public byte[] deletePages(MultipartFile file, List<Integer> pagesToDelete) {
        try (PDDocument original = PDDocument.load(file.getInputStream())) {

            int totalPages = original.getNumberOfPages();

            if (pagesToDelete.size() >= totalPages) {
                throw new IllegalArgumentException("Cannot delete all pages");
            }

            if (pagesToDelete.isEmpty()) {
                return file.getBytes();
            }

            PDDocument newDoc = new PDDocument();

            for (int i = 0; i < totalPages; i++) {
                if (!pagesToDelete.contains(i + 1)) {
                    newDoc.importPage(original.getPage(i));
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            newDoc.save(out);
            newDoc.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to delete pages", e);
        }
    }

    public byte[] rotatePdf(MultipartFile file, String rotationsJson) {
        try (PDDocument doc = PDDocument.load(file.getInputStream())) {

            ObjectMapper mapper = new ObjectMapper();
            Map<Integer, Integer> rotations =
                    mapper.readValue(rotationsJson, new TypeReference<>() {});

            for (var entry : rotations.entrySet()) {
                int pageIndex = entry.getKey() - 1;
                int angle = entry.getValue();

                PDPage page = doc.getPage(pageIndex);
                page.setRotation((page.getRotation() + angle) % 360);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to rotate PDF", e);
        }
    }

    public byte[] addWatermark(
            MultipartFile file,
            String text,
            float opacity,
            int fontSize,
            String position,
            String color
    ) {
        try (PDDocument doc = PDDocument.load(file.getBytes())) {

            for (PDPage page : doc.getPages()) {

                PDPageContentStream cs =
                        new PDPageContentStream(
                                doc, page,
                                PDPageContentStream.AppendMode.APPEND,
                                true
                        );

                PDExtendedGraphicsState gs = new PDExtendedGraphicsState();
                gs.setNonStrokingAlphaConstant(opacity);
                cs.setGraphicsStateParameters(gs);

                PDRectangle box = page.getMediaBox();
                float pageWidth = box.getWidth();
                float pageHeight = box.getHeight();

                cs.beginText();
                cs.setFont(PDType1Font.HELVETICA_BOLD, fontSize);
                Color wmColor = hexToColor(color);
                cs.setNonStrokingColor(wmColor);

                float textWidth = fontSize * text.length() * 0.5f;

                if ("center".equals(position)) {
                    cs.newLineAtOffset(
                            (pageWidth - textWidth) / 2,
                            pageHeight / 2
                    );
                } else if ("bottom-right".equals(position)) {
                    cs.newLineAtOffset(
                            pageWidth - textWidth - 40,
                            40
                    );
                } else if ("diagonal".equals(position)) {
                    cs.setTextMatrix(
                            Matrix.getRotateInstance(
                                    Math.toRadians(45),
                                    pageWidth / 3,
                                    pageHeight / 3
                            )
                    );
                }

                cs.showText(text);
                cs.endText();
                cs.close();
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to add watermark", e);
        }
    }

    public byte[] protectPdf(MultipartFile file, String password) {
        try (PDDocument doc = PDDocument.load(file.getBytes())) {

            AccessPermission ap = new AccessPermission();
            ap.setCanPrint(false);
            ap.setCanModify(false);

            StandardProtectionPolicy policy =
                    new StandardProtectionPolicy(password, password, ap);

            policy.setEncryptionKeyLength(128);
            policy.setPermissions(ap);

            doc.protect(policy);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to protect PDF", e);
        }
    }

    public byte[] unlockPdf(MultipartFile file, String password) {
        try (
                PDDocument doc = PDDocument.load(
                        file.getInputStream(),
                        password
                )
        ) {
            // 🔓 Remove security
            doc.setAllSecurityToBeRemoved(true);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (InvalidPasswordException e) {
            throw new RuntimeException("Incorrect password");
        } catch (Exception e) {
            throw new RuntimeException("Failed to unlock PDF", e);
        }
    }

    public byte[] addPageNumbers(
            MultipartFile file,
            String position,
            int fontSize,
            String colorHex,
            String style,
            int skipPages,
            int romanUntil
    ) {
        try (PDDocument doc = PDDocument.load(file.getInputStream())) {

            int totalPages = doc.getNumberOfPages() - skipPages;
            Color color = Color.decode(colorHex);

            int logicalPageNumber = 1; // starts AFTER skip + roman

            for (int i = 0; i < totalPages; i++) {

                int physicalPage = i + 1;

                // 🔹 SKIP pages
                if (physicalPage <= skipPages) {
                    continue;
                }

                PDPage page = doc.getPage(i);
                PDRectangle box = page.getMediaBox();

                String text;

                // 🔹 ROMAN pages
                if (physicalPage <= romanUntil) {
                    text = toRoman(physicalPage - skipPages);
                }
                // 🔹 NORMAL numbering
                else {
                    switch (style) {
                        case "page-only":
                            text = String.valueOf(logicalPageNumber);
                            break;

                        case "page-slash":
                            text = logicalPageNumber + " / " + (totalPages - romanUntil);
                            break;

                        case "page-text":
                            text = "Page " + logicalPageNumber;
                            break;

                        case "page-of":
                        default:
                            text = "Page " + logicalPageNumber + " of " + (totalPages - romanUntil);
                    }

                    logicalPageNumber++;
                }

                float pageWidth = box.getWidth();
                float pageHeight = box.getHeight();
                float textWidth = fontSize * text.length() * 0.5f;

                float x, y;

                switch (position) {
                    case "bottom-left":
                        x = 40;
                        y = 30;
                        break;

                    case "bottom-right":
                        x = pageWidth - textWidth - 40;
                        y = 30;
                        break;

                    case "top-center":
                        x = (pageWidth - textWidth) / 2;
                        y = pageHeight - 40;
                        break;

                    default: // bottom-center
                        x = (pageWidth - textWidth) / 2;
                        y = 30;
                }

                try (PDPageContentStream cs = new PDPageContentStream(
                        doc,
                        page,
                        PDPageContentStream.AppendMode.APPEND,
                        true,
                        true
                )) {
                    cs.beginText();
                    cs.setFont(PDType1Font.HELVETICA, fontSize);
                    cs.setNonStrokingColor(color);
                    cs.newLineAtOffset(x, y);
                    cs.showText(text);
                    cs.endText();
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            doc.save(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to add page numbers", e);
        }
    }

    public byte[] extractImages(MultipartFile file) {
        try (PDDocument doc = PDDocument.load(file.getInputStream())) {

            ByteArrayOutputStream zipOut = new ByteArrayOutputStream();
            ZipOutputStream zip = new ZipOutputStream(zipOut);

            int imageCount = 1;

            for (int pageIndex = 0; pageIndex < doc.getNumberOfPages(); pageIndex++) {
                PDPage page = doc.getPage(pageIndex);
                PDResources resources = page.getResources();

                for (COSName name : resources.getXObjectNames()) {
                    PDXObject xObject = resources.getXObject(name);

                    if (xObject instanceof PDImageXObject image) {
                        BufferedImage bufferedImage = image.getImage();

                        ByteArrayOutputStream imgOut = new ByteArrayOutputStream();
                        ImageIO.write(bufferedImage, "png", imgOut);

                        zip.putNextEntry(
                                new ZipEntry("image_" + imageCount + ".png")
                        );
                        zip.write(imgOut.toByteArray());
                        zip.closeEntry();

                        imageCount++;
                    }
                }
            }

            zip.close();
            return zipOut.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract images", e);
        }
    }

    public byte[] extractText(MultipartFile file) {
        try (PDDocument doc = PDDocument.load(file.getInputStream())) {

            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);

            String text = stripper.getText(doc);

            if (text == null || text.trim().isEmpty()) {
                text = "⚠️ No extractable text found.\n\n" +
                        "This PDF may be scanned or image-based.\n" +
                        "Use OCR to extract text.";
            }

            return text.getBytes(StandardCharsets.UTF_8);

        } catch (Exception e) {
            e.printStackTrace(); // 👈 VERY IMPORTANT
            throw new RuntimeException("Failed to extract text", e);
        }
    }

    public byte[] htmlToPdf(String html) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("HTML to PDF failed", e);
        }
    }

    public byte[] urlToPdf(String url) throws Exception {

        try (Playwright playwright = Playwright.create()) {

            Browser browser = playwright.chromium().launch(
                    new BrowserType.LaunchOptions()
                            .setHeadless(true)
                            .setArgs(List.of(
                                    "--no-sandbox",
                                    "--disable-setuid-sandbox",
                                    "--disable-dev-shm-usage",
                                    "--disable-gpu"
                            ))
            );

            BrowserContext context = browser.newContext(
                    new Browser.NewContextOptions()
                            .setViewportSize(1280, 1024)
            );

            Page page = context.newPage();

            page.navigate(url, new Page.NavigateOptions()
                    .setTimeout(60_000)               // ⬅ IMPORTANT
                    .setWaitUntil(WaitUntilState.LOAD)
            );

            byte[] pdf = page.pdf(
                    new Page.PdfOptions()
                            .setFormat("A4")
                            .setPrintBackground(true)
            );

            browser.close();
            return pdf;
        }
    }


    private Color hexToColor(String hex) {
        if (hex == null || hex.isEmpty()) return Color.BLACK;
        return Color.decode(hex);
    }

    private String toRoman(int num) {
        String[] romans = {
                "","I","II","III","IV","V","VI","VII","VIII","IX",
                "X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"
        };
        return romans[num];
    }

}
