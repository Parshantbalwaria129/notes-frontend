import "./Note.css";
import { FC, FocusEvent, useState } from "react";
import INote from "../../interfaces/notes.interface";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onDeleteNote: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate, onDeleteNote }) => {
  const [isFocused, setIsFocused] = useState(false);
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    const updatedNote: INote = {
      ...note,
      text: newTextValue || "",
    };
    onNoteUpdate(updatedNote);
  };

  const deleteCurrentNote = () => {
    onDeleteNote(note);
  };

  return (
    <div className={isFocused ? "note note--focused" : "note"}>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={deleteCurrentNote}
      ></button>
      <div
        className="note__text"
        onFocus={() => {
          setIsFocused(true);
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={noteTextUpdated}
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
