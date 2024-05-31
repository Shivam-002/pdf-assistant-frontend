import axios from "axios";
import { ENDPOINTS } from "./Utils";

export const query = async (pdfName, query, on_sucess, on_failure) => {
  const url = ENDPOINTS.QUERY_PDF + `?filename=${pdfName}&query=${query}`;
  try {
    const response = await axios.get(url);
    on_sucess(response);
  } catch (error) {
    on_failure(error);
  }
};
