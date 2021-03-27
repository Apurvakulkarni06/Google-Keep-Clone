import { useState } from 'react';
import './Note.css';


const Note = (props) =>{
    const [showResult, setShowResult] = useState(true);

    const removeNote = (id) =>{
        props.remove(id);
        toggleHidden()
    }
 
    const toggleHidden = ()=>{
        setShowResult((prevState)=>(!prevState))
    }

    return (
                <>
                    
                    
                    {/* <div className={showResult ? "DivClass" : "DivClass hide"} id={props.note.key} >
                        <div className="note-header">
                            <button  onClick = { () => props.edit(props.note)  } title="Edit">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick = { () => removeNote(props.note.key)} style={{marginLeft:'4px'}} title="Delete">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                                    
                        </div>
                        <h3 className="H3Class">{ props.note.title }</h3>
                        <p>{ props.note.text }</p>
                    </div>  */}

                
                <div className="card-div">
                        <div className="note-header">
                            <button  onClick = { () => props.edit(props.note)  } title="Edit"><i className="fas fa-edit"></i></button>
                            <button onClick = { () => removeNote(props.note.key)} style={{marginLeft:'4px'}} title="Delete"><i className="fas fa-trash-alt"></i></button>
                        </div>
                        <h3 className="card-title title">{ props.note.title }</h3>
                        <p className="card-text">{ props.note.text }</p>
                </div>
                
                
                </> 

    );
};


export default Note;