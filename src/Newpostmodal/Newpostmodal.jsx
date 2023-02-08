import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../Newpostmodal/Newpostmodal.css'

//Modal: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const Newpostmodal = (props) => {
    if(!props.show) {
        return null
    }
    return (
        <>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">New Post Forum</h4>
                </div>
                <div className="modal-body">
                    TV Show Title
                </div>
                <div className="modal-comments">
                    Comments
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="buttonclose">Close</button>
                </div>
            </div>
        </div>
        </>
    )

}

export default Newpostmodal;