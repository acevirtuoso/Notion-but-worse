// import React from 'react';
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";

import {
  Rount,
  Routes,
  useOutlet,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import edit from "./Edit";
import Layout from "./Layout";

// when you want to add the date the note was modified use this:  {new Date(newNote.date).toLocaleDateString("en-US")}
{
  /* <Routes>
  <Route path = '/' element = {<App/>}/>
</Routes> */
}
function App() {
  const [navbarFlag, setNavbarFlag] = useState(true);
  const [quillvalue, setquillValue] = useState("");
  const [notes, setNote] = useState([]);
  const [rightbodytoggle, setRightbodytoggle] = useState(false);
  const [activenoteid, setActiveNote] = useState(0);
  const [notecounter, setNoteCounter] = useState(0);
  const [title, settitle] = useState("");
  const [currentnote, setcurrentnote] = useState({});

  // const maketitle = () => {
  //   const title = document.getElementById('titleinput').value;
  //   settitle(title);
  // }
  const menu = () => {
    setNavbarFlag(!navbarFlag);
  };

  const getCurrentNote = () => {
    const currentnote = notes.find((newNote) => activenoteid === newNote.id);
    if (!currentnote) return;
    setcurrentnote(currentnote);
    setquillValue(currentnote.body);
    settitle(currentnote.title);
  };

  const save = () => {
    // if (quillvalue !== ""){
    //   updateNote({
    //     id : activenoteid,
    //     title: "Untitled",
    //     body: quillvalue,
    //     date: Date.now()
    //   })
    // }
    // if (title !== ""){
    //   updateNote({
    //     id : activenoteid,
    //     title: title,
    //     body: "...",
    //     date: Date.now()
    //   })
    // }
    updateNote({
      id: activenoteid,
      title: title,
      body: quillvalue,
      date: Date.now(),
    });
  };

  const updateNote = (updatednote) => {
    const updatedarray = notes.map((newNote) => {
      if (newNote.id === activenoteid) {
        return updatednote;
        // return {...newNote, body: quillvalue};
      }
      return newNote;
    });
    setNote(updatedarray);
  };

  const addnotes = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      body: "...",
      date: Date.now(),
    };
    setNote([newNote, ...notes]);
    setNoteCounter(notecounter + 1);
    {
      setRightbodytoggle(false);
    }
  };

  const deletefunct = (deleteid) => {
    setNote(notes.filter((newNote) => newNote.id !== deleteid));
    setNoteCounter(notecounter - 1);
    setActiveNote(0);
  };

  return (
    <>
      <Layout />

      <div id="rightbody">
        {/* notecounter: {notecounter} */}

        <>
          {rightbodytoggle && (
            <>
              <div id="currentnote">
                <input
                  id="titleinput"
                  type="text"
                  placeholder="Untitled"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
                <button
                  className="pushleft"
                  id="deletebutton"
                  onClick={() => {
                    deletefunct(activenoteid);
                    setRightbodytoggle(false);
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
                <button
                  className="pushleft"
                  id="savebutton"
                  onClick={() => {
                    save();
                  }}
                >
                  {" "}
                  Save{" "}
                </button>
              </div>
              <div id="topbar">
                <ReactQuill
                  id="quill"
                  theme="snow"
                  value={quillvalue}
                  onChange={setquillValue}
                />
              </div>
            </>
          )}
          {activenoteid === 0 && (
            <p id="rightplaceholder"> Select a note, or create a new one</p>
          )}
          {/* notecounter: {notecounter} */}
          {/* <Edit context = {[activenoteid, setRightbodytoggle, setquillValue, settitle, setcurrentnote, setNote, setNoteCounter]}></Edit> */}
        </>
      </div>

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </>
  );
}

export default App;
// dangerouslySetInnerHTML={{__html: quillvalue}}
