import React from 'react'
import classes from "./Modal.module.css"
import ReactDOM from "react-dom"

const Backdrop =(props)=>{
    return (
        <div className={classes.backdrop} onClick={props.onClose}/>
    )
}
const ModalOverlay= (props) =>{
    return (
        <div className={classes.modal}>
          {props.children} 
        </div>
    )
}

function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById("cart-modal"))}
            {ReactDOM.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, document.getElementById("cart-modal"))}
        </>
    )
}

export default Modal
