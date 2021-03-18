import React from "react";

import { FormInterface } from "../types";
import { GiEagleHead } from "react-icons/gi";
import { BsCardText } from "react-icons/bs";
import { RiUserVoiceFill } from "react-icons/ri";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Form = ({
  handlerOnChange,
  handlerOnSubmit,
  note,
  error,
}: FormInterface) => {
  const nodeRefs = React.useRef(null);

  return (
    <form onSubmit={handlerOnSubmit}>
      <div className="input-container">
        <label htmlFor="title">
          <GiEagleHead />
          <span>title: </span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={note.title}
          onChange={handlerOnChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="content">
          <BsCardText />
          <span>content: </span>
        </label>

        <textarea
          className="text-area"
          name="content"
          id="content"
          value={note.content}
          onChange={handlerOnChange}
        ></textarea>
      </div>
      <div className="input-container">
        <label htmlFor="author">
          <RiUserVoiceFill />
          <span>author :</span>
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={note.author}
          onChange={handlerOnChange}
        />
      </div>
      <TransitionGroup>
        <CSSTransition
          nodeRef={nodeRefs}
          key={error ? "k" : "d"}
          timeout={500}
          classNames="note"
        >
          <div key={error ? "k" : "d"}>
            {error && (
              <div ref={nodeRefs} className="error">
                <p>{error}</p>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
      <button type="submit" className="btn">
        add note
      </button>
    </form>
  );
};

export default Form;
