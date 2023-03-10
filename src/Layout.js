import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import NoteItem from "./NoteItem";
export default function Layout() {
  const [navbarFlag, setNavbarFlag] = useState(true);
  const [notes, setNote] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : []
  );
  const [rightbodytoggle, setRightbodytoggle] = useState(false);
  const [notecounter, setNoteCounter] = useState(0);
  const [activenoteid, setActiveNote] = useState(0);
  const [currentnote, setcurrentnote] = useState({});
  const [quillvalue, setquillValue] = useState("");
  const [title, settitle] = useState("");
  const { yoid } = useParams();

  const getCurrentNote = () => {
    const currentnote = notes.find((newNote) => activenoteid === newNote.id);
    if (!currentnote) return;
    setcurrentnote(currentnote);
    setquillValue(currentnote.body);
    settitle(currentnote.title);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const menu = () => {
    setNavbarFlag(!navbarFlag);
  };

  const addnotes = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      body: "...",
      date: "",
    };
    setNote([newNote, ...notes]);
    setNoteCounter(notecounter + 1);
    {
      setRightbodytoggle(false);
    }
  };

  return (
    <>
      <p></p>
      <div id="navbar">
        <button id="tabsymbol" onClick={menu}>
          {" "}
          &#x2630;
        </button>
        <div id="center_of_navbar">
          <h1 id="title">Lotion</h1>
          <p id="subtext">like Notion, but worse </p>
        </div>
      </div>

      <div id="body">
        {navbarFlag && (
          <div id="leftbody">
            <div id="notesbar">
              <div id="notesbarheader">
                <h2 id="notesword">Notes</h2>
                {/* <Link to = {`${newNote.id/Edit}`}> */}
                <button
                  id="plusbutton"
                  onClick={() => {
                    addnotes();
                  }}
                >
                  {" "}
                  &#x2B;
                </button>
              </div>
              {notes.map((note) => {
                return <NoteItem key={note.id} note={note} />;
              })}
            </div>
            {notecounter === 0 && <p id="zeronotes"> no notes yet</p>}
          </div>
        )}
        <div id="rightbody">
          <Outlet context={[notes, setNote]} />
        </div>
      </div>
    </>
  );
}
