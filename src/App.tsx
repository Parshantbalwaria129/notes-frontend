import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
// import axios from 'axios';
import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Note/Note";
import INote from "./interfaces/notes.interface";

function App() {
  const [notesList, setNoteList] = useState<Array<INote>>([]);
  
  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-notes");
    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNoteList(listFromStorageArray);
    } 
    else {
      setNoteList(DUMMY_NOTES);
    }
  }, []);
  
  useEffect(() => {
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);
  
  const updateNoteItem = (updatedNote: INote) => {
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNoteList(updatedList);
  };
  
  return (
    <div className="App">
      <div className="notes-list">
        {notesList.map((noteItems, index) => {
          return (
            <Note note={noteItems} onNoteUpdate={updateNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
