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

    $(document).on(`click`, $deleteBtn, function() {

        const deleteIndex = {
            index: $(this).parent().attr(`data-index`)
        }

        $.delete(`/api/notes/delete`, deleteIndex)
        .then(
            myRender()
        )

        var deleteNote = function(id) {
            return $.ajax({
              url: "api/notes/" + id,
              method: "DELETE"
            });
          };

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