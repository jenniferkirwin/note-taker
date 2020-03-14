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
// Routes
// -------------------------------------------------------------------

app.get(`/`, function(reg, res){
    res.sendFile(path.join(__dirname, `../public/index.html`));
});

app.get(`/api/notes`, function(reg, res){
    return res.json(notes);
});

// -------------------------------------------------------------------
// Getting data from "save"
// -------------------------------------------------------------------

app.post(`/api/notes`, function(req, res) {

    const newNote = req.body;
    notes.push(newNote);

    return res.json(notes);
    
});

// -------------------------------------------------------------------
// Starting the Server
// -------------------------------------------------------------------

app.listen(PORT, () => {console.log(`App listening on PORT ${PORT}`);});