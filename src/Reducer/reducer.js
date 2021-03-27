function reducer (state, action) {
    switch (action.type){
        case 'CREATE':
            return [action.note, ...state ]
  
        case 'UPDATE':
            let index = state.findIndex(note=> note.key === action.data.key)
            let notes = [...state]
            notes.splice(index, 1);
            notes.splice(index, 0, action.data)
            return notes
            
        case 'DELETE':
            let noteId = state.findIndex(note => note.key === action.data.noteId); 
            let noteCopy = [...state]
            noteCopy.splice(noteId, 1);
            return noteCopy
        
        case 'READ':
            return [...state, ...action.notes]    
        
        default:
            return state
    }
  }

  export default reducer;