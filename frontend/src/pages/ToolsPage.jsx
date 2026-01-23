// src/pages/ToolsPage.jsx
import React, { useRef, useState } from "react";
import Tools from "../components/Tools/Tools";

const ToolsPage = ({ tool }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [pageOrder, setPageOrder] = useState([]);

  const toolConfig = {
    merge: {
      title: "Merge PDF",
      desc: "Combine multiple PDFs into one file",
      icon: "🔄",
      format: "merge",
      button: "Merge & Download"
    },
    compress: {
      title: "Compress PDF",
      desc: "Reduce PDF file size while keeping quality",
      icon: "📉",
      format: "compress",
      button: "Compress & Download",
      ext: "pdf"
    },
    split: {
      title: "Split PDF",
      desc: "Extract selected pages from PDF",
      icon: "✂️",
      format: "split",
      button: "Split & Download",
      ext: "pdf"
    },
    word: {
      title: "PDF to Word",
      desc: "Convert PDF to editable Word document",
      icon: "📝",
      format: "word",
      button: "Convert & Download"
    },
    csv: {
      title: "PDF to CSV",
      desc: "Extract tables from PDF into CSV",
      icon: "📊",
      format: "csv",
      button: "Convert & Download"
    },
    jpg: {
      title: "PDF to JPG",
      desc: "Convert each PDF page to JPG images",
      icon: "🖼️",
      format: "jpg",
      button: "Convert & Download"
    },
    markdown: {
      title: "PDF to Markdown",
      desc: "Convert PDF content into Markdown (.md)",
      icon: "📄",
      format: "markdown",
      button: "Convert & Download",
      ext: "md"
    },
    reorder: {
      title: "Reorder PDF",
      desc: "Change the order of PDF pages",
      icon: "🔀",
      format: "reorder",
      button: "Reorder & Download"
    }
  };

  const config = toolConfig[tool];

  const handleFileSelect = async (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  setFile(selectedFile);
  setPageOrder([]);
  setTotalPages(null);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("http://localhost:8080/api/pdf/pages", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Failed to fetch page count");
    }

    const pagesCount = await res.json();

    setTotalPages(pagesCount);

    // ✅ initialize reorder UI
    const initialOrder = Array.from(
      { length: pagesCount },
      (_, i) => i + 1
    );

    setPageOrder(initialOrder);

  } catch (err) {
    console.error(err);
    alert("Failed to read PDF page count");
  }
};


  const processPdf = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", config.format);

    if (tool === "split") {
      formData.append("from", fromPage);
      formData.append("to", toPage);
    }

    if (tool === "reorder") {
      formData.append("order", pageOrder.join(","));
    }


    try {
      const res = await fetch("http://localhost:8080/api/pdf/process", {
        method: "POST",
        body: formData
      });

      const blob = await res.blob();

      if (!blob || blob.size === 0) {
        throw new Error("File processing failed");
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
      reorder: "pdf" 
    };

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${map[format]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -------- TOOL PAGE --------
  if (tool && config) {
    return (
      <div className="flex flex-col flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h1 className="text-4xl font-bold mb-3">{config.title}</h1>
          <p className="text-gray-600 mb-8">{config.desc}</p>

          <input
            type="file"
            accept="application/pdf"
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <div className="bg-white p-12 rounded-xl shadow-lg border-2 border-dashed">

            <div className="text-6xl mb-6">{config.icon}</div>

            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-red-500 text-white px-10 py-3 rounded-lg font-bold hover:bg-red-600"
            >
              Select PDF File
            </button>

            {file && (
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

            {tool === "reorder" && pageOrder.length > 0 && (
              <div className="mt-6 space-y-2 text-left">
                {pageOrder.map((p, idx) => (
                  <div
                    key={p}
                    className="flex justify-between items-center border p-3 rounded"
                  >
                    <span>Page {p}</span>

                    <div className="flex gap-2">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx - 1], copy[idx]] =
                            [copy[idx], copy[idx - 1]];
                          setPageOrder(copy);
                        }}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        ⬆️
                      </button>

                      <button
                        disabled={idx === pageOrder.length - 1}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx + 1], copy[idx]] =
                            [copy[idx], copy[idx + 1]];
                          setPageOrder(copy);
                        }}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        ⬇️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}


            {tool === "reorder" && pageOrder.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 font-semibold text-gray-700">
                  Page Order
                </p>

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

            <button
              onClick={processPdf}
              disabled={loading}
              className="mt-6 bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
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