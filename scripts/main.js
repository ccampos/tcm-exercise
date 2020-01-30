function init() {
    let movie_id = getMovieID();
    $.ajax({
        url: `http://dev-tcmws.tcm.com/tcmws/titles/${movie_id}`,
    }).done(function(data) {
        let title = data.tcm.title,
            castMembers,
            images,
            defaultImage = title.profileImageUrl;
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

        if (title.archives[0]) {
            images = title.archives[0].images;
            $("#photos_videos #main").css("background-image", `url(${images[0].url})`)
            $("#photos_videos #top_left").css("background-image", `url(${images[1].url})`)
            $("#photos_videos #top_right").css("background-image", `url(${images[2].url})`)
            $("#photos_videos #bottom_left").css("background-image", `url(${images[3].url})`)
            $("#photos_videos #bottom_right").css("background-image", `url(${images[4].url})`)
        } else {
            $("#photos_videos #main").css("background-image", `url(${defaultImage})`)
            $("#photos_videos #top_left").css("background-image", `url(${defaultImage})`)
            $("#photos_videos #top_right").css("background-image", `url(${defaultImage})`)
            $("#photos_videos #bottom_left").css("background-image", `url(${defaultImage})`)
            $("#photos_videos #bottom_right").css("background-image", `url(${defaultImage})`)
        }

        if (title.mpaaRating) {
            $(".film_rating").text(title.mpaaRating);
        } else {
            $(".film_rating").text('NR');
        }

        $("#film_date").text(title.releaseYear);

        $("#film_duration").text(title.runtimeHours);
    });
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