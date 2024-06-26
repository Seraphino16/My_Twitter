$(document).ready(function() {

    
    const userDataJSON = getCookie('user_data');


    if (userDataJSON) {
        const user = JSON.parse(userDataJSON);
        const firstname = user.firstname;
        const username = user.username;
        const id = user.id;

            
    if (firstname && username) {

        $('.name').html('<strong>' + firstname + '</strong>');
        $('.username').text('@' + username);
    }

    loadTweetsAndDisplay(id, username);
 
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

function loadTweetsAndDisplay(id, username) {

        $.ajax({
            url: '../controllers/user_controller.php',
            type: 'POST',
            dataType: 'json',
            data: { id: id, username: username, action: 'getTweetsForHome' },
            success: function(response) {
             
                response.tweets.forEach(function(tweet) {
               
                    const tweetHTML = generateTweetHTML(tweet.firstname, tweet.username, tweet.message, tweet.created_at);
                    
                    $('.tweet-container').append(tweetHTML);
                });
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
                messageWithLinks = messageWithLinks.replace(match, `<a href="${exploreUrl}" class="hashtag explore-link">${match}</a>`);
            } else if (match.startsWith("@")) {
                // Nom d'utilisateur
                const usernameWithoutAt = match.substr(1); // Supprimer le préfixe '@'
                const profileUrl = `profil.php?username=${encodeURIComponent(usernameWithoutAt)}`;
                messageWithLinks = messageWithLinks.replace(match, `<a href="${profileUrl}" class="arobase profile-link">${match}</a>`);
            }
        });
    }

    const displayTime = calculateTimePassed(date);

    const html = `
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
                <div><i class="fas fa-retweet"></i> <span class="retweet-count"> 0</div>
                <div><i class="far fa-heart like"></i> <span class="like-count"> 0</span></div>
            </div>
        </div>
    `;
    return html;
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




