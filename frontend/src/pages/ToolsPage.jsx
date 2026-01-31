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
  const [watermarkColor, setWatermarkColor] = useState("#000000");

  // 🔹 PAGE NUMBERS
  const [pageNumberPosition, setPageNumberPosition] = useState("bottom-center");
  const [pageNumberFontSize, setPageNumberFontSize] = useState(12);
  const [pageNumberColor, setPageNumberColor] = useState("#000000");
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
    },
    compress: {
      title: "Compress PDF",
      desc: "Reduce PDF file size while keeping quality",
      icon: "📉",
      format: "compress",
      button: "Compress & Download",
      ext: "pdf",
    },
    split: {
      title: "Split PDF",
      desc: "Extract selected pages from PDF",
      icon: "✂️",
      format: "split",
      button: "Split & Download",
      ext: "pdf",
    },
    word: {
      title: "PDF to Word",
      desc: "Convert PDF to editable Word document",
      icon: "📝",
      format: "word",
      button: "Convert & Download",
    },
    csv: {
      title: "PDF to CSV",
      desc: "Extract tables from PDF into CSV",
      icon: "📊",
      format: "csv",
      button: "Convert & Download",
    },
    jpg: {
      title: "PDF to JPG",
      desc: "Convert each PDF page to JPG images",
      icon: "🖼️",
      format: "jpg",
      button: "Convert & Download",
    },
    markdown: {
      title: "PDF to Markdown",
      desc: "Convert PDF content into Markdown (.md)",
      icon: "📄",
      format: "markdown",
      button: "Convert & Download",
      ext: "md",
    },
    reorder: {
      title: "Reorder PDF",
      desc: "Change the order of PDF pages",
      icon: "🔀",
      format: "reorder",
      button: "Reorder & Download",
    },
    delete: {
      title: "Delete Pages PDF",
      desc: "Remove unwanted pages from PDF",
      icon: "🗑️",
      format: "delete",
      button: "Delete Pages & Download",
    },
    rotate: {
      title: "Rotate PDF Pages",
      desc: "Rotate PDF pages left or right",
      icon: "🔄",
      format: "rotate",
      button: "Rotate & Download",
    },
    watermark: {
      title: "Watermark PDF",
      desc: "Add text watermark to PDF",
      icon: "💧",
      format: "watermark",
      button: "Apply Watermark & Download",
    },
    protect: {
      title: "Protect PDF",
      desc: "Add password protection to PDF",
      icon: "🔒",
      format: "protect",
      button: "Protect & Download",
    },
    unlock: {
      title: "Unlock PDF",
      desc: "Remove password from PDF",
      icon: "🔓",
      format: "unlock",
      button: "Unlock & Download",
    },
    pageNumbers: {
      title: "Add Page Numbers",
      desc: "Insert page numbers into PDF",
      icon: "🔢",
      format: "page-numbers",
      button: "Add Page Numbers & Download",
    },
    extractImages: {
      title: "Extract Images from PDF",
      desc: "Extract all images from PDF pages",
      icon: "🖼️",
      format: "extract-images",
      button: "Extract Images & Download"
    },
    extractText: {
      title: "Extract Text",
      desc: "Extract all text from PDF",
      icon: "📄",
      format: "extract-text",
      button: "Extract Text & Download"
    },
    htmlToPdf: {
      title: "HTML to PDF",
      desc: "Convert HTML content into PDF",
      icon: "🌐",
      format: "html-to-pdf",
      button: "Convert HTML to PDF"
    },
    urlToPdf: {
      title: "URL to PDF",
      desc: "Convert a webpage into PDF",
      icon: "🌍",
      format: "url-to-pdf",
      button: "Convert URL to PDF"
    }

  };

  const config = toolConfig[tool];

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    // 🔹 MERGE → multiple files
    if (tool === "merge") {
      setFiles(selectedFiles);
      return;
    }

    // 🔹 ALL OTHER TOOLS → single file
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

      // 🔹 generate previews
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(selectedFile))
        .promise;

      const previews = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });

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
        console.log("Sending HTML to backend...");

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

    // 🔹 VALIDATION
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

    // 🔹 MERGE → multiple files
    if (tool === "merge") {
      files.forEach((f) => {
        formData.append("files", f);
      });
    }
    // 🔹 ALL OTHER TOOLS → single file
    else if (
      tool !== "htmlToPdf"
    ) {
      formData.append("file", file);
    }

    // 🔹 TOOL-SPECIFIC DATA
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
      <div className="flex flex-col flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">{config.title}</h1>
          <p className="text-gray-600 mb-8">{config.desc}</p>

          <input
            type="file"
            accept="application/pdf"
            multiple
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <div className="bg-white p-12 rounded-xl shadow-lg border-2 border-dashed relative z-10">
            <div className="text-6xl mb-6">{config.icon}</div>

            {tool !== "htmlToPdf" && tool !== "urlToPdf" && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-red-500 text-white px-10 py-3 rounded-lg font-bold hover:bg-red-600"
              >
                Select PDF File
              </button>
            )}

            {tool === "merge" && files.length > 0 && (
              <ul className="mt-4 text-left">
                {files.map((f, i) => (
                  <li key={i} className="text-gray-600">
                    {i + 1}. {f.name}
                  </li>
                ))}
              </ul>
            )}

            {tool !== "merge" && file && (
              <p className="mt-4 text-gray-600">{file.name}</p>
            )}

            {tool === "split" && totalPages && (
              <p className="mt-3 text-gray-500">
                Total pages: <b>{totalPages}</b>
              </p>
            )}

            {tool === "split" && totalPages && (
              <div className="flex justify-center gap-4 mt-6">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={fromPage}
                  onChange={(e) => setFromPage(Number(e.target.value))}
                  className="border p-3 rounded-lg w-32 text-center"
                />
                <input
                  type="number"
                  min={fromPage}
                  max={totalPages}
                  value={toPage}
                  onChange={(e) => setToPage(Number(e.target.value))}
                  className="border p-3 rounded-lg w-32 text-center"
                />
              </div>
            )}

            {tool === "urlToPdf" && (
              <div className="mt-6">
                <label className="block font-semibold mb-2">
                  Enter Website URL
                </label>

                <input
                  type="url"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full border p-3 rounded-lg"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Page will be rendered exactly as in browser
                </p>
              </div>
            )}

            {tool === "reorder" && pageOrder.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                {pageOrder.map((p, idx) => (
                  <div
                    key={p}
                    className="relative bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition p-4"
                  >
                    {/* Page number badge */}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      Page {p}
                    </div>

                    {/* Controls */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx - 1], copy[idx]] = [
                            copy[idx],
                            copy[idx - 1],
                          ];
                          setPageOrder(copy);
                        }}
                        className="w-9 h-9 bg-white border rounded-lg shadow hover:bg-gray-100 disabled:opacity-40"
                      >
                        ⬆️
                      </button>

                      <button
                        disabled={idx === pageOrder.length - 1}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx + 1], copy[idx]] = [
                            copy[idx],
                            copy[idx + 1],
                          ];
                          setPageOrder(copy);
                        }}
                        className="w-9 h-9 bg-white border rounded-lg shadow hover:bg-gray-100 disabled:opacity-40"
                      >
                        ⬇️
                      </button>
                    </div>

                    {/* Preview */}
                    <div className="flex justify-center items-center pt-10">
                      <img
                        src={pagePreviews[p - 1]}
                        alt={`Page ${p}`}
                        className="w-40 border rounded-md shadow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tool === "extractImages" && (
              <p className="mt-4 text-gray-600">
                All images will be extracted and downloaded as a ZIP file.
              </p>
            )}

            {tool === "htmlToPdf" && (
              <div className="mt-6">
                <label className="block font-semibold mb-2">
                  Paste HTML Code
                </label>

                <textarea
                  rows={10}
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="<html><body><h1>Hello PDF</h1></body></html>"
                  className="w-full border p-3 rounded-lg font-mono text-sm"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Full HTML supported (inline CSS allowed)
                </p>
              </div>
            )}


            {tool === "reorder" && pageOrder.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 font-semibold text-gray-700">Page Order</p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {pageOrder.map((p, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 bg-blue-100 rounded-lg font-bold"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tool === "pageNumbers" && file && (
              <div className="mt-8 bg-gray-50 p-6 rounded-xl border space-y-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Page Number Settings
                </h3>

                {/* Position & Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Position
                    </label>
                    <select
                      value={pageNumberPosition}
                      onChange={(e) => setPageNumberPosition(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="bottom-center">Bottom Center</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="top-center">Top Center</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Where the page number appears on each page
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Number Format
                    </label>
                    <select
                      value={pageNumberStyle}
                      onChange={(e) => setPageNumberStyle(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="page-of">Page X of Y</option>
                      <option value="page-only">X</option>
                      <option value="page-slash">X / Y</option>
                      <option value="page-text">Page X</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose how page numbers are displayed
                    </p>
                  </div>
                </div>

                {/* Font & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Font Size
                    </label>
                    <input
                      type="number"
                      min={8}
                      max={40}
                      value={pageNumberFontSize}
                      onChange={(e) => setPageNumberFontSize(+e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 10–14
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={pageNumberColor}
                      onChange={(e) => setPageNumberColor(e.target.value)}
                      className="h-10 w-full cursor-pointer"
                    />
                  </div>
                </div>

                <hr />

                {/* Skip & Roman */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Skip Page Numbers For First
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={skipPages}
                      onChange={(e) => setSkipPages(+e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Example: Enter 2 to skip cover & index pages
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Roman Numerals Until Page
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={romanUntil}
                      onChange={(e) => setRomanUntil(+e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Example: i, ii, iii (front matter)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tool === "delete" && pageOrder.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                {pageOrder.map((p) => {
                  const isDeleted = deletedPages.includes(p);

                  return (
                    <div
                      key={p}
                      className={`relative border rounded-xl p-4 shadow-sm transition
                        ${isDeleted ? "bg-red-50 opacity-60" : "bg-gray-50"}`}
                    >
                      {/* Page number */}
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Page {p}
                      </div>

                      {/* Delete toggle */}
                      <button
                        onClick={() => {
                          setDeletedPages((prev) =>
                            prev.includes(p)
                              ? prev.filter((x) => x !== p)
                              : [...prev, p],
                          );
                        }}
                        className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-bold
                          ${isDeleted ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {isDeleted ? "Undo" : "Delete"}
                      </button>

                      {/* Preview */}
                      <div className="flex justify-center pt-10">
                        <img
                          src={pagePreviews[p - 1]}
                          alt={`Page ${p}`}
                          className="w-40 border rounded-md shadow"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tool === "rotate" && pageOrder.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                {pageOrder.map((p) => {
                  const rotation = rotations[p] || 0;

                  return (
                    <div
                      key={p}
                      className="relative bg-gray-50 border rounded-xl p-4 shadow-sm"
                    >
                      {/* Page badge */}
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Page {p}
                      </div>

                      {/* Controls */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() =>
                            setRotations((r) => ({
                              ...r,
                              [p]: ((r[p] || 0) + 270) % 360,
                            }))
                          }
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          ⟲
                        </button>

                        <button
                          onClick={() =>
                            setRotations((r) => ({
                              ...r,
                              [p]: ((r[p] || 0) + 90) % 360,
                            }))
                          }
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          ⟳
                        </button>
                      </div>

                      {/* Preview */}
                      <div className="flex justify-center pt-10">
                        <img
                          src={pagePreviews[p - 1]}
                          alt={`Page ${p}`}
                          style={{ transform: `rotate(${rotation}deg)` }}
                          className="w-40 border rounded-md shadow transition"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tool === "watermark" && (
              <div className="mt-6 space-y-4">

                <input
                  type="text"
                  placeholder="Enter watermark text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

                <div className="flex gap-4 justify-center">

                  {/* Font size */}
                  <input
                    type="number"
                    value={watermarkFontSize}
                    onChange={(e) => setWatermarkFontSize(+e.target.value)}
                    className="border p-2 rounded w-24"
                    min={10}
                    max={100}
                  />

                  {/* Opacity */}
                  <input
                    type="range"
                    min="0.05"
                    max="0.5"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(+e.target.value)}
                  />

                  {/* Position */}
                  <select
                    value={watermarkPosition}
                    onChange={(e) => setWatermarkPosition(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="center">Center</option>
                    <option value="diagonal">Diagonal</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>

                  {/* Color */}
                  <input
                    type="color"
                    value={watermarkColor}
                    onChange={(e) => setWatermarkColor(e.target.value)}
                    className="h-10 w-20 cursor-pointer"
                  />
                </div>
              </div>
            )}
            {tool === "protect" && (
              <div className="mt-6">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            )}

            {tool === "unlock" && (
              <div className="mt-6">
                <input
                  type="password"
                  placeholder="Enter PDF password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            )}

            {tool === "compress" && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <label className="text-sm font-semibold text-gray-600">
                  Compression Level
                </label>

                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-60 text-center"
                >
                  <option value="screen">High Compression (Smallest)</option>
                  <option value="ebook">Balanced (Recommended)</option>
                  <option value="printer">High Quality</option>
                  <option value="prepress">Best Quality</option>
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={processPdf}
              disabled={loading}
              className="relative z-20 mt-6 bg-blue-600 text-white px-10 py-3 rounded-lg font-bold"
            >
              {loading ? "Processing..." : config.button}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------- ALL TOOLS PAGE --------
  return (
    <div className="flex flex-col flex-grow">
      <div className="bg-gray-50 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">All PDF Tools</h1>
        <p className="text-gray-600">Choose a tool to get started</p>
      </div>
      <Tools />
    </div>
  );
};

export default ToolsPage;