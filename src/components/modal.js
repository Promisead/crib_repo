import React from 'react'
import './splash.css'
import {CircularProgress} from "@material-ui/core"

const Modal = ({loading})=>{
    return(
        <>
            {
                loading&&
                <div className="modal">
                    <CircularProgress />
                </div>
            }
        </>
    )
}
export default Modal;