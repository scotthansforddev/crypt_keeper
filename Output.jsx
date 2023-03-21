import React from 'react';
import { FaClipboard } from 'react-icons/fa';
import { BsArrowRepeat } from 'react-icons/bs';

const Output = ({ outputText, handleCopyClick, resetAll, hiddenTextArea }) => {
  return (
    <div className="encryptOutput">
      <div className="copyButtonContainer">
        <button className="copyButton" onClick={handleCopyClick}>
          <FaClipboard size={20} className="clipButton" />
          Copy
        </button>
        <button className="resetButton" onClick={resetAll}>
          <BsArrowRepeat size={20} className="resetIcon" />
          Reset
        </button>
      </div>
      <textarea
        aria-label="text"
        className="encryptOutputTextArea"
        type="text"
        placeholder="Output: "
        value={outputText}
      />
      <textarea
        ref={hiddenTextArea}
        style={{ position: 'absolute', left: '-9999px' }}
      />
    </div>
  );
};

export default Output;
