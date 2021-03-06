// -------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------
const express = require(`express`);
const path = require(`path`);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.use(express.json());

const notes = require(`./db/notes`);

// -------------------------------------------------------------------
// Changing active note item
// -------------------------------------------------------------------

app.get(`/api/notes/get/:index`, function(req, res){
    const myIndex = req.params.index;
    return res.json(notes[myIndex]);
});

// -------------------------------------------------------------------
// Getting data from "save"
// -------------------------------------------------------------------

app.post(`/api/notes/save`, function(req, res) {

    const {title, content, favorite, dataIndex} = req.body;

    if (dataIndex === `null`) {
        notes.push({title, content, favorite});
        const newIndex = notes.length - 1;
        return res.send(newIndex.toString());
    }

    else {
        notes[dataIndex] = {title, content, favorite};
        return res.end();
    }
    
});

// -------------------------------------------------------------------
// Deleting data from "notes"
// -------------------------------------------------------------------

app.delete(`/api/notes/delete/:index`, function(req, res) {
    const deleteIndex = parseInt(req.params.index);

    notes.splice(deleteIndex, 1);

    return res.end();
})

// -------------------------------------------------------------------
// Routes
// -------------------------------------------------------------------
app.get(`/api/notes`, function(req, res){
    return res.json(notes);
});

app.get(`/`, function(req, res){
    res.sendFile(path.join(__dirname, `public/index.html`));
});

app.get(`/*`, function(req, res){
    res.sendFile(path.join(__dirname, `public/note.html`));
});



// -------------------------------------------------------------------
// Starting the Server
// -------------------------------------------------------------------

app.listen(PORT, () => {console.log(`App listening on PORT ${PORT}`);});