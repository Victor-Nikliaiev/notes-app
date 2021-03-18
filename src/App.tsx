import React, { useState, useEffect } from "react";
import NoteComponent from "./components/Note";
import Form from "./components/Form";
import {
  OnChangeFuncType,
  OnSubmitFuncType,
  NoteInterface,
  RemoveFunction,
  NoteTrimInterface,
} from "./types";
import { BsPencilSquare } from "react-icons/bs";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = () => {
  const nodeRef = React.useRef(null);
  const [error, setError] = useState<string>("");
  if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", JSON.stringify([]));
  }
  const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  const [notes, setNotes] = useState<NoteInterface[]>(localNotes);
  const [areNotes, setAreNotes] = useState(false);

  const removeNote: RemoveFunction = (id: string) => {
    const restOfNotes = notes.filter((note) => note.id !== id);
    setNotes(restOfNotes);
  };

  useEffect(() => {
    notes.sort((a, b) => {
      return parseInt(b.id as string) - parseInt(a.id as string);
    });
    localStorage.setItem("notes", JSON.stringify([...notes]));
    setNote((note) => ({ ...note, title: "", content: "", author: "" }));
  }, [notes]);

  useEffect(() => {
    if (notes.length === 0) {
      setAreNotes(() => {
        return false;
      });
      return;
    }
    if (areNotes === false && notes.length > 0) {
      setAreNotes(true);
    }
  }, [notes, setAreNotes, areNotes]);

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
  };

  return (
    <>
      <div className="wrapper">
        <div className="box">
          <article className="add-container">
            <h1 className="add-container__title">
              <BsPencilSquare />
              <span> add note</span>
            </h1>
            <Form
              handlerOnChange={handlerOnChange}
              handlerOnSubmit={handlerOnSubmit}
              note={note}
              error={error}
            />
          </article>
        </div>

        {notes.length === 0 ? (
          <CSSTransition
            in={areNotes}
            timeout={500}
            classNames="my-node"
            nodeRef={nodeRef}
            className="noNotesMessage"
          >
            <h1 ref={nodeRef} key={1}>
              There are no notes, you could add few...
            </h1>
          </CSSTransition>
        ) : (
          <section className="notes-section">
            <TransitionGroup>
              {notes.map((note) => {
                return (
                  <CSSTransition
                    key={note.id}
                    timeout={700}
                    classNames="note"
                    nodeRef={nodeRef}
                  >
                    <NoteComponent
                      key={note.id}
                      {...note}
                      removeNote={removeNote}
                      nodeRef={nodeRef}
                    />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </section>
        )}
      </div>
    </>
  );
};

export default App;
