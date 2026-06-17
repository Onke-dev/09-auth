import { Note } from "@/types/note";
import { baseURL, FetchNotesParams, FetchNotesRes, Nextapi } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

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
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (taskId: string) => {
  const res = await Nextapi.get<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await Nextapi.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await Nextapi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
