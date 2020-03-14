const $favoriteNotes = $(`.favorite-notes`);
const $allNotes = $(`.all-notes`);

function myRender() {
    $.get(`/api/notes`, function(data) {
        $favoriteNotes.empty();
        $allNotes.empty();
        
        data.forEach( (item)=> {
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

            let lineItem = `<li><a href="#!" class="waves-effect"><i class="material-icons right favBtn">${starState}</i><i class="material-icons right deleteBtn">delete_forever</i>${item.title}</a></li>`;

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

$( document ).ready(function() { 

    myRender();

});