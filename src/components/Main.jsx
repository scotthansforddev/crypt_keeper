import { React, useState, useRef } from 'react';
import axios from 'axios';

import TextArea from './TextAreas/TextArea';
import KeyInput from './KeyInput';
import EncryptDecryptButtons from './Buttons/EncryptDecryptButtons';
import Output from './TextAreas/Output';

function Main() {
  //button states
  const [encryptedButtonState, setEncryptedButtonState] = useState(false);
  const [decryptedButtonState, setDecryptedButtonState] = useState(false);
  // state of output
  const [outputText, setOutputText] = useState('');
  // state of textarea
  const [textAreaValue, setTextAreaValue] = useState('');
  // state of password
  const [passwordAreaValue, setPasswordAreaValue] = useState('');
  //shake input if no key is provided
  const passwordInputRef = useRef();

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordAreaValue(e.target.value);
  };

  const resetAll = () => {
    setEncryptedButtonState(false);
    setDecryptedButtonState(false);
    setTextAreaValue('');
    setPasswordAreaValue('');
    setOutputText('');
  };

  const handleEncryption = async () => {
    try {
      if (!passwordAreaValue) {
        setOutputText('Invalid Key or No key provided.');
        setEncryptedButtonState(false); //prevents button change
        passwordInputRef.current.classList.add('shake', 'highlight'); // Add the class
        setTimeout(() => {
          passwordInputRef.current.classList.remove('shake', 'highlight'); // Remove the class after 500ms
        }, 500);
        return;
      } //
      axios
        .post(
          'https://6z6enqjxl8.execute-api.us-west-2.amazonaws.com/encryption',
          {
            message: textAreaValue,
            key: passwordAreaValue,
          }
        )
        .then(function (response) {
          setOutputText(response.data.encryptedMessage);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      setEncryptedButtonState(true);
      setDecryptedButtonState(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecryption = async () => {
    try {
      if (!passwordAreaValue) {
        setOutputText('Invalid Key or No key provided.');
        setDecryptedButtonState(false); //prevents button change
        passwordInputRef.current.classList.add('shake', 'highlight'); // Add the class
        setTimeout(() => {
          passwordInputRef.current.classList.remove('shake', 'highlight'); // Remove the class after 500ms
        }, 500);
        return;
      }
      axios
        .post(
          'https://6z6enqjxl8.execute-api.us-west-2.amazonaws.com/decryption',
          {
            encryptedMessage: textAreaValue,
            key: passwordAreaValue,
          }
        )
        .then(function (response) {
          if (response.data.decryptedMessage === '') {
            setOutputText('Invalid Key or No key provided.');
          } else {
            setOutputText(response.data.decryptedMessage);
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      setDecryptedButtonState(true);
      setEncryptedButtonState(false);
    } catch (error) {
      console.error(error);
    }
  };

  //paste from clipboard
  const hiddenPasteArea = useRef(null);

  const handlePasteClick = async () => {
    if (navigator.clipboard && navigator.clipboard.readText) {
      try {
        const text = await navigator.clipboard.readText();
        setTextAreaValue(text);
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    } else {
      hiddenPasteArea.current.value = '';
      hiddenPasteArea.current.focus();
      hiddenPasteArea.current.select();

      const handleHiddenPaste = (event) => {
        setTextAreaValue(event.clipboardData.getData('text/plain'));
        hiddenPasteArea.current.removeEventListener('paste', handleHiddenPaste);
      };

      hiddenPasteArea.current.addEventListener('paste', handleHiddenPaste);
    }
  };

  //copy to clipboard
  const hiddenTextArea = useRef(null);

  const handleCopyClick = () => {
    hiddenTextArea.current.value = outputText;
    hiddenTextArea.current.select();
    document.execCommand('copy');
  };

  return (
    <>
      <div className="encryptContainer">
        <TextArea
          textAreaValue={textAreaValue}
          handleTextAreaChange={handleTextAreaChange}
        />
        <KeyInput
          passwordAreaValue={passwordAreaValue}
          handlePasswordChange={handlePasswordChange}
          passwordInputRef={passwordInputRef}
        />
        <EncryptDecryptButtons
          encryptedButtonState={encryptedButtonState}
          decryptedButtonState={decryptedButtonState}
          handleEncryption={handleEncryption}
          handleDecryption={handleDecryption}
        />
        <Output
          outputText={outputText}
          handleCopyClick={handleCopyClick}
          resetAll={resetAll}
          hiddenTextArea={hiddenTextArea}
        />
      </div>
    </>
    // <>
    //   <div className="encryptContainer">
    //     <div className="encryptTextAreaContainer">
    //       <div className="pasteButtonContainer">
    //         <button className="pasteButton" onClick={handlePasteClick}>
    //           <FaClipboard size={20} className="pasteButtonIcon" />
    //           Paste
    //         </button>
    //       </div>
    //       <textarea
    //         aria-label="encrypt_text"
    //         value={textAreaValue}
    //         className="encryptTextArea"
    //         type="text"
    //         onChange={handleTextAreaChange}
    //         placeholder="Enter Your Message Here: "
    //       />
    //       <textarea
    //         ref={hiddenPasteArea}
    //         style={{ position: 'absolute', left: '-9999px' }}
    //       />
    //     </div>

    //     <div className="encryptKeyContainer">
    //       <p className="keyIcondiv">
    //         <BsFillKeyFill size={40} className="keyIcon" />
    //       </p>
    //       <input
    //         type="password"
    //         aria-label="password"
    //         value={passwordAreaValue}
    //         className="encryptKeyInput"
    //         onChange={handlePasswordChange}
    //         ref={passwordInputRef}
    //         placeholder="Enter Your Key Here: "
    //       />
    //     </div>
    //     <div className="buttonContainer">
    //       <div className="encryptButtonContainer">
    //         <button className="encryptButton" onClick={handleEncryption}>
    //           {encryptedButtonState ? (
    //             <>
    //               <BsFillShieldLockFill size={20} />
    //               Encrypted!
    //             </>
    //           ) : (
    //             <>
    //               <BsFillUnlockFill size={20} />
    //               Click to Encrypt
    //             </>
    //           )}
    //         </button>
    //       </div>
    //       <div className="decryptButtonContainer">
    //         <button className="decryptButton" onClick={handleDecryption}>
    //           {decryptedButtonState ? (
    //             <>
    //               <BsFillUnlockFill size={20} />
    //               Decrypted!
    //             </>
    //           ) : (
    //             <>
    //               <BsFillShieldLockFill size={20} />
    //               Click to Decrypt
    //             </>
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //     <div className="encryptOutput">
    //       <div className="copyButtonContainer">
    //         <button className="copyButton" onClick={handleCopyClick}>
    //           <FaClipboard size={20} className="clipButton" />
    //           Copy
    //         </button>
    //         <button className="resetButton" onClick={resetAll}>
    //           <BsArrowRepeat size={20} className="resetIcon" />
    //           Reset
    //         </button>
    //       </div>
    //       <textarea
    //         aria-label="text"
    //         className="encryptOutputTextArea"
    //         type="text"
    //         placeholder="Output: "
    //         value={outputText}
    //       />
    //       <textarea
    //         ref={hiddenTextArea}
    //         style={{ position: 'absolute', left: '-9999px' }}
    //       />
    //     </div>
    //   </div>
    // </>
  );
}
export default Main;
