import React, { useRef, useState } from 'react';
import './Main.css'
import Note from '../Note/Note';
import Modal from '../Modal/Modal';
// import ReactQuill from 'react-quill';

const Main = (props) =>{

   const [showInput, setShowInput] = useState(false);
   const [textValue, setTextValue] = useState('');
   const [titleValue, setTitleValue] = useState('');  
  
   const [titleFocused, setTitleFocused] = useState(false);
   const [textFocused, setTextFocused] = useState(false);

    const [showModal,setShowModal] = useState(false);
    const [editNote, setEditNote] = useState({});


    const autoGrow = (elem) =>{
        elem.current.style.height = "5px";
        elem.current.style.height = (10 + elem.current.scrollHeight) + "px";

    }  

    const onsubmit = (e) =>{
        e.preventDefault(); 
        if(textValue !== "" || titleValue !==""){
            let note = { "title": titleValue,"text": textValue}
            setShowInput(false)
            setTitleValue("");
            setTextValue("");
            props.create(note);
        }
    } 
    const submitNote = (noteId, data) =>{
        props.update(noteId, data);
        setShowModal(false);
    }
    
    const edit = (note) =>{
        setEditNote(note)
        setShowModal(true)
    }

    const textAreaRef = useRef(null);
    
    return (
        
        <main className="mt-5">
            <div className="row">
                <form action=""  className="FormClass" onSubmit={event => onsubmit(event)}>
                    { 
                    showInput ? 
                        <input type="text" 
                            className="InputClass"
                            placeholder="Title" 
                            value={titleValue}
                            onFocus= {() => setTitleFocused(true)}
                            onBlur = { () => setTitleFocused(false)}
                            onChange = { (e) => setTitleValue(e.target.value)} /> 
                        : 
                        ''    
                    } 
                    <textarea  name="" id="" cols="30" rows="1" 
                        className="TextareaClass"
                        placeholder="Write a note..."
                        ref = { textAreaRef }
                        value= {textValue}
                        onInput = { () => autoGrow(textAreaRef)}
                        onFocus = { () =>{
                            setShowInput(true);
                            textAreaRef.current.focus();
                            setTitleFocused(true);
                        }}
                        onBlur = { () => setTextFocused(false)}
                        onChange = {(e) => setTextValue(e.target.value)} 
                        />

                    { 
                        showInput ?     
                            <button type="submit" className="btn btn-outline-primary mt-3" id="submit">Save</button>
                            : null
                    }
                
                </form>
            </div>        
            
            <div className="NoteWrapper">
                {/* <div className="row"> */}
                    {
                        props.notes.map((note,index) =>(
                            <Note 
                                note={note} 
                                key={index} 
                                remove={props.remove} 
                                edit = {edit}
                                />
                        ))
                    }
                {/* </div> */}
                  
            </div>
            <Modal show={showModal} note={editNote} submit = {submitNote} />
        </main>
    );
};


export default Main;