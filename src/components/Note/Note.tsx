import "./Note.css";
import { FC, FocusEvent } from "react";
import INote from "../../interfaces/notes.interface";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};


const Note: FC <Props> = ({ note, onNoteUpdate }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent
    if (newTextValue === note.text){
      return;
    }
    const updatedNote: INote = {
      ...note,
      text: newTextValue || "",
    }
    onNoteUpdate(updatedNote);
  };
  
  return (
    <div className="note">
      <div 
      className="note__text" 
      contentEditable 
      suppressContentEditableWarning
      onBlur={noteTextUpdated}
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}></a>
        {note.link}
      </div>
    </div>
  );
};

export default Note;
