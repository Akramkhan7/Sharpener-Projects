import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const BackDrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const Overlay = (props) => {
  return (
    <div className="modal">
      {props.children}
    </div>
  );
};

const portalElem = document.getElementById("modal-root");

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalElem
      )}

      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        portalElem
      )}
    </>
  );
}

export default Modal;