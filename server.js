const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.get("*", (req, res) => {
    let newNote =req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (noteList.noteLength).toString();

    newNote.id = noteLength;

    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})


app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteId = (req.params.id).toString();

    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));