import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import Note from "./components/Note/Note";
import INote from "./interfaces/notes.interface";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "./services/notesService";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

function App() {
  const [notesList, setNoteList] = useState<Array<INote>>([]);
  const [showAddNoteModel, setShowAddNoteModel] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    text: "",
    link: "",
  });

  const handleCloseNoteModel = () => {
    setNewNote({
      text: "",
      link: "",
    });
    setShowAddNoteModel(false);
  };

  const handleShowNoteModel = () => {
    setShowAddNoteModel(true);
  };

  useEffect(() => {
    getNotesFromServer();
  }, []);

  // getting all notes from server
  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNoteList(notes);
  };

  // updating notes on server
  const updateNoteItem = async (updatedNote: INote) => {
    const updatedNoteFromServer = await updateNote(updatedNote);
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNoteFromServer._id) {
        return updatedNoteFromServer;
      }
      return noteItem;
    });
    setNoteList(updatedList);
  };

  // add new note
  const addNote = async () => {
    const savedNoteonServer = await createNote(newNote);
    setNoteList([...notesList, savedNoteonServer]);
    handleCloseNoteModel();
  };

  // delete a note
  const deleteNoteItem = async (noteToDelete: INote) => {
    await deleteNote(noteToDelete._id);
    const updatedNoteList = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });
    setNoteList(updatedNoteList);
  };

  return (
    <div className="App">
      <Button
        variant="dark"
        className="add-button"
        onClick={handleShowNoteModel}
      >
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={showAddNoteModel} onHide={handleCloseNoteModel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Link"
            className="mb-3"
          >
            <Form.Control
              onChange={(event) => {
                const newValue = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newValue,
                });
              }}
              type="text"
              placeholder="Add a link here"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Text">
            <Form.Control
              onChange={(event) => {
                const newValue = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newValue,
                });
              }}
              as="textarea"
              placeholder="Add text here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoteModel}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes-list">
        {notesList.map((noteItems, index) => {
          return (
            <Note
              note={noteItems}
              onNoteUpdate={updateNoteItem}
              onDeleteNote={deleteNoteItem}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
