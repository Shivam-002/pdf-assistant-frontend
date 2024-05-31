import React, { useEffect } from "react";
import AIPlanetLogo from "./AIPlanetLogo";

import { Button, message, Upload } from "antd";
import {
  PlusCircleOutlined,
  FileOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import "./../css/Header.css";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import { States } from "../Utils";

import axios from "axios";

function Header() {
  const { activeState, handleGlobalStateChange } = useGlobalStateContext();

  const props = {
    name: "file",
    action: "http://localhost:8000/api/v1/pdf/upload",

    showUploadList: false,
    beforeUpload: (file) => {
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        message.error("You can only upload PDF files!");
      }

      handleGlobalStateChange({
        ...activeState,
        state: States.UPLOADING_PDF,
      });
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

        handleGlobalStateChange({
          ...activeState,
          pdfName: info.file.name,
          state: States.PROCESSING_PDF,
        });

        console.log("State : ", activeState);

        const url = `http://localhost:8000/api/v1/pdf/process?filename=${info.file.name}`;
        axios
          .post(url)
          .then((response) => {
            message.success("PDF Processed Successfully");

            handleGlobalStateChange((prevState) => ({
              ...prevState,
              state: States.WAITING_FOR_MESSAGE,
            }));
          })
          .catch((error) => {
            console.error(error);
            message.error("PDF Processing Failed, Please try again.");
            handleGlobalStateChange((prevState) => ({
              ...prevState,
              pdfName: "",
              state: States.WAITING_FOR_PDF,
            }));
          });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    console.log("Efeect State : ", activeState);
  }, [activeState]);

  return (
    <div className="header-container">
      <AIPlanetLogo />

      <div className="upload-pdf-container">
        {activeState.state !== States.WAITING_FOR_PDF && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {activeState.state === States.UPLOADING_PDF ||
            activeState.state === States.PROCESSING_PDF ? (
              <LoadingOutlined style={{ color: "#0FA958" }} />
            ) : (
              <FileOutlined style={{ color: "#0FA958" }} />
            )}
            v
            <span
              style={{
                color: "#0FA958",
              }}
            >
              {activeState.state === States.UPLOADING_PDF
                ? "Uploading"
                : activeState.state === States.PROCESSING_PDF
                ? "Processing"
                : activeState.pdfName}
            </span>
          </div>
        )}
        <Upload {...props} className="upload-pdf">
          <Button icon={<PlusCircleOutlined />}>Upload PDF</Button>
        </Upload>
      </div>
    </div>
  );
}

export default Header;
