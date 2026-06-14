import { NewNoteBody, Note } from "@/types/note";
import { baseURL, Nextapi } from "./api";

export const createNote = async (newNote: NewNoteBody) => {
  const res = await Nextapi.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return res.data;
};

export const deleteNote = async (taskId: string) => {
  const res = await Nextapi.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return res.data;
};
