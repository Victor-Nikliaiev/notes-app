import React from "react";
import { FormInterface } from "../types";

const Form = ({
  handlerOnChange,
  handlerOnSubmit,
  note,
  error,
}: FormInterface) => {
  return (
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
      {error && <h1 style={{ color: "red", fontWeight: "bold" }}>{error}</h1>}
      <button type="submit">add note</button>
    </form>
  );
};

export default Form;
