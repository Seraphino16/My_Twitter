$(document).ready(function() {

    
    const userDataJSON = getCookie('user_data');

    console.log('cookie :' + userDataJSON);

    if (userDataJSON) {
        const user = JSON.parse(userDataJSON);
        const firstname = user.firstname;
        const username = user.username;
        const id = user.id;

    if (firstname && username) {

        $('.name').html('<strong>' + firstname + '</strong>');
        $('.username').text('@' + username);
    }

    $('#searchButton').click(function () {

        console.log('click');

        const searchTerm = $('#searchInput').val();

        searchUsers(searchTerm);
    });
}

});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function searchUsers(searchTerm) {
    $.ajax({
        type: 'POST',
        url: '../controllers/explore_controller.php',
        data: { searchTerm: searchTerm },
        dataType: 'json',
        success: function(response) {

            console.log(response);

            $('#resultsContent').empty();

            response.forEach(user => {
                const userResult =  `<div class="tweet">
                <div class="tweet-header">
                <img src="../publics/img/profile.png" alt="profile photo" class="tweet-profile">
                <div class="tweet-text">
                    <div>
                    <p class="name"><strong>${user.firstname}</strong></p>
                     <p class="username">@${user.username}</p>
                    </div>
                </div>
            </div>
                <div class="home-title">
                    <p class="bio"></p>
                </div>
                    <div>
                    <a href="profil.php?username=${encodeURIComponent(user.username)}" class="btn btn-primary">Voir le profil</a>   
                    </div>
                </div>`
                $('#resultsContent').append(userResult);


            if(user.bio !== null && user.bio.length !== 0) {
                $(".bio").text(user.bio);
            }
            
        });
            
        }, 


        error: function(xhr, status, error) {

            console.log('Erreur AJAX : ');
            console.log('status: ' + status);
            console.log('error: ' + error);
            console.log('responseText: ' + xhr.responseText);
            alert('Erreur AJAX : ' + status);
        }
    });
}


function formatJoinedDate (dateString) {

    let newDate = new Date(dateString)

    let year = newDate.getFullYear()
    let month = newDate.toLocaleString("en-us", { month: "long"});

    return " Joined " + month + " " + year;
}
