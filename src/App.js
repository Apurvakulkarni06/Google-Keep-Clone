import { useState, useEffect, useReducer} from 'react';

import firebase from './Firebase/Firebase';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GoogleSignIn from './components/GoogleSignIn/GoogleSignIn';

import './App.css';

import reducer from './Reducer/reducer';

function App() {

  const [notes, dispatch] = useReducer(reducer, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [user, setUser] = useState({
    id:'',
    name:'',
    email:'',
    picture:"",

  })


  const create = (data) =>{
    const db = firebase.database().ref('users/' + user.id)
    const newNote = db.push();
    newNote.set({
     id:user.id,
     ...data
    });
    let note = { key : newNote.key, ...data}
    dispatch({type: 'CREATE', note})
  }

  const update = (id, data) =>{
    let note = firebase.database().ref(`users/${user.id}/${id}`);
    note.update(data)
    dispatch({type: 'UPDATE', data})
  }

  const remove = (id) =>{
    let note = firebase.database().ref(`users/${user.id}/${id}`);
    note.remove()
    let data = {noteId:id}
    dispatch({type: 'DELETE', data})
  }

  const read = () =>{
    let notes = [];
    const db = firebase.database().ref(`users/${user.id}`);
    db.orderByValue().once("value",snapshot =>{ 
      snapshot.forEach(note=>{
        notes.push({ key:note.key, ...note.val()})  
      })
      if(notes.length !== 0){
        dispatch({type: 'READ', notes})
      }
    })
  }


  useEffect(()=>{
    if(user.id !== '')
      read()
  },[user])

  return (
    
    <div className="container">
      <div className="container-fluid">
        
        {
          isLoggedIn ?
          <>
            <Header setIsLoggedIn= {setIsLoggedIn} user={user} />
            <Main 
              notes= {notes}
              create = {create}
              update = {update}
              remove = {remove}
              />
          </>
          :
          <GoogleSignIn setIsLoggedIn= {setIsLoggedIn} user = {user} setUser={setUser}/>
        }

        </div>
    </div>
  
    
  );
}

export default App;
