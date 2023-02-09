import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../Newpostmodal/Newpostmodal.css'
import close from './close.svg';
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
                    <img class="buttonclose" src={close} width="26" height="26" onClick={props.onClose}/>
                </div>
                <div className="modal-body">
                    TV Show Title
                </div>
                <div className="modal-comments">
                    Comments
                </div>
                <div className="modal-footer">
                  <button className="buttonsubmit">Submit</button>
                    
                </div>
            </div>
        </div>
        </>
    )

}

export default Newpostmodal;