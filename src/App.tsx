import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"



export interface Note {
  id: string;
  body: string;
}

export default function App() {

  // console.log("App main body")
  const [notes, setNotes] = React.useState(
    // LAZY State initialization
    // - passing a function as a parameter to useState method, will determine te run of the code inside the functin
    // only one time, at the creation of the component
    // - passing only code as a parameter to useState method, will run the code on every render
    () => {
      console.log("initializing notes from local storage");
      return JSON.parse(localStorage.getItem("notes") || "[]") as Note[];
    });
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    console.log("writing notes to localStorage on render if changes exist")
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  function deleteNote(event: React.MouseEvent, noteId: string) {
    event.stopPropagation();
    setNotes(oldNotes => {
      return oldNotes.filter(note => note.id != noteId);
    })
}

  function createNewNote() {
    const newNote: Note = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text: string) {
    setNotes(oldNotes => {
      let newNotesArray: Note[] = [];
      for (let i = 0; i < oldNotes.length; i++) {
        let note: Note = oldNotes[i];
        if (note.id == currentNoteId) {
          newNotesArray.unshift({ ...note, body: text });
        } else {
          newNotesArray.push(note);
        }
      }
      return newNotesArray;
    })
  }

  function findCurrentNote(): Note {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now I m on the "first branch test"
            </button>
          </div>

      }
    </main>
  )
}


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App
