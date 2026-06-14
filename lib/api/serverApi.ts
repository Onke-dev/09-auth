import { Note } from "@/types/note";
import { baseURL, FetchNotesParams, FetchNotesRes, Nextapi } from "./api";

export const fetchNotes = async ({
  search: mysearchtext,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesRes> => {
  const res = await Nextapi.get<FetchNotesRes>("/notes", {
    params: {
      search: mysearchtext,
      page,
      tag,
    },
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (taskId: string) => {
  const res = await Nextapi.get<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return res.data;
};
