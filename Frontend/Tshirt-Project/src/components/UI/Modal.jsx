import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = ({onClose}) => {
  return <div className={classes.backDrop} onClick={onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal({children,onClose}) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop  onClose={onClose}/>,
        portalElement
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;