"use client";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteBody } from "../../types/note";

import { useRouter } from "next/navigation";
import { useDraftNoteHub } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";
import { createNote } from "@/lib/api/clientApi";

function NoteForm() {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  const draft = useDraftNoteHub((DraftStoreObject) => {
    return DraftStoreObject.draft;
  });
  const setDraft = useDraftNoteHub((DraftStoreObject) => {
    return DraftStoreObject.setDraft;
  });
  const clearDraft = useDraftNoteHub((DraftStoreObject) => {
    return DraftStoreObject.clearDraft;
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newNote: NewNoteBody) => createNote(newNote),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleCancel();
      clearDraft();
    },
    onError: () => {
      //toast error
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({ ...(draft || {}), [e.target.name]: e.target.value });
  };

  const handleCreate = (action: FormData) => {
    const titleValue = action.get("title");
    const contentValue = action.get("content");
    const tagValue = action.get("tag");

    if (
      typeof titleValue !== "string" ||
      typeof contentValue !== "string" ||
      typeof tagValue !== "string"
    ) {
      console.error("Invalid values");
      return;
    }

    if (!titleValue.trim() || !contentValue.trim()) {
      console.error("Title and content cannot be empty");
      return;
    }

    const newNote: NewNoteBody = {
      title: titleValue,
      content: contentValue,
      tag: tagValue,
    };
    mutate(newNote);
  };
  return (
    <form className={css.form} action={handleCreate}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft?.title || ""}
          onChange={handleChange}
        />
        {/* <span name="title" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="textarea">Content</label>
        <textarea
          id="textarea"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content || ""}
          onChange={handleChange}
        />
        {/* <span name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="select">Tag</label>
        <select
          id="select"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag || "Todo"}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <span name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit">Create note</button>
      </div>
    </form>
  );
}

export default NoteForm;
