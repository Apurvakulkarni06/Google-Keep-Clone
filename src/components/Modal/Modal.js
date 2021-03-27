import { useState, useEffect } from 'react';

import './Modal.css';

const Modal = (props)=>{
    const [title, setTitle] = useState(props.note.title)
    const [text, setText] = useState(props.note.text)
   
    const onclick = (id) =>{
        setTitle('');
        setText('');
        let note ={...props.note, "title":title, "text":text};
        props.submit(id,note)
    }
    useEffect( () =>{
        setTitle(props.note.title)
        setText(props.note.text)

    }, [props])



    return(
            <div className={"modal modal-div "+(props.show ? " d-block": " d-none")} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content" >

                    {/* <div className="modal-header">
                       
                        <input type="text" 
                            className="title-class"
                            placeholder="Title" 
                            value={title}
                            onChange = { (e) => setTitle(e.target.value)}
                            />
                    </div> */}

                    <div className="modal-body">
                        <input type="text" 
                            className="title-class"
                            placeholder="Title" 
                            value={title}
                            onChange = { (e) => setTitle(e.target.value)}
                            />
                        <textarea  name="" id="" cols="30" rows="1" 
                            className="text-class"
                            placeholder="Write a note..."
                            value= {text}
                            onChange = {(e) => setText(e.target.value)} 
                            />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={()=>onclick(props.note.key)}>Save</button>
                        
                    </div>
        
                </div>
            </div>
        </div>
        
        
       
    )
}
export default Modal;