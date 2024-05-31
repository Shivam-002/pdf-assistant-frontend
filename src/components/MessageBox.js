import React from "react";
import { Avatar, Tooltip, message } from "antd";
import { CopyOutlined, RedoOutlined } from "@ant-design/icons";
import "./../css/MessageBox.css";
import ReactMarkdown from "react-markdown";
import { AUTHOR, States } from "../Utils";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import { useMessageContext } from "../provider/MessageStateProvider";
import { query } from "../api";
function MessageBox({ author, input_message }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(input_message);
    message.success("Copied to clipboard!");
  };

  const { activeState, handleGlobalStateChange } = useGlobalStateContext();
  const { messages, handleMessagesChange } = useMessageContext();

  const queryQuestion = () => {};
  const regenerate = () => {
    handleGlobalStateChange((prevState) => ({
      ...prevState,
      state: States.PROCESSING_MESSAGE,
      lastMessage: input_message,
    }));

    handleMessagesChange((prevState) => [
      ...prevState,
      {
        author: AUTHOR.USER,
        text: input_message,
      },
    ]);
    query(
      activeState.pdfName,
      activeState.lastMessage,
      (response) => {
        handleGlobalStateChange((prevState) => ({
          ...prevState,
          state: States.WAITING_FOR_MESSAGE,
        }));
        handleMessagesChange((prevState) => [
          ...prevState,
          {
            author: AUTHOR.AI,
            text: response.data,
          },
        ]);
      },
      (error) => {
        console.error(error);
        handleGlobalStateChange((prevState) => ({
          ...prevState,
          state: States.WAITING_FOR_MESSAGE,
        }));
      }
    );
  };

  return (
    <div className="message-box">
      {author === "AI" ? (
        <Avatar size={50} className="ai-avatar">
          AI
        </Avatar>
      ) : (
        <svg
          width="50"
          height="49"
          viewBox="0 0 37 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9494 1C28.3307 1 35.9369 8.61051 35.9369 18C35.9369 27.3895 28.3307 35 18.9494 35C9.56813 35 1.96191 27.3895 1.96191 18C1.96191 8.61051 9.56813 1 18.9494 1Z"
            stroke="#0FA958"
            stroke-width="2"
          />
          <path
            d="M32.9398 18C32.9398 10.268 26.6761 4 18.9495 4C11.2229 4 4.95923 10.268 4.95923 18C4.95923 25.732 11.2229 32 18.9495 32C26.6761 32 32.9398 25.732 32.9398 18Z"
            fill="#0FA958"
          />
          <path
            d="M13.5206 19.7053C13.5206 20.0274 13.5775 20.3301 13.6912 20.6135C13.805 20.8841 13.9567 21.1224 14.1463 21.3285C14.3486 21.5346 14.5825 21.6957 14.848 21.8116C15.1261 21.9275 15.4232 21.9855 15.7392 21.9855C16.0426 21.9855 16.3271 21.9275 16.5925 21.8116C16.8707 21.6957 17.1045 21.5346 17.2942 21.3285C17.4964 21.1224 17.6544 20.8841 17.7682 20.6135C17.8946 20.343 17.9579 20.0531 17.9579 19.744C17.9579 19.4348 17.8946 19.1449 17.7682 18.8744C17.6544 18.591 17.4964 18.3462 17.2942 18.1401C17.1045 17.934 16.8707 17.7729 16.5925 17.657C16.3271 17.5411 16.0426 17.4831 15.7392 17.4831C15.4232 17.4831 15.1261 17.5411 14.848 17.657C14.5825 17.7729 14.3486 17.934 14.1463 18.1401C13.9567 18.3462 13.805 18.5845 13.6912 18.8551C13.5775 19.1127 13.5206 19.3961 13.5206 19.7053ZM17.8441 14.7778H21.2953V24.6908H17.8441V23.5894C17.1108 24.5298 16.1185 25 14.8669 25C14.159 25 13.5079 24.8712 12.9138 24.6135C12.3196 24.343 11.8013 23.9694 11.3588 23.4928C10.9163 23.0161 10.5687 22.4557 10.3159 21.8116C10.0757 21.1675 9.95557 20.4654 9.95557 19.7053C9.95557 18.9968 10.0757 18.3269 10.3159 17.6957C10.5561 17.0515 10.8911 16.4911 11.3209 16.0145C11.7507 15.5378 12.2627 15.1643 12.8569 14.8937C13.451 14.6103 14.1084 14.4686 14.829 14.4686C16.0426 14.4686 17.0476 14.9002 17.8441 15.7633V14.7778ZM25.7359 14.7778V24.6908H22.3036V14.7778H25.7359ZM22.0761 10.971C22.0761 10.7005 22.1266 10.4493 22.2278 10.2174C22.3289 9.97262 22.468 9.76006 22.6449 9.57971C22.8219 9.39936 23.0242 9.25765 23.2517 9.15459C23.4919 9.05153 23.7448 9 24.0103 9C24.2757 9 24.5223 9.05153 24.7498 9.15459C24.99 9.25765 25.1986 9.39936 25.3756 9.57971C25.5526 9.76006 25.6916 9.97262 25.7928 10.2174C25.8939 10.4493 25.9445 10.7005 25.9445 10.971C25.9445 11.2415 25.8939 11.4992 25.7928 11.744C25.6916 11.9758 25.5526 12.182 25.3756 12.3623C25.1986 12.5427 24.99 12.6844 24.7498 12.7874C24.5223 12.8905 24.2757 12.942 24.0103 12.942C23.7448 12.942 23.4919 12.8905 23.2517 12.7874C23.0242 12.6844 22.8219 12.5427 22.6449 12.3623C22.468 12.182 22.3289 11.9758 22.2278 11.744C22.1266 11.4992 22.0761 11.2415 22.0761 10.971Z"
            fill="white"
          />
        </svg>
      )}

      <div className="message-content">
        <ReactMarkdown className="message-text">{input_message}</ReactMarkdown>
        <div className="icon-container">
          {input_message && (
            <Tooltip title="Copy">
              <CopyOutlined className="quick-icon" onClick={copyToClipboard} />
            </Tooltip>
          )}
          {author !== "AI" && (
            <Tooltip title="Regenerate">
              <RedoOutlined
                className={`quick-icon ${
                  activeState.state === States.PROCESSING_MESSAGE ||
                  activeState.state === States.PROCESSING_PDF
                    ? "disable-quick-icon"
                    : ""
                }`}
                onClick={
                  activeState.state === States.PROCESSING_MESSAGE ||
                  activeState.state === States.PROCESSING_PDF
                    ? null
                    : regenerate
                }
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
