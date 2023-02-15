import { Note } from "../App";

export interface SidebarProps {
    notes: Note[];
    currentNote: Note;
    newNote: () => void;
    setCurrentNoteId: (v: string) => void;
    deleteNote: (event: React.MouseEvent, noteId: string) => void;
}

export default function Sidebar(props: SidebarProps) {
    const noteElements = props.notes.map((note, index) => {

        let title: String = note.body.slice(0, note.body.indexOf("\n"));

        return <div key={note.id}>
            <div
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{title}</h4>
                <button
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}                
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    });

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
