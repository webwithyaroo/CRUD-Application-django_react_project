import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");

        getNote();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to make note.");

        getNote();
      })
      .catch((err) => {
        console.error("Error while creating a note:", err);
        alert("An error occurred while creating the note.");
      });
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note onDelete={deleteNote} key={note.id} note={note} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
          type="text "
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="submit" value={"Submit"} />
      </form>
    </div>
  );
};

export default Home;
