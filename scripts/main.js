function init() {
    let movie_id = getMovieID();
    $.ajax({
        url: `http://dev-tcmws.tcm.com/tcmws/titles/${movie_id}`,
    }).done(function(data) {
        let title = data.tcm.title,
            castMembers;
        console.log(data);
        $("#synopsis p").text(title.description);
        $("h1.title").text(title.name);

        castMembers = getCastMembers(title.credits);
        for (let i = 0; i < castMembers.length; i++) {
            if (i == 0 || i % 3 == 0) {
                $("#cast").append(`<div class="row"></div>`);
            }
            $("#cast .row:last-child").append(`<div>
                    <h4>${castMembers[i].FirstName} ${castMembers[i].LastName}</h4>
                    <h6>${castMembers[i].characterName}</h6>
                </div>`);
        }

        $("header .image").css("background-image", `url(${title.profileImageUrl})`);
    })
}

function getMovieID() {
    let indexForEqualSign = location.search.indexOf("=");
    return location.search.substring(indexForEqualSign + 1, location.search.length);
}

function getCastMembers(data) {
    let castMembers = [];
    for (let i = 0; i < 9; i++) {
        if (data[i].roleCategory == "Cast") {
            castMembers.push(data[i]);
        }
    }
    return castMembers;
}

$(init);