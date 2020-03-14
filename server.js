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

// const notes = [
//     {
//         routeName: "notetest",
//         title: "My First Note",
//         content: "Lots of lovely text",
//         favorite: true
//     },
//     {
//         routeName: "notetest2",
//         title: "My Second Note",
//         content: "Lots of lovely text",
//         favorite: true
//     }
// ];

// -------------------------------------------------------------------
// Routes
// -------------------------------------------------------------------

app.get(`/`, function(reg, res){
    res.sendFile(path.join(__dirname, `../public/index.html`));
});

app.get(`/api/notes`, function(reg, res){
    return res.json(notes);
});

// app.get(`/`, function(reg, res){
//     res.sendFile(path.join(__dirname, `../public/notes.html`));
// });

// -------------------------------------------------------------------
// Starting the Server
// -------------------------------------------------------------------

app.listen(PORT, () => {console.log(`App listening on PORT ${PORT}`);});