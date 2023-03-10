import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Edit() {
  const [quillvalue, setquillValue] = useState("");
  const [content, setcontent] = useOutletContext();
  const { ID } = useParams();
  const navigate = useNavigate();

  const currentnote = content.find((newNote) => ID === newNote.id);

  const [title, setTitle] = useState(currentnote.title);
  const [date, setDate] = useState(currentnote.date);
  const [body, setBody] = useState(currentnote.body);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  function getCurrentDate() {
    const date = new Date();
    const formattedDate = formatDate(date);
    return formattedDate;
  }

  const deletefunct = (id) => {
    const x = window.confirm("Are you sure you want to delete this note?");
    if (x) {
      const i = content.indexOf(currentnote);
      if (i > -1) {
        content.splice(i, 1);
      }
      localStorage.setItem("content", JSON.stringify(content));
      navigate("/", { replace: true });
    } else {
      navigate(`/${currentnote.id}`, { replace: true });
    }
  };

  function savebutton() {
    currentnote.title = title;
    currentnote.date = getCurrentDate();
    currentnote.body = body;
    localStorage.setItem("notes", JSON.stringify(content));
    navigate(`/${currentnote.id}`, { replace: true });
  }

  // const getCurrentNote = () => {
  //     const currentnote = notes.find((newNote) => activenoteid === newNote.id);
  //     if (!currentnote) return;
  //     setcontent(currentnote);
  //     setquillValue(currentnote.body);
  //     settitle(currentnote.title);
  // };

  return (
    <>
      <div id="currentnote">
        <div id="bar">
          <div id="title-and-date">
            <input
              id="titleinput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              id="datetime"
              value={getCurrentDate()}
              onChange={(e) => setDate(e.target.value)}
            ></input>
            {/* onChange={(e) => setDate(e.target.value) */}
            {/*</div>{new Date(date).toLocaleDateString("en-US")}</input>*/}
          </div>

          <div id="save-and-edit-buttons">
            {" "}
            {/* GIVE ID */}
            <button
              className="pushleft"
              id="deletebutton"
              onClick={() => {
                deletefunct(currentnote.id);
              }}
            >
              {" "}
              Delete{" "}
            </button>
            <button className="pushleft" id="savebutton" onClick={savebutton}>
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </div>
      <div id="topbar">
        <ReactQuill
          id="quill"
          theme="snow"
          placeholder="Your Note Here"
          value={body}
          onChange={setBody}
        />
      </div>
    </>
  );
}
