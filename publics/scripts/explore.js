$(document).ready(function() {

    const userDataJSON = getCookie('user_data');

    console.log('cookie :' + userDataJSON);

    if (userDataJSON) {
        const user = JSON.parse(userDataJSON);
        const fullname = user.firstname + ' ' + user.lastname;
        const username = user.username;
        const id = user.id;

    if (fullname && username) {

        $('.name').html('<strong>' + fullname + '</strong>');
        $('.username').text('@' + username);
    }

    $('.search-input').keyup(function () {

        console.log('click');

        const searchTerm = $('.search-input').val().trim();

        if (searchTerm.length > 0) {
            if (searchTerm.startsWith('#')) {
                searchHashtags(searchTerm);
            } else {
                searchUsers(searchTerm);
                
            }
        } else {
            $('#resultsContent').empty();
        }
    });
}   

        $(document).on('click', '.hashtag-link', function(event) {

            event.preventDefault();
            const hashtag = $(this).text();
            searchTweet(hashtag);
        });

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


function searchHashtags(searchTerm) {
    $.ajax({
        type: 'POST',
        url: '../controllers/explore_controller.php',
        data: { searchTerm: searchTerm },
        dataType: 'json',
        success: function(response) {

            console.log(response);

            $('#resultsContent').empty();

            response.forEach(hashtag => {

                const hashtagResult =  `<div class="tweet">
                <a href="explore.php?tag=${encodeURIComponent(hashtag.name)}" class="hashtag-link">${hashtag.name}</a>
                <p>${hashtag.hashtag_count} publications</p>
            </div>`
                $('#resultsContent').append(hashtagResult);

            });
        },
    });
}

function searchTweet(hashtag) {
    $.ajax({
        type: 'POST',
        url: '../controllers/explore_controller.php',
        data: { hashtag: hashtag },
        dataType: 'json',
        success: function(tweets) {

            console.log();

            $('#resultsContent').empty();

            tweets.forEach(tweet => {
                const tweetResult = `
                    <div class="tweet">
                    <div class="tweet-header">
                        <img src="../public/img/profile.png" alt="profile photo" class="tweet-profile">
                        <div class="tweet-text">
                            <div class="tweet-author">${tweet.name}</div>
                            <div class="tweet-author-handle">@$ · </div>
                        </div>
                    </div>
                    <div class="tweet-message"></div>
                    <div class="tweet-stats">
                        <div><i class="far fa-comment"></i> 0</div>
                        <div><i class="fas fa-retweet"></i> 0</div>
                        <div><i class="far fa-heart"></i> 0</div>
                    </div>
                </div>
                `;
                $('#resultsContent').append(tweetResult);
            });

            const newUrl = window.location.origin + window.location.pathname + '?tag=' + encodeURIComponent(hashtag);
            history.pushState({ path: newUrl }, '', newUrl);
        },

        error: function(xhr, status, error) {
            
        
        }
    });
}

