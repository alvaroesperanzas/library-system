import React, {useEffect} from 'react';

const Modal = ({children, onClose}) => {
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction);
    }
  }, []);

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  }

  return (
    <div className="modal-component">
      <div className="container"
        onClick={(e) =>{e.stopPropagation(); onClose(e);}}  
      >
        <div className="center"
          onClick={(e) =>{e.stopPropagation();}}  
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;