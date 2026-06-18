import { NewNoteBody, Note } from "@/types/note";
import { baseURL, Nextapi } from "./api";
import { LoginRequest, RegisterRequest, User } from "@/types/user";
import { CheckSessionRequest, UpdateUserRequest } from "@/types/session";

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

export const checkSession = async () => {
  const res = await Nextapi.get<CheckSessionRequest>(`/auth/session`);
  return res.data.success;
};

export const getMe = async () => {
  const res = await Nextapi.get<User>(`/auth/me`);
  return res.data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await Nextapi.patch<User>("/usets/me", payload);
  return res.data;
};
