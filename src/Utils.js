export const States = {
  WAITING_FOR_PDF: "waiting_for_pdf",
  UPLOADING_PDF: "uploading_pdf",
  PROCESSING_PDF: "processing_pdf",
  WAITING_FOR_MESSAGE: "waiting_for_message",
  PROCESSING_MESSAGE: "processing_message",
  ERROR: "error",
};

export const STATE_HINTS = {
  waiting_for_pdf: "Please upload a PDF file.",
  uploading_pdf: "Uploading PDF file.",
  processing_pdf: "Processing PDF file.",
  waiting_for_message: "Ask anything you want to know about the PDF file.",
  processing_message: "Processing message.",
  error: "Error",
};

export const BASE_URL = "https://pdf-assistant-v6fr.onrender.com:8000/api/v1/";
export const ENDPOINTS = {
  UPLOAD_PDF: `${BASE_URL}pdf/upload`,
  PROCESS_PDF: `${BASE_URL}pdf/process`,
  QUERY_PDF: `${BASE_URL}pdf/query`,
};

export const AUTHOR = {
  AI: "AI",
  USER: "user",
};
