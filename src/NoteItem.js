import { useParams, useNavigate } from "react-router-dom";

function NoteItem({ note }) {
  const navigate = useNavigate();
  const { id } = useParams();

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

  function viewNote() {
    navigate(`/${note.id}`, { replace: true });
  }

  return (
    <li
      id={`specific_note${note.id === id ? " active" : ""}`}
      onClick={viewNote}
    >
      <h2 class="insidenotecard">{note.title}</h2>
      <p class="insidenotecard">{getCurrentDate()}</p>
      <p
        class="insidenotecard"
        dangerouslySetInnerHTML={{
          __html: note.body && note.body.substr(0, 100),
        }}
      ></p>
    </li>
  );
}

export default NoteItem;
