const $favoriteNotes = $(`.favorite-notes`);
const $allNotes = $(`.all-notes`);
const $noteTitle = $(`.note-title`);
const $noteContent = $(`.note-content`);
const $noteDiv = $(`.note-div`);

// -------------------------------------------------------------------
// Rendering the Side Navigation
// -------------------------------------------------------------------

function myRender() {
    $.get(`/api/notes`, function(data) {
        $favoriteNotes.empty();
        $allNotes.empty();
        
        data.forEach( (item, index)=> {
            let favorite = item.favorite;
            let starState;

            // checking to see what the star icon should be

            if (favorite === true) {
                starState = `star`;
            }
            else {
                starState = `star_outline`;
            }

            // setting the HTML to append

            let lineItem = `<li><a href="#!" class="waves-effect menu-item" data-index="${index}"><i class="material-icons right favBtn">${starState}</i><i class="material-icons right deleteBtn">delete_forever</i>${item.title}</a></li>`;

            // appending the HTML

            if (item.favorite === true) {
                $favoriteNotes.append(
                    lineItem
                )               
            }

            else {
                $allNotes.append(
                    lineItem
                );               
            }

        });
    });
};

// -------------------------------------------------------------------
// Rendering the "Note" section of 
// -------------------------------------------------------------------

// displaying a note

const displayNote = ({title, content}, myIndex) => {

    $noteDiv.attr(`data-index`, myIndex);
    $noteTitle.html(title);
    $noteContent.html(content);

}

// displaying a note when page renders

// function activeNote() {
//     $.get(`/api/notes`, function(data) {    

//         if (data.length > 0) {

//             displayNote(data, 0);

//         };

//     });
// }

$( document ).ready(function() { 

    myRender();

});