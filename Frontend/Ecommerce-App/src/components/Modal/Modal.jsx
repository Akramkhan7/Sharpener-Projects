import React from 'react'

const BackDrop = () =>{
return <div></div>
}

const OverLay = (props) =>{
return(
    <div>
      <div>
        {props.children}
      </div>
    </div>
)
}

const portalElem = document.getElementById('overlays')
function Modal(props) {
  return (
    <>
    {ReactDOM.createPortal(<BackDrop />,portalElem)}
    {ReactDOM.createPortal(<OverLay />,portalElem)}
    </>
  )
}

export default Modal;
