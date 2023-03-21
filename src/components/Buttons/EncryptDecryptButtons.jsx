import React from 'react';
import {
  BsFillKeyFill,
  BsFillUnlockFill,
  BsFillShieldLockFill,
} from 'react-icons/bs';

const EncryptDecryptButtons = ({
  encryptedButtonState,
  decryptedButtonState,
  handleEncryption,
  handleDecryption,
}) => {
  return (
    <div className="buttonContainer">
      <div className="encryptButtonContainer">
        <button className="encryptButton" onClick={handleEncryption}>
          {encryptedButtonState ? (
            <>
              <BsFillShieldLockFill size={20} />
              Encrypted!
            </>
          ) : (
            <>
              <BsFillUnlockFill size={20} />
              Click to Encrypt
            </>
          )}
        </button>
      </div>
      <div className="decryptButtonContainer">
        <button className="decryptButton" onClick={handleDecryption}>
          {decryptedButtonState ? (
            <>
              <BsFillUnlockFill size={20} />
              Decrypted!
            </>
          ) : (
            <>
              <BsFillShieldLockFill size={20} />
              Click to Decrypt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EncryptDecryptButtons;
