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

// -------------------------------------------------------------------
// Routes
// -------------------------------------------------------------------

app.get(`/`, function(reg, res){
    res.sendFile(path.join(__dirname, `../public/index.html`));
});

// app.get(`/`, function(reg, res){
//     res.sendFile(path.join(__dirname, `../public/notes.html`));
// });

// -------------------------------------------------------------------
// Starting the Server
// -------------------------------------------------------------------

app.listen(PORT, () => {console.log(`App listening on PORT ${PORT}`);});