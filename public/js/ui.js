$( document ).ready(function() { 

    const $sidenav = $(`.sidenav`);
    const $saveBtn = $(`.saveBtn`);
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
            dataIndex: $noteDiv.attr(`data-index`)            
        };

        $.post(`/api/notes/save`, newNote)
        .then(
            myRender()
        );
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

        $.get(`/api/notes/${activeIndex}`, function(data) {    

            displayNote(data, activeIndex);

        });

    });

});