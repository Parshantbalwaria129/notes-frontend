import axios from "axios";
import { NOTES_API_URL } from "../constants/api";
import INote from "../interfaces/notes.interface";

export const getNotes = async () => {
  try {
    const response = await axios.get(NOTES_API_URL);
    return response.data.notes;
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (newNote: Partial<INote>) => {
  try {
    const url = `${NOTES_API_URL}/${newNote._id}`;
    const response = await axios.put(url, newNote);
    return response.data.updatedNote;
  } catch (error) {
    console.error(error);
  }
};

export const createNote = async (newNote: Partial<INote>) => {
  try {
    const response = await axios.post(NOTES_API_URL, newNote);
    return response.data.savedNote;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (deleteNoteId: string) => {
  try {
    const url = `${NOTES_API_URL}/${deleteNoteId}`;
    const response = await axios.delete(url);
    return;
  } catch (error) {
    console.error(error);
  }
};
