import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Snackbar, Alert } from '@mui/material';

export function Dashboard() {
  const [newnote, setNotes] = useState("");
  const [existingNotes, setExistingNotes] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  // Function to fetch notes from the backend
  const fetchNotes = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/getNotes", {
        headers: { Authorization: token },
      })
      .then((res) => setExistingNotes(res.data.notes))
      .catch((err) => console.error("Error fetching notes", err));
  };

  // Fetch notes when the component loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to handle logout
  function logoutBtw() {
    localStorage.removeItem("token");
    navigate("/");
  }

  // Function to save notes to the backend
  function saveNotesbtw() {
    const token = localStorage.getItem("token");

    if (newnote !== "") {
      axios
        .post(
          "http://localhost:5000/saveNotes",
          { notes: newnote },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          if (res.status === 200) {
            setSnackbar({ open: true, message: "Notes saved successfully", severity: "success" });
            fetchNotes(); // Fetch updated notes after saving
            setNotes(""); // Clear input after saving
          }
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            setSnackbar({ open: true, message: "Something went wrong", severity: "error" });
          }
        });
    } else {
      setSnackbar({ open: true, message: "First write something", severity: "error" });
    }
  }

  // Function to delete a note
  async function deleteNote(index) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/delete-note/${index}`, {
        headers: { Authorization: token },
      });
      setExistingNotes(res.data.notes); // Update notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // Function to close the snackbar
  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          textAlign: "left",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        NoteBook
      </div>
      <div
        style={{
          textAlign: "center",
          color: "#6B7280",
          fontSize: "14px",
          marginTop: "10px",
        }}
      >
        Number of notes: {existingNotes.length}
      </div>

      {/* Main Content: Create Note (Left) and All Notes (Right) */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Left Section: Write your notes */}
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgb(13, 4, 4)",
            padding: "20px",
            flex: 1,
          }}
        >
          <h2
            style={{
              color: "#6B7280",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Write your notes
          </h2>
          <textarea
            rows={10}
            cols={40}
            value={newnote}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              border: "1px solid #D1D5DB",
              padding: "5px",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <br />
          <button
            onClick={saveNotesbtw}
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Save the notes
          </button>
          <br />
          <button
            onClick={logoutBtw}
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Right Section: Your Notes */}
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgb(13, 4, 4)",
            padding: "20px",
            flex: 1,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <h2
            style={{
              color: "#6B7280",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Your Notes
          </h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {existingNotes.map((note, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#bababa",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {note}
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteNote(index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff0505" }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}