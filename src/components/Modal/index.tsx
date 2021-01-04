import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          maxHeight: '80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#FFF',
          color: '#000000',
          borderRadius: '8px',
          width: '90%',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
