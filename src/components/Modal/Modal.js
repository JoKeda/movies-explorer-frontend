import react, { useState } from "react"
import "./Modal.css"


const Modal = () => {
const [closed,setClosed]=useState(false)
    const close = () => {
      setClosed(true)
  }




    return (<div className={`wrapper ${closed?"none":null}`}>
        <div className="popUp" onClick={close}>
            <button className="close_btn">X</button>
            <div className="content">
                <div className="title">Tekst</div>
                
            </div>
        </div>
    </div>)
}

export default Modal