import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"
import App, { Note } from "../App"


export interface EditorProps {
    currentNote: Note;
    updateNote: (t: string) => void;
}

export default function Editor(props: EditorProps) {
    const [selectedTab, setSelectedTab] = React.useState("write" as "write" | "preview" | undefined)
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    return (
        <section className="pane editor">
            <ReactMde
                value={props.currentNote.body}
                onChange={props.updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
