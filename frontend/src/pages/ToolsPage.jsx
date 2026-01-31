// src/pages/ToolsPage.jsx
import React, { useRef, useState } from "react";
import Tools from "../components/Tools/Tools";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const ToolsPage = ({ tool }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // File handling
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Split / reorder
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [pageOrder, setPageOrder] = useState([]);
  const [pagePreviews, setPagePreviews] = useState([]);
  const [deletedPages, setDeletedPages] = useState([]);
  const [rotations, setRotations] = useState({});

  // 🔹 WATERMARK
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.2);
  const [watermarkFontSize, setWatermarkFontSize] = useState(48);
  const [watermarkPosition, setWatermarkPosition] = useState("center");
  const [watermarkColor, setWatermarkColor] = useState("#374151");

  // 🔹 PAGE NUMBERS
  const [pageNumberPosition, setPageNumberPosition] = useState("bottom-center");
  const [pageNumberFontSize, setPageNumberFontSize] = useState(12);
  const [pageNumberColor, setPageNumberColor] = useState("#374151");
  const [pageNumberStyle, setPageNumberStyle] = useState("page-of");
  const [skipPages, setSkipPages] = useState(0);
  const [romanUntil, setRomanUntil] = useState(0);

  // 🔹 SECURITY
  const [password, setPassword] = useState("");

  // 🔹 COMPRESSION
  const [level, setLevel] = useState("ebook");

  const [htmlContent, setHtmlContent] = useState("");

  const toolConfig = {
    merge: {
      title: "Merge PDF",
      desc: "Combine multiple PDFs into one file",
      icon: "🔄",
      format: "merge",
      button: "Merge & Download",
      color: "bg-blue-600",
      iconBg: "bg-blue-100",
    },
    compress: {
      title: "Compress PDF",
      desc: "Reduce PDF file size while keeping quality",
      icon: "📉",
      format: "compress",
      button: "Compress & Download",
      color: "bg-emerald-600",
      iconBg: "bg-emerald-100",
    },
    split: {
      title: "Split PDF",
      desc: "Extract selected pages from PDF",
      icon: "✂️",
      format: "split",
      button: "Split & Download",
      color: "bg-sky-600",
      iconBg: "bg-sky-100",
    },
    word: {
      title: "PDF to Word",
      desc: "Convert PDF to editable Word document",
      icon: "📝",
      format: "word",
      button: "Convert & Download",
      color: "bg-indigo-600",
      iconBg: "bg-indigo-100",
    },
    csv: {
      title: "PDF to CSV",
      desc: "Extract tables from PDF into CSV",
      icon: "📊",
      format: "csv",
      button: "Convert & Download",
      color: "bg-teal-600",
      iconBg: "bg-teal-100",
    },
    jpg: {
      title: "PDF to JPG",
      desc: "Convert each PDF page to JPG images",
      icon: "🖼️",
      format: "jpg",
      button: "Convert & Download",
      color: "bg-amber-600",
      iconBg: "bg-amber-100",
    },
    markdown: {
      title: "PDF to Markdown",
      desc: "Convert PDF content into Markdown (.md)",
      icon: "📄",
      format: "markdown",
      button: "Convert & Download",
      color: "bg-gray-700",
      iconBg: "bg-gray-100",
    },
    reorder: {
      title: "Reorder PDF",
      desc: "Change the order of PDF pages",
      icon: "🔀",
      format: "reorder",
      button: "Reorder & Download",
      color: "bg-violet-600",
      iconBg: "bg-violet-100",
    },
    delete: {
      title: "Delete Pages PDF",
      desc: "Remove unwanted pages from PDF",
      icon: "🗑️",
      format: "delete",
      button: "Delete Pages & Download",
      color: "bg-rose-600",
      iconBg: "bg-rose-100",
    },
    rotate: {
      title: "Rotate PDF Pages",
      desc: "Rotate PDF pages left or right",
      icon: "🔄",
      format: "rotate",
      button: "Rotate & Download",
      color: "bg-cyan-600",
      iconBg: "bg-cyan-100",
    },
    watermark: {
      title: "Watermark PDF",
      desc: "Add text watermark to PDF",
      icon: "💧",
      format: "watermark",
      button: "Apply Watermark & Download",
      color: "bg-blue-500",
      iconBg: "bg-blue-50",
    },
    protect: {
      title: "Protect PDF",
      desc: "Add password protection to PDF",
      icon: "🔒",
      format: "protect",
      button: "Protect & Download",
      color: "bg-amber-600",
      iconBg: "bg-amber-100",
    },
    unlock: {
      title: "Unlock PDF",
      desc: "Remove password from PDF",
      icon: "🔓",
      format: "unlock",
      button: "Unlock & Download",
      color: "bg-emerald-600",
      iconBg: "bg-emerald-100",
    },
    pageNumbers: {
      title: "Add Page Numbers",
      desc: "Insert page numbers into PDF",
      icon: "🔢",
      format: "page-numbers",
      button: "Add Page Numbers & Download",
      color: "bg-indigo-600",
      iconBg: "bg-indigo-100",
    },
    extractImages: {
      title: "Extract Images from PDF",
      desc: "Extract all images from PDF pages",
      icon: "🖼️",
      format: "extract-images",
      button: "Extract Images & Download",
      color: "bg-pink-600",
      iconBg: "bg-pink-100",
    },
    extractText: {
      title: "Extract Text",
      desc: "Extract all text from PDF",
      icon: "📄",
      format: "extract-text",
      button: "Extract Text & Download",
      color: "bg-teal-600",
      iconBg: "bg-teal-100",
    },
    htmlToPdf: {
      title: "HTML to PDF",
      desc: "Convert HTML content into PDF",
      icon: "🌐",
      format: "html-to-pdf",
      button: "Convert HTML to PDF",
      color: "bg-orange-600",
      iconBg: "bg-orange-100",
    },
    urlToPdf: {
      title: "URL to PDF",
      desc: "Convert a webpage into PDF",
      icon: "🌍",
      format: "url-to-pdf",
      button: "Convert URL to PDF",
      color: "bg-blue-700",
      iconBg: "bg-blue-100",
    }
  };

  const config = toolConfig[tool];

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (tool === "merge") {
      setFiles(selectedFiles);
      return;
    }

    const selectedFile = selectedFiles[0];
    setFile(selectedFile);
    setDeletedPages([]);
    setPagePreviews([]);
    setTotalPages(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(`${API_BASE}/api/pdf/pages`, {
        method: "POST",
        body: formData,
      });

      if (res.status === 401) {
        alert("PDF is password protected. Please unlock it first.");
        return;
      }

      const pagesCount = await res.json();
      setTotalPages(pagesCount);
      setPageOrder(Array.from({ length: pagesCount }, (_, i) => i + 1));

      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(selectedFile))
        .promise;

      const previews = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;
        previews.push(canvas.toDataURL());
      }
      setPagePreviews(previews);
    } catch (err) {
      console.error(err);
      alert("Failed to read PDF pages");
    }
  };

  const processPdf = async () => {
    if (tool === "htmlToPdf") {
      if (!htmlContent.trim()) {
        alert("Please enter valid HTML");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("format", "html-to-pdf");
      formData.append("text", htmlContent);

      try {
        const res = await fetch(`${API_BASE}/api/pdf/process`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("HTML to PDF failed");
        const blob = await res.blob();
        download(blob, "html-to-pdf");
      } catch (e) {
        console.error(e);
        alert(e.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (tool === "urlToPdf") {
      if (!htmlContent.trim()) {
        alert("Please enter a URL");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("format", "url-to-pdf");
      let url = htmlContent.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      formData.append("text", url);

      try {
        const res = await fetch(`${API_BASE}/api/pdf/process`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Conversion failed");
        const blob = await res.blob();
        download(blob, "url-to-pdf");
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (tool === "merge" && files.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    if (
      tool !== "merge" &&
      tool !== "htmlToPdf" &&
      tool !== "extractText" &&
      tool !== "extractImages" &&
      !file
    ) {
      alert("Please select a PDF file");
      setLoading(false);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("format", config.format);

    if (tool === "merge") {
      files.forEach((f) => {
        formData.append("files", f);
      });
    } else if (tool !== "htmlToPdf") {
      formData.append("file", file);
    }

    if (tool === "split") {
      formData.append("from", fromPage);
      formData.append("to", toPage);
    }
    if (tool === "reorder") {
      formData.append("order", pageOrder.join(","));
    }
    if (tool === "delete") {
      formData.append("deletePages", deletedPages.join(","));
    }
    if (tool === "compress") {
      formData.append("level", level);
    }
    if (tool === "rotate") {
      formData.append("rotations", JSON.stringify(rotations));
    }
    if (tool === "unlock" || tool === "protect") {
      formData.append("password", password);
    }
    if (tool === "pageNumbers") {
      formData.append("file", file);
      formData.append("position", pageNumberPosition);
      formData.append("fontSize", pageNumberFontSize);
      formData.append("color", pageNumberColor);
      formData.append("style", pageNumberStyle);
      formData.append("skipPages", skipPages);
      formData.append("romanUntil", romanUntil);
    }
    if (tool === "watermark") {
      formData.append("text", watermarkText);
      formData.append("opacity", watermarkOpacity);
      formData.append("fontSize", watermarkFontSize);
      formData.append("position", watermarkPosition);
      formData.append("color", watermarkColor);
    }

    try {
      const res = await fetch(`${API_BASE}/api/pdf/process`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("PDF processing failed");
      }

      const blob = await res.blob();
      if (!blob || blob.size === 0) {
        throw new Error("Empty file received");
      }

      download(blob, config.format);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const download = (blob, format) => {
    const map = {
      merge: "pdf",
      compress: "pdf",
      word: "docx",
      csv: "csv",
      jpg: "zip",
      split: "pdf",
      markdown: "md",
      reorder: "pdf",
      delete: "pdf",
      rotate: "pdf",
      watermark: "pdf",
      protect: "pdf",
      unlock: "pdf",
      "page-numbers": "pdf",
      "extract-images": "zip",
      "extract-text": "txt",
      "html-to-pdf": "pdf",
      "url-to-pdf": "pdf",
    };

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${map[format]}`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      navigate("/completed");
    }, 500);
  };

  if (tool && config) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${config.color} mb-4 shadow-md`}>
              <div className="text-white text-2xl">
                {config.icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {config.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {config.desc}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - File Upload & Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />

                {tool !== "htmlToPdf" && tool !== "urlToPdf" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className="group relative inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Select PDF File{files.length > 0 && ` (${files.length})`}
                      </button>
                    </div>

                    {tool === "merge" && files.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-4">Selected Files ({files.length})</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                          {files.map((f, i) => (
                            <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-600">📄</span>
                                </div>
                                <span className="text-gray-700 truncate max-w-xs">{f.name}</span>
                              </div>
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {(f.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tool !== "merge" && file && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-300 flex items-center justify-center">
                            <span className="text-xl">📄</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{file.name}</h3>
                            <p className="text-sm text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {totalPages} pages
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {tool === "split" && totalPages && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-4">Select Pages to Extract</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">From Page</label>
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min="1"
                                max={totalPages}
                                value={fromPage}
                                onChange={(e) => setFromPage(Number(e.target.value))}
                                className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                              />
                              <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={fromPage}
                                onChange={(e) => setFromPage(Number(e.target.value))}
                                className="w-20 text-center border border-gray-300 rounded-lg p-2 bg-white"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">To Page</label>
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={fromPage}
                                max={totalPages}
                                value={toPage}
                                onChange={(e) => setToPage(Number(e.target.value))}
                                className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                              />
                              <input
                                type="number"
                                min={fromPage}
                                max={totalPages}
                                value={toPage}
                                onChange={(e) => setToPage(Number(e.target.value))}
                                className="w-20 text-center border border-gray-300 rounded-lg p-2 bg-white"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-center text-gray-700">
                          Extracting pages <span className="font-bold text-gray-900">{fromPage}</span> to{" "}
                          <span className="font-bold text-gray-900">{toPage}</span> of {totalPages}
                        </div>
                      </div>
                    )}

                    {/* URL to PDF */}
                    {tool === "urlToPdf" && (
                      <div className="space-y-4">
                        <label className="block font-semibold text-gray-800">
                          Enter Website URL
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <input
                            type="url"
                            value={htmlContent}
                            onChange={(e) => setHtmlContent(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Page will be rendered exactly as in browser
                        </p>
                      </div>
                    )}

                    {/* HTML to PDF */}
                    {tool === "htmlToPdf" && (
                      <div className="space-y-4">
                        <label className="block font-semibold text-gray-800">
                          Paste HTML Code
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <textarea
                            rows={12}
                            value={htmlContent}
                            onChange={(e) => setHtmlContent(e.target.value)}
                            placeholder="<html><body><h1>Hello PDF</h1></body></html>"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Full HTML supported (inline CSS allowed)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Page Management Grids */}
                {(tool === "reorder" || tool === "delete" || tool === "rotate") && pageOrder.length > 0 && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Page Management</h3>
                      <span className="text-sm text-gray-600">{pageOrder.length} pages</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
                      {pageOrder.map((p, idx) => {
                        const isDeleted = deletedPages.includes(p);
                        const rotation = rotations[p] || 0;

                        return (
                          <div
                            key={p}
                            className={`relative rounded-lg border p-4 transition-all duration-200 hover:shadow-md
                              ${tool === "delete" && isDeleted ? "bg-red-50 border-red-200" : "bg-white border-gray-300"}
                            `}
                          >
                            {/* Page Header */}
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium text-gray-700">Page {p}</span>
                              <div className="flex gap-1">
                                {tool === "reorder" && (
                                  <>
                                    <button
                                      disabled={idx === 0}
                                      onClick={() => {
                                        const copy = [...pageOrder];
                                        [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                                        setPageOrder(copy);
                                      }}
                                      className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                                    >
                                      ↑
                                    </button>
                                    <button
                                      disabled={idx === pageOrder.length - 1}
                                      onClick={() => {
                                        const copy = [...pageOrder];
                                        [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                                        setPageOrder(copy);
                                      }}
                                      className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
                                    >
                                      ↓
                                    </button>
                                  </>
                                )}

                                {tool === "delete" && (
                                  <button
                                    onClick={() => {
                                      setDeletedPages((prev) =>
                                        prev.includes(p)
                                          ? prev.filter((x) => x !== p)
                                          : [...prev, p]
                                      );
                                    }}
                                    className={`px-3 py-1 rounded text-sm font-medium transition
                                      ${isDeleted
                                        ? "bg-green-600 text-white hover:bg-green-700"
                                        : "bg-red-600 text-white hover:bg-red-700"
                                      }`}
                                  >
                                    {isDeleted ? "Restore" : "Delete"}
                                  </button>
                                )}

                                {tool === "rotate" && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() =>
                                        setRotations((r) => ({
                                          ...r,
                                          [p]: ((r[p] || 0) + 270) % 360,
                                        }))
                                      }
                                      className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 transition"
                                    >
                                      ↶
                                    </button>
                                    <button
                                      onClick={() =>
                                        setRotations((r) => ({
                                          ...r,
                                          [p]: ((r[p] || 0) + 90) % 360,
                                        }))
                                      }
                                      className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 transition"
                                    >
                                      ↷
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Preview */}
                            <div className="flex justify-center">
                              <img
                                src={pagePreviews[p - 1]}
                                alt={`Page ${p}`}
                                style={{ transform: `rotate(${rotation}deg)` }}
                                className="w-28 border border-gray-300 rounded shadow-sm transition-transform"
                              />
                            </div>

                            {tool === "delete" && isDeleted && (
                              <div className="absolute inset-0 bg-red-50/90 rounded-lg flex items-center justify-center">
                                <span className="text-red-700 font-bold text-sm">DELETED</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Watermark Settings */}
                {tool === "watermark" && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Watermark Settings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text</label>
                          <input
                            type="text"
                            placeholder="Enter watermark text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {watermarkFontSize}px</label>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={watermarkFontSize}
                            onChange={(e) => setWatermarkFontSize(+e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Opacity: {watermarkOpacity}</label>
                          <input
                            type="range"
                            min="0.05"
                            max="0.5"
                            step="0.05"
                            value={watermarkOpacity}
                            onChange={(e) => setWatermarkOpacity(+e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <select
                              value={watermarkPosition}
                              onChange={(e) => setWatermarkPosition(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 transition"
                            >
                              <option value="center">Center</option>
                              <option value="diagonal">Diagonal</option>
                              <option value="bottom-right">Bottom Right</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                            <input
                              type="color"
                              value={watermarkColor}
                              onChange={(e) => setWatermarkColor(e.target.value)}
                              className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page Numbers Settings */}
                {tool === "pageNumbers" && file && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Page Number Settings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                          <select
                            value={pageNumberPosition}
                            onChange={(e) => setPageNumberPosition(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 transition"
                          >
                            <option value="bottom-center">Bottom Center</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="top-center">Top Center</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Number Format</label>
                          <select
                            value={pageNumberStyle}
                            onChange={(e) => setPageNumberStyle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 transition"
                          >
                            <option value="page-of">Page X of Y</option>
                            <option value="page-only">X</option>
                            <option value="page-slash">X / Y</option>
                            <option value="page-text">Page X</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {pageNumberFontSize}px</label>
                          <input
                            type="range"
                            min="8"
                            max="40"
                            value={pageNumberFontSize}
                            onChange={(e) => setPageNumberFontSize(+e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                          <input
                            type="color"
                            value={pageNumberColor}
                            onChange={(e) => setPageNumberColor(e.target.value)}
                            className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skip First Pages</label>
                        <input
                          type="number"
                          min="0"
                          value={skipPages}
                          onChange={(e) => setSkipPages(+e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 transition"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Roman Numerals Until</label>
                        <input
                          type="number"
                          min="0"
                          value={romanUntil}
                          onChange={(e) => setRomanUntil(+e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 transition"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Protection */}
                {(tool === "protect" || tool === "unlock") && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {tool === "protect" ? "Set Password" : "Enter Password"}
                    </h3>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        {tool === "protect" ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder={tool === "protect" ? "Enter password to protect PDF" : "Enter PDF password to unlock"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Compression Settings */}
                {tool === "compress" && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Compression Level</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {["screen", "ebook", "printer", "prepress"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setLevel(lvl)}
                          className={`p-4 rounded-lg border transition-all ${level === lvl
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                        >
                          <div className="font-semibold capitalize text-gray-900">{lvl}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {lvl === "screen" && "Highest compression, smallest size"}
                            {lvl === "ebook" && "Balanced, recommended for most files"}
                            {lvl === "printer" && "High quality, good for printing"}
                            {lvl === "prepress" && "Best quality, professional use"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Process Button & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Process PDF</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Tool</span>
                      <span className="font-semibold text-gray-900">{config.title}</span>
                    </div>
                    {file && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">File</span>
                        <span className="font-semibold text-gray-900 truncate max-w-[150px]">{file.name}</span>
                      </div>
                    )}
                    {totalPages && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Pages</span>
                        <span className="font-semibold text-gray-900">{totalPages}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={processPdf}
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {config.button}
                      </>
                    )}
                  </button>

                  <div className="mt-6 text-sm text-gray-600 space-y-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Your file is processed securely on our servers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Files are automatically deleted after processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------- ALL TOOLS PAGE --------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          All PDF Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our comprehensive suite of PDF tools to edit, convert, and manage your documents
        </p>
      </div>
      <Tools />
    </div>
  );
};

export default ToolsPage;