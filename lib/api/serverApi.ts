import { Note } from "@/types/note";
import { FetchNotesParams, FetchNotesRes, Nextapi } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const fetchNotes = async ({
  search: mysearchtext,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesRes> => {
  const cookieStore = await cookies();
  const res = await Nextapi.get<FetchNotesRes>("/notes", {
    params: {
      search: mysearchtext,
      page,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await Nextapi.get<Note>(`/notes/${id}`, {
    headers: {
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
