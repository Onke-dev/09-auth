import axios from "axios";
import type { Note } from "../../types/note";

export interface FetchNotesRes {
  notes: Note[];
  page: number;
  totalPages: number;
}

export interface FetchNotesParams {
  search: string;
  page: number;
  tag?: string;
}

export const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const Nextapi = axios.create({
  baseURL: "https://notehub-Nextapi.goit.study",
  withCredentials: true,
});
