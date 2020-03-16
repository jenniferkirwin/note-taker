// -------------------------------------------------------------------
// Main Variables
// -------------------------------------------------------------------

// Navigation for displaying notes
const $favoriteNotes = $(`.favorite-notes`);
const $allNotes = $(`.all-notes`);


// Note Content
const $noteTitle = $(`.note-title`);
const $noteContent = $(`.note-content`);
const $noteDiv = $(`.note-div`);

// Buttons
const $saveBtn = $(`.saveBtn`);
const $newBtn = $(`.newBtn`);
const $deleteBtn = `.deleteBtn`;

// Active Note
// let activeItem = null;

// -------------------------------------------------------------------
// Rendering the Side Navigation & Active Menu Item
// -------------------------------------------------------------------

// rendering side navigation
function myRender() {

    $.get(`/api/notes`, function(data) {

        $allNotes.empty();
        
        data.forEach( (item, index) => {

            // setting the HTML to append
            let lineItem = `<li><a href="#!" class="waves-effect menu-item" data-index="${index}"><i class="material-icons right deleteBtn">delete_forever</i>${item.title}</a></li>`;

            // appending the HTML
            $allNotes.append(lineItem);

        });

    });
};

function renderFirstNote() {
    $.get(`/api/notes`, function(data) {

        const myDataLen = data.length;
        
        if (myDataLen > 0) {
            displayNote(data[0], 0);
        }
    });    
}

// rendering active menu item

// function setActiveMenu() {

//     $(`.sidenav li`).removeClass(`active`);

//     test = $(`[data-index=1]`).parent();


//     if (activeItem != null) {
//         console.log(`hi`);
//         console.log(test);
//         test.addClass(`active`);        
//     }
// }

// -------------------------------------------------------------------
// Rendering the "Note" section of 
// -------------------------------------------------------------------

// displaying a note

const displayNote = ({title, content}, myIndex) => {

    activeItem = myIndex;

    $noteDiv.attr(`data-active`, myIndex);
    $noteTitle.html(title);
    $noteContent.html(content);

}

$( document ).ready(function() { 

    myRender();
    renderFirstNote();

// -------------------------------------------------------------------
// Save note
// -------------------------------------------------------------------

    $saveBtn.on(`click`, () => {

        const newTitle = $(`.note-title`).html();
        const newContent = $(`.note-content`).html();

        if (newTitle.replace(`&nbsp;`,``) === `` || newContent.replace(`&nbsp;`,``) === ``) {
            M.toast({html: `Please enter a title and content!`});
        }

        else {
            const newNote = {
                title: newTitle,
                content: newContent,
                favorite: false,
                dataIndex: $noteDiv.attr(`data-active`)            
            };
    
            $.post(`/api/notes/save`, newNote)
            .then( (data) => {
                if (data) {
                    $noteDiv.attr(`data-active`, data);
                    activeItem = data;
                }
                
                myRender();

                M.toast({html: `Note saved!`});
    
            });
        }


    });

// -------------------------------------------------------------------
// New note
// -------------------------------------------------------------------

$newBtn.on(`click`, () => {

    $noteTitle.empty();
    $noteContent.empty();
    $noteDiv.attr(`data-active`, `null`);
    $(`.sidenav li`).removeClass(`active`);

});

// -------------------------------------------------------------------
// Delete note
// -------------------------------------------------------------------

    $(document).on(`click`, $deleteBtn, function(event) {

        event.stopPropagation();

        const deleteIndex = $(this).parent().attr(`data-index`);

        if (deleteIndex === $noteDiv.attr(`data-active`)) {
            $noteTitle.empty();
            $noteContent.empty();
            $noteDiv.attr(`data-active`, `null`);          
        }

        const deleteNote = function(index) {
            return $.ajax({
              url: `api/notes/delete/${index}`,
              method: `DELETE`
            });
          };
        
        M.toast({html: `Note deleted!`});

        deleteNote(deleteIndex)        
        .then(
            myRender()
        );

    });

// -------------------------------------------------------------------
// Change active note displayed
// -------------------------------------------------------------------

    $(document).on(`click`, `.menu-item`, function() {

        const $sidenavLi = $(`.sidenav li`);
        const $activeLi = $(this).parent();
        const activeIndex =  $(this).attr(`data-index`);

        $.get(`/api/notes/get/${activeIndex}`, function(data) {    

            displayNote(data, activeIndex);

        })
        .then( () => {

            $sidenavLi.removeClass(`active`);
            $activeLi.addClass(`active`);

        });

    });

});