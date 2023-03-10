import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useOutletContext } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function View() {
  const [quillvalue, setquillValue] = useState("");
  const [notes, setNote] = useState([]);
  const { ID } = useParams();
  const [content, setcontent] = useOutletContext();
  const navigate = useNavigate();
  const currentnote = content.find((newNote) => ID === newNote.id);

  function editButton() {
    navigate(`/${currentnote.id}/edit`, { replace: true });
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

  const date = formatDate(currentnote.date);
  console.log(getCurrentDate());

  //   setActiveNote(ID);

  return (
    <>
      <div id="currentnote">
        <div id="bar">
          <div id="title-and-date">
            <div id="titleinput">{currentnote.title}</div>
            <div id="datetime">{getCurrentDate()}</div>
          </div>

          <div id="save-and-edit-buttons">
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
            {/* {console.log(id)} */}
            <button className="pushleft" id="savebutton" onClick={editButton}>
              {" "}
              Edit{" "}
            </button>
          </div>
        </div>
      </div>
      <div id="topbar">
        <div
          id="notepreview"
          dangerouslySetInnerHTML={{ __html: currentnote.body }}
        ></div>
        {/* <ReactQuill id="quill" theme="snow" value={quillvalue} /> */}
      </div>
    </>
  );
}
