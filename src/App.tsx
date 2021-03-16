import { useState, useEffect } from "react";
import NoteComponent from "./components/Note";
import Form from "./components/Form";
import {
  OnChangeFuncType,
  OnSubmitFuncType,
  NoteInterface,
  RemoveFunction,
  NoteTrimInterface,
} from "./types";

const App = () => {
  const [error, setError] = useState<string>("");
  if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", JSON.stringify([]));
  }
  const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  const [notes, setNotes] = useState<NoteInterface[]>(localNotes);

  const removeNote: RemoveFunction = (id: string) => {
    const restOfNotes = notes.filter((note) => note.id !== id);
    setNotes(restOfNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
    setNote({ ...note, ...emptyNote });
  }, [notes]);

  const emptyNote: NoteInterface = {
    title: "",
    content: "",
    author: "",
  };
  const [note, setNote] = useState<NoteInterface>(emptyNote);

  const handlerOnChange: OnChangeFuncType = (e) => {
    if (error) {
      setError("");
    }
    const name = e.target.name;
    let value: string = e.target.value.trimStart();

    if ((note[name as keyof NoteInterface] as string)?.slice(-1) === " ") {
      value = value.trimEnd();
    }

    setNote({ ...note, [name]: value });
  };

  const handlerOnSubmit: OnSubmitFuncType = (e) => {
    e.preventDefault();
    if (!note.title || !note.content || !note.author) {
      setError("Some fields are empty, fill it in and then try again.");
      return;
    }

    let noteValues: string[] = Object.values(note);
    let noteKeys: string[] = Object.keys(note);

    noteValues = noteValues.map((value) => value.trim());
    let trimResult: NoteTrimInterface = emptyNote;
    noteKeys.forEach(
      (key, i) => (trimResult[key as keyof NoteTrimInterface] = noteValues[i])
    );

    const newNote: NoteInterface = {
      ...trimResult,
      id: new Date().getTime().toString(),
    };
    setNotes([...notes, newNote]);

    setNote({ ...note, ...emptyNote });
  };

  return (
    <>
      <article className="container">
        <h1>Note App v1.0</h1>
        <Form
          handlerOnChange={handlerOnChange}
          handlerOnSubmit={handlerOnSubmit}
          note={note}
          error={error}
        />
        {notes.length > 0 && (
          <section className="notes-section">
            {notes.map((note) => {
              return (
                <NoteComponent
                  key={note.id}
                  {...note}
                  removeNote={removeNote}
                />
              );
            })}
          </section>
        )}
      </article>
    </>
  );
};

export default App;
