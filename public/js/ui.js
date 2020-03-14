$( document ).ready(function() { 

    const $saveBtn = $(`.saveBtn`);
    const $deleteBtn = $(`.deleteBtn`);
    const $favBtn = $(`.favBtn`);

// -------------------------------------------------------------------
// Save note
// -------------------------------------------------------------------

    $saveBtn.on(`click`, () => {

        const newNote = {
            title: $(`.note-title`).html(),
            content: $(`.note-content`).html(),
            favorite: false            
        };

        $.post(`/api/notes`, newNote)
        .then(
            myRender()
        );
    });

});