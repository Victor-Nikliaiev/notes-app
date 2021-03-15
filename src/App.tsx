import { useState, useEffect } from "react";
import NoteComponent from "./components/Note";
import { OnChangeFuncType, OnSubmitFuncType, NoteInterface } from "./types";

const App = () => {
  const [error, setError] = useState<string>("");
  if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", JSON.stringify([]));
  }
  const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  const [notes, setNotes] = useState<NoteInterface[]>(localNotes);

  const removeNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify([...notes]));
  }, [notes]);

  const emptyNote: NoteInterface = {
    title: "",
    content: "",
    author: "",
  };
  const [note, setNote] = useState<NoteInterface>(emptyNote);

  let handlerOnChange: OnChangeFuncType = (e) => {
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
    let trimResult: any = {};
    noteKeys.forEach((key, i) => (trimResult[key] = noteValues[i]));

    const newNote: NoteInterface = {
      ...trimResult,
      id: new Date().getTime().toString(),
    };
    setNotes([...notes, newNote]);

    setNote(emptyNote);
  };

  return (
    <>
      <article className="container">
        <h1>Note App v1.0</h1>
        <form onSubmit={handlerOnSubmit}>
          <div className="input-container">
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              name="title"
              id="title"
              value={note.title}
              onChange={handlerOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="content">Content : </label>

            <textarea
              name="content"
              id="content"
              value={note.content}
              onChange={handlerOnChange}
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="author">Author : </label>
            <input
              type="text"
              name="author"
              id="author"
              value={note.author}
              onChange={handlerOnChange}
            />
          </div>
          {error && (
            <h1 style={{ color: "red", fontWeight: "bold" }}>{error}</h1>
          )}
          <button type="submit">add note</button>
        </form>
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
