$(document).ready(function () {
    console.log("Hello");

    let idValue  = 16;

    $.ajax({
        url: "../../controllers/getCurrentUser.php",
        method: "POST",
        data: {
            id: idValue,
        },
        success: function (data) {
            // console.log(data);
            dataJSON = JSON.parse(data);
            console.log(dataJSON);
            displayUser(dataJSON[0]);
        },
        error: function (error) {
            console.log(error);
        }
    })

    $.ajax({
        url: "../../controllers/getTweets.php",
        method: "POST",
        success: function (data) {
            let tweets = JSON.parse(data);
            console.log(tweets);
        }
    })
})

function displayUser(user) {
    console.log(user);

    let username = "@" + user.username;

    $(".pseudo").text(username);
    $(".fullname").text(user.firstname);

    if(user.bio !== null && user.bio.length !== 0) {
        $(".bio").text(user.bio);
    }
    
    if(user.localisation !== null && user.localisation.length !== 0) {
         $(".bi-geo-alt-fill").text(user.localisation);
         $(".bi-geo-alt-fill").css("color", "gray");
    } else {
        $(".bi-geo-alt-fill").parent().parent().css("display", "none");
    }

    if(user.website !== null && user.website.length !== 0) {
        $(".fa-link").css("color", "gray");
         $(".website-url").text(user.website);
    } else {
        $(".website-url").parent().parent().css("display", "none");
    }
   
    let joinedDate = formatJoinedDate(user.created_at);
    $(".bi-calendar-event").text(joinedDate);
    $(".bi-calendar-event").css("color", "gray");
   

    $.ajax({
        url: "../../controllers/getNbFollows.php",
        method: "POST",
        success: function (data) {
            $(".count-following").text(data);
        }
    });

    $.ajax({
        url: "../../controllers/getNbFollowers.php",
        success: function (data) {
            $(".count-followers").text(data);
        }
    })

}

function formatJoinedDate (dateString) {

    let newDate = new Date(dateString)

    let year = newDate.getFullYear()
    let month = newDate.toLocaleString("en-us", { month: "long"});

    return " Joined " + month + " " + year;
}

$(".count-following-i").click(function () {
    console.log("Let's get your follows !");

    idValue = 16;

    $.ajax({
        url: "../../controllers/getFollowingList.php",
        method: "POST",
        data: {
            id: idValue,
        },
        success: function(data) {
            let follows = JSON.parse(data)
            console.log(follows);
        },
        error: function(data) {
            console.log(data);
        }
    });

})

$(".count-followers-i").click(function () {
    console.log("Let's get your followers !");

    idValue = 16;

    $.ajax({
        url: "../../controllers/getFollowersList.php",
        method: "POST",
        data: {
            id: idValue,
        },
        success: function(data) {
            let followers = JSON.parse(data);
            console.log(followers);
        }
    })
})