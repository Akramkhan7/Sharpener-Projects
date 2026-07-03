import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = () => {
  return <div className={classes.backDrop}></div>;
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

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;