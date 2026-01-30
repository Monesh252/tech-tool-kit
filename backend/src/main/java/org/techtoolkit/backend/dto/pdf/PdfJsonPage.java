package org.techtoolkit.backend.dto.pdf;

public class PdfJsonPage {
    public int page;
    public String content;

    public PdfJsonPage(int page, String content) {
        this.page = page;
        this.content = content;
    }
}

