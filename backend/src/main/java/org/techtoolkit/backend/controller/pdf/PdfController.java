package org.techtoolkit.backend.controller.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.techtoolkit.backend.dto.pdf.HtmlRequest;
import org.techtoolkit.backend.service.pdf.PdfService;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping(
            value = "/process",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<byte[]> process(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam("format") String format,
            @RequestParam(value = "from", required = false) Integer from,
            @RequestParam(value = "to", required = false) Integer to,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "deletePages", required = false) String deletePages,
            @RequestParam(value = "rotations", required = false) String rotations,
            @RequestPart(value = "text", required = false) String text,
            @RequestParam(value = "opacity", required = false) Float opacity,
            @RequestParam(value = "fontSize", required = false) Integer fontSize,
            @RequestParam(value = "position", required = false) String position,
            @RequestParam(value = "color", required = false) String color,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "style", required = false) String style,
            @RequestParam(value = "skipPages", required = false, defaultValue = "0") int skipPages,
            @RequestParam(value = "romanUntil", required = false, defaultValue = "0") int romanUntil
            ) throws Exception {

        byte[] result = null;
        String filename = null;
        MediaType type = MediaType.APPLICATION_OCTET_STREAM;

        System.out.println("FORMAT = " + format);
        System.out.println("FILE = " + (file != null));
        System.out.println("TEXT PRESENT = " + (text != null && !text.isBlank()));

        switch (format) {
            case "merge":
                if (files == null || files.size() < 2) {
                    throw new IllegalArgumentException("At least 2 PDFs required");
                }
                result = pdfService.merge(files);
                filename = "merged.pdf";
                break;

            case "word":
                result = pdfService.toWord(file);
                filename = "output.docx";
                type = MediaType.APPLICATION_OCTET_STREAM;
                break;

            case "markdown":
                result = pdfService.toMarkdown(file);
                filename = "output.md";
                type = MediaType.TEXT_PLAIN;
                break;

            case "json":
                result = pdfService.toJson(file);
                filename = "output.json";
                type = MediaType.APPLICATION_JSON;
                break;

            case "csv":
                result = pdfService.toCsv(file);
                filename = "output.csv";
                type = MediaType.TEXT_PLAIN;
                break;

            case "jpg":
                result = pdfService.toImagesZip(file);
                filename = "pages.zip";
                type = MediaType.APPLICATION_OCTET_STREAM;
                break;

            case "compress":
                result = pdfService.compressPdf(file, level);
                filename = "compressed.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "split":
                if (from == null || to == null) {
                    throw new IllegalArgumentException("from and to parameters are required for split");
                }

                if (from < 1 || to < from) {
                    throw new IllegalArgumentException("Invalid page range");
                }

                result = pdfService.splitPdf(file, from, to);
                filename = "split.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "reorder":
                if (order == null || order.isEmpty()) {
                    throw new IllegalArgumentException("Order parameter missing");
                }

                System.out.println("ORDER RECEIVED = [" + order + "]");
                List<Integer> pageOrder = Arrays.stream(order.split(","))
                        .map(Integer::parseInt)
                        .toList();

                result = pdfService.reorderPdf(file, pageOrder);
                filename = "reordered.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "delete":
                if (deletePages == null || deletePages.isEmpty()) {
                    throw new IllegalArgumentException("deletePages parameter missing");
                }

                List<Integer> pagesToDelete = Arrays.stream(deletePages.split(","))
                        .map(Integer::parseInt)
                        .toList();

                result = pdfService.deletePages(file, pagesToDelete);
                filename = "deleted-pages.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "rotate":
                result = pdfService.rotatePdf(file, rotations);
                filename = "rotated.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "watermark":
                result = pdfService.addWatermark(
                        file, text, opacity, fontSize, position, color
                );
                filename = "watermarked.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "protect":
                result = pdfService.protectPdf(file, password);
                filename = "protected.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "unlock":
                if (password == null || password.isEmpty()) {
                    throw new IllegalArgumentException("Password is required");
                }

                result = pdfService.unlockPdf(file, password);
                filename = "unlocked.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "page-numbers":
                result = pdfService.addPageNumbers(
                        file,
                        position != null ? position : "bottom-center",
                        fontSize != null ? fontSize : 12,
                        color != null ? color : "#000000",
                        style != null ? style : "page-of",
                        skipPages,
                        romanUntil
                );
                filename = "page-numbered.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "extract-images":
                if (file == null) {
                    throw new IllegalArgumentException("PDF file required");
                }
                result = pdfService.extractImages(file);
                filename = "images.zip";
                type = MediaType.APPLICATION_OCTET_STREAM;
                break;

            case "extract-text":
                result = pdfService.extractText(file);
                filename = "extracted-text.txt";
                type = MediaType.TEXT_PLAIN;
                break;

            case "html-to-pdf":
                String html = null;

                if (text != null && !text.isEmpty()) {
                    html = new String(text.getBytes(), StandardCharsets.UTF_8);
                }

                if (html == null || html.isBlank()) {
                    throw new IllegalArgumentException("HTML content is required");
                }

                result = pdfService.htmlToPdf(html);
                filename = "output.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            case "url-to-pdf":
                if (text == null || text.isBlank()) {
                    throw new IllegalArgumentException("URL is required");
                }

                result = pdfService.urlToPdf(text);
                filename = "webpage.pdf";
                type = MediaType.APPLICATION_PDF;
                break;

            default:
                throw new IllegalArgumentException("Invalid format");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(type)
                .body(result);
    }

    @PostMapping("/pages")
    public ResponseEntity<?> getPageCount(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "password", required = false) String password
    ) {
        try {
            return ResponseEntity.ok(pdfService.getPageCount(file, password));
        } catch (InvalidPasswordException e) {
            return ResponseEntity.status(401).body("PASSWORD_REQUIRED");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("INVALID_PDF");
        }
    }

    @PostMapping("/merge")
    public ResponseEntity<byte[]> merge(
            @RequestParam("files") List<MultipartFile> files
    ) throws Exception {
        if (files.size() < 2) {
            throw new IllegalArgumentException("At least 2 PDFs required");
        }

        byte[] result = pdfService.merge(files);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=merged.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(result);
    }

    @PostMapping(
            value = "/html-to-pdf",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_PDF_VALUE
    )
    public ResponseEntity<byte[]> htmlToPdfJson(@RequestBody HtmlRequest request) throws Exception {

        String html = request.getHtml();

        if (html == null || html.isBlank()) {
            throw new IllegalArgumentException("HTML content is required");
        }

        byte[] pdf = pdfService.htmlToPdf(html);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=output.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }


}
