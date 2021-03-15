import { NoteInterface } from "../types";

const Note = ({ id, title, content, author, removeNote }: NoteInterface) => {
  return (
    <article className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{author}</p>
      <p>{new Date(parseInt(id as string)).toLocaleString()}</p>
      <button onClick={() => removeNote!(id as string)}>delete note</button>
    </article>
  );
};

export default Note;
