import React from 'react';
import { FaClipboard } from 'react-icons/fa';

const TextArea = ({ textAreaValue, handleTextAreaChange }) => {
  return (
    <div className="encryptTextAreaContainer">
      <div className="pasteButtonContainer">
        <button
          className="pasteButton"
          onClick={() =>
            navigator.clipboard
              .readText()
              .then((clipText) =>
                handleTextAreaChange({ target: { value: clipText } })
              )
          }
        >
          <FaClipboard size={20} className="pasteButtonIcon" />
          Paste
        </button>
      </div>
      <textarea
        aria-label="encrypt_text"
        value={textAreaValue}
        className="encryptTextArea"
        type="text"
        onChange={handleTextAreaChange}
        placeholder="Enter Your Message Here: "
      />
    </div>
  );
};

export default TextArea;
