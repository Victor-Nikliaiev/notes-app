import { NoteInterface } from "../types";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";

const Note = ({
  id,
  title,
  content,
  author,
  removeNote,
  nodeRef,
}: NoteInterface) => {
  return (
    <article ref={nodeRef} className="note">
      <div className="note__data">
        <h1 className="note__data__title">
          <HiPencilAlt className="note__data__ico" />
          {title}
        </h1>
        <p className="note__data__content">{content}</p>
        <div className="note__data__dateAuthor">
          <p className="note__data__date">
            <MdDateRange className="note__data__ico" />
            {new Date(parseInt(id as string)).toLocaleString()}
          </p>
          <p className="note__data__author">
            <BsFillPeopleFill className="note__data__ico" />
            {author}
          </p>
        </div>

        <button
          className="note__data__delBtn"
          onClick={() => removeNote!(id as string)}
        >
          delete note
        </button>
      </div>
    </article>
  );
};

export default Note;
