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