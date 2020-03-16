// -------------------------------------------------------------------
// Main Variables
// -------------------------------------------------------------------

// Navigation for displaying notes
const $favoriteNotes = $(`.favorite-notes`);
const $allNotes = $(`.all-notes`);
const $sidenavLi = $(`.sidenav li`);

// Note Content
const $noteTitle = $(`.note-title`);
const $noteContent = $(`.note-content`);
const $noteDiv = $(`.note-div`);

const activeItem = null;

// -------------------------------------------------------------------
// Rendering the Side Navigation
// -------------------------------------------------------------------

function myRender() {
    $.get(`/api/notes`, function(data) {

        $allNotes.empty();
        
        data.forEach( (item, index)=> {

            // setting the HTML to append

            let lineItem = `<li><a href="#!" class="waves-effect menu-item" data-index="${index}"><i class="material-icons right deleteBtn">delete_forever</i>${item.title}</a></li>`;

            // appending the HTML

            $allNotes.append(lineItem);

        });
    });
};

// -------------------------------------------------------------------
// Rendering the "Note" section of 
// -------------------------------------------------------------------

// displaying a note

const displayNote = ({title, content}, myIndex) => {

    $noteDiv.attr(`data-active`, myIndex);
    $noteTitle.html(title);
    $noteContent.html(content);
    $sidenavLi.removeClass(`active`);
    $(`[data-index="${myIndex}"]`).addClass(`active`);

}

$( document ).ready(function() { 

    myRender();

});

$( document ).ready(function() { 

    // Buttons

    const $saveBtn = $(`.saveBtn`);
    const $newBtn = $(`.newBtn`);
    const $deleteBtn = `.deleteBtn`;
    const $favBtn = $(`.favBtn`);

// -------------------------------------------------------------------
// Save note
// -------------------------------------------------------------------

    $saveBtn.on(`click`, () => {

        const newNote = {
            title: $(`.note-title`).html(),
            content: $(`.note-content`).html(),
            favorite: false,
            dataIndex: $noteDiv.attr(`data-active`)            
        };

        $.post(`/api/notes/save`, newNote)
        .then( (data) => {
            if (data) {
                $noteDiv.attr(`data-active`, data);
            }
            
            myRender();

        });
    });

// -------------------------------------------------------------------
// New note
// -------------------------------------------------------------------

$newBtn.on(`click`, () => {

    $noteTitle.empty();
    $noteContent.empty();
    $noteDiv.attr(`data-active`, `null`);

});

// -------------------------------------------------------------------
// Delete note
// -------------------------------------------------------------------

    $(document).on(`click`, $deleteBtn, function(event) {

        event.stopPropagation();

        const deleteIndex = $(this).parent().attr(`data-index`);

        const deleteNote = function(index) {
            return $.ajax({
              url: `api/notes/delete/${index}`,
              method: `DELETE`
            });
          };

        deleteNote(deleteIndex)
        .then(
            myRender()
        );

    });

// -------------------------------------------------------------------
// Change active note displayed
// -------------------------------------------------------------------

    $(document).on(`click`, `.menu-item`, function() {

        const activeIndex =  $(this).attr(`data-index`);

        $.get(`/api/notes/get/${activeIndex}`, function(data) {    

            displayNote(data, activeIndex);

        });

    });

});