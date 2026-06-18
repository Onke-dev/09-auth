import { NewNoteBody, Note } from "@/types/note";
import { FetchNotesParams, FetchNotesRes, Nextapi } from "./api";
import { LoginRequest, RegisterRequest, User } from "@/types/user";
import { CheckSessionRequest, UpdateUserRequest } from "@/types/session";

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
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await Nextapi.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteId: NewNoteBody) => {
  const res = await Nextapi.post<Note>("/notes", noteId);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await Nextapi.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await Nextapi.post<User>(`/auth/register`, data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await Nextapi.post<User>(`/auth/login`, data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await Nextapi.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  const res = await Nextapi.get<CheckSessionRequest>(`/auth/session`);
  return res.data.success;
};

export const getMe = async () => {
  const res = await Nextapi.get<User>(`/users/me`);
  return res.data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await Nextapi.patch<User>("/users/me", payload);
  return res.data;
};
