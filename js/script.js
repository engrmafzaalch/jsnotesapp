

let notes= []

// ----------FETCHING FROM LOCAL STORAGE--------------
const getSavedNotes = function(){
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON != null){
        notes = JSON.parse(notesJSON)
    }else{
        return []
    }
}
getSavedNotes();
// --------------------SAVE NOTES TO LOCAL STORAGE-----------
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}
const filerText = {
    searchText: ''
}
// ------------- RENDER NOTES-----------
const renderNotes = function (notes, filerText ){
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filerText.searchText.toLowerCase());
    })
    document.querySelector('#notes').innerHTML = ''
    
    // -----------------CREATING NOTES ELEMENT---------------
    filteredNotes.forEach(function(note){
        const filtered = document.createElement('p');
        filtered.textContent = ''
        filtered.className = 'p-element'
        document.querySelector('#notes').appendChild(filtered)

        const checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        filtered.appendChild(checkBox)

        const noteLabel = document.createElement('a')
        noteLabel.setAttribute('href', `/edit.html#${note.id}`);  
        noteLabel.textContent = note.title;
        filtered.appendChild(noteLabel)

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.style.marginLeft='4px'
        filtered.appendChild(removeButton) ;
        removeButton.addEventListener('click', function(){
            removeNote(note.id);
            saveNotes(notes);
            renderNotes(notes, filerText)
        })
    })
}

const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id ===id;
    })
    if(noteIndex>-1){
        notes.splice(noteIndex, 1);
    }
}
renderNotes(notes, filerText);
// ------------FILTERING NOTES------------------
document.querySelector('#search').addEventListener('input', function(e){
    filerText.searchText = e.target.value
    renderNotes(notes, filerText);
});
//-------------ADD NOTES------

document.querySelector('#add-button').addEventListener('click', function(e){
    e.preventDefault();
    const id = uuidv4();
    var inputValue = document.getElementById('createNote').value
    if(inputValue===''){
        notes.unshift({
            id: id,
            title: 'Untitled Note',
            body: ' '
        })
    }else{
        notes.unshift({
            id: id,
            title:inputValue,
            body: ' '
        })
    }
    // renderNotes(notes, filerText);
    saveNotes(notes);
    // console.log(id);
    location.assign(`/edit.html#${id}`);
    document.getElementById('createNote').value = ''
})
window.addEventListener('storage', function(e){
    if(e.key==='notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filerText)
    }
})