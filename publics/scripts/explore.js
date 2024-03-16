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

        const urlParams = new URLSearchParams(window.location.search);
        const hashtagFromUrl = urlParams.get('tag');
    console.log(hashtagFromUrl);
     
        if (hashtagFromUrl) {

            const hashtag = hashtagFromUrl.startsWith('#') ? hashtagFromUrl : `#${hashtagFromUrl}`;
           
            searchTweet(hashtag);
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
            $('#resultsContent').empty();

            tweets.forEach(tweet => {
                const tweetResult = generateTweetHTML(tweet.firstname, tweet.username, tweet.message, tweet.created_at);
                $('#resultsContent').append(tweetResult);
            });

            const newUrl = window.location.origin + window.location.pathname + '?tag=' + encodeURIComponent(hashtag);
            history.pushState({ path: newUrl }, '', newUrl);
        },

        error: function(xhr, status, error) {
            
        
        }
    });
}

function generateTweetHTML(firstname, username, message, date) {
    // Remplacer les retours à la ligne par des balises <br>
    message = message.replace(/\n/g, '<br>');

    // Analyser le texte pour détecter les hashtags et les noms d'utilisateur
    const hashtagsAndUsernames = message.match(/(?:#\w+|@\w+)\b/g) || [];
    let messageWithLinks = message;

    // Si des hashtags ou des noms d'utilisateur sont trouvés, les remplacer par des liens
    if (hashtagsAndUsernames !== null) {
        hashtagsAndUsernames.forEach(function(match) {
            if (match.startsWith("#")) {
                // Hashtag
                const hashtagWithoutHash = match.substr(1); // Supprimer le préfixe '#'
                const exploreUrl = `explore.php?tag=${encodeURIComponent(hashtagWithoutHash)}`;
                messageWithLinks = messageWithLinks.replace(match, `<a href="${exploreUrl}" class="hashtag-link">${match}</a>`);
            } else if (match.startsWith("@")) {
                // Nom d'utilisateur
                const usernameWithoutAt = match.substr(1); // Supprimer le préfixe '@'
                const profileUrl = `profil.php?username=${encodeURIComponent(usernameWithoutAt)}`;
                messageWithLinks = messageWithLinks.replace(match, `<a href="${profileUrl}" class="arobase profile-link">${match}</a>`);
            }
        });
    }

    const displayTime = calculateTimePassed(date);

    // Générer le HTML du tweet
    const tweetResult = `
        <div class="tweet">
        <div class="tweet-header">
            <img src="../publics/img/profile.png" alt="profile photo" class="tweet-profile">
            <div class="tweet-text">
                <div class="tweet-author">${firstname}</div>
                <div class="tweet-author-handle">@${username} · ${displayTime}</div>
            </div>
        </div>
        <div class="tweet-message">${messageWithLinks}</div>
        <div class="tweet-stats">
            <div><i class="far fa-comment"></i> 0</div>
            <div><i class="fas fa-retweet"></i> 0</div>
            <div><i class="far fa-heart"></i> 0</div>
        </div>
    </div>
    `;
    return tweetResult;
}


function calculateTimePassed(date){

    const now = new Date();
    const tweetDate = new Date(date);
    const timeDiff = now - tweetDate;

    // Conversion de la différence en secondes
    const secondsDiff = Math.floor(timeDiff / 1000);

    // Convertir les secondes en une unité de temps appropriée (minutes, heures, jours, etc.)
    let displayTime;
    if (secondsDiff < 60) {
        displayTime = secondsDiff + 's'; // Secondes
    } else if (secondsDiff < 3600) {
        displayTime = Math.floor(secondsDiff / 60) + 'm'; // Minutes
    } else if (secondsDiff < 86400) {
        displayTime = Math.floor(secondsDiff / 3600) + 'h'; // Heures
    } else if (secondsDiff < 2592000) {
        displayTime = Math.floor(secondsDiff / 86400) + 'j'; // Jours
    } else if (secondsDiff < 31536000) {
        displayTime = Math.floor(secondsDiff / 2592000) + 'mo'; // Mois
    } else {
        displayTime = Math.floor(secondsDiff / 31536000) + 'a'; // Années
    }

    return displayTime;
}
