$(document).ready(function () {
    characterCount();
});

// Compter le nombre de caractères dans le champ de texte
function characterCount() {
    const textField = document.querySelector('.text-whathappen');
    const counter = document.getElementById('count');

    textField.addEventListener('input', function() {
        const textLength = textField.value.length;

        const remainingCharacters = 140 - textLength;
        counter.textContent = remainingCharacters;

        if (remainingCharacters < 0) {
            counter.style.color = 'red';
            textField.style.color = 'red';
        } else {
            counter.style.color = '';
            textField.style.color = '';
        }
    });
}

$(document).ready(function() {
    const initialCount = parseInt($('#count').text());

    // Charger les tweets depuis le stockage local lors du chargement de la page
    loadTweetsFromLocalStorage();

    // Détecter les changements dans le texte du tweet en temps réel
    $('.text-whathappen').on('input', function() {
        const text = $(this).val();
        let newText = text;

        // Vérifier s'il y a des hashtags ou des noms d'utilisateur dans le texte
        const hashtagsAndUsernames = text.match(/(?:#\w+|@\w+)\b/g) || [];

        // Si des hashtags ou des noms d'utilisateur sont trouvés, les remplacer par des liens
        if (hashtagsAndUsernames.length > 0) {
            hashtagsAndUsernames.forEach(function(match) {
                if (match.startsWith("#")) {
                    // Hashtag
                    newText = newText.replace(match, `<a href="#" class="hashtag">${match}</a>`);
                } else if (match.startsWith("@")) {
                    // Nom d'utilisateur
                    newText = newText.replace(match, `<a href="#" class="arobase">${match}</a>`);
                }
            });
        }

        $('#display-text').html(newText);
    });


    $('#tweet-input').click(function(e) {
        e.preventDefault();

        // Récupérer le texte entré dans le champ textarea
        const message = $('.text-whathappen').val();
        const userDataJSON = getCookie('user_data');

        const user = JSON.parse(userDataJSON);
        const id = user.id;
        console.log(id);

        // Appeler le contrôleur via AJAX pour créer le tweet
        $.ajax({
            url: '../controllers/tweet_controller.php',
            type: 'POST',
            dataType: 'json',
            data: { tweet: true, status: message, id: id},
            success: function(response) {
                if (response.success) {
                    console.log('Fullname:', response.fullname);
                    console.log('Username:', response.username);
                    console.log('Message:', response.message);
                    console.log('Date:', response.date);

                    // Générer l'HTML du tweet avec les hashtags et les noms d'utilisateur
                    const tweetHTML = generateTweetHTML(response.fullname, response.username, response.message, response.date);
                    $('.tweet-container').prepend(tweetHTML);

                    // Stocker les informations du tweet dans le stockage local
                    storeTweetLocally(response);

                    $('form')[0].reset();
                    $('#count').text(initialCount);
                } else {
                    console.error(response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});


function generateTweetHTML(fullname, username, message, date) {
    // Analyser le texte pour détecter les hashtags et les noms d'utilisateur
    const hashtagsAndUsernames = message.match(/(?:#\w+|@\w+)\b/g) || [];
    let messageWithLinks = message;

// Si des hashtags ou des noms d'utilisateur sont trouvés, les remplacer par des liens
    if (hashtagsAndUsernames !== null) {
        hashtagsAndUsernames.forEach(function(match) {
            if (match.startsWith("#")) {
                // Hashtag
                messageWithLinks = messageWithLinks.replace(match, `<a href="hashtag.php?tag=${encodeURIComponent(match.substr(1))}" class="hashtag">${match}</a>`);
            } else if (match.startsWith("@")) {
                // Nom d'utilisateur
                messageWithLinks = messageWithLinks.replace(match, `<a href="profil.php?username=${encodeURIComponent(match.substr(1))}" class="arobase">${match}</a>`);
            }
        });
    }

    const displayTime = calculateTimePassed(date);

    const html = `
        <div class="tweet">
            <div class="tweet-header">
                <img src="../publics/img/profile.png" alt="profile photo" class="tweet-profile">
                <div class="tweet-text">
                    <div class="tweet-author">${fullname}</div>
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

// Fonction pour stocker les informations du tweet dans le stockage local
function storeTweetLocally(tweetData) {
    let storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
    storedTweets.unshift(tweetData);
    localStorage.setItem('tweets', JSON.stringify(storedTweets));
}

// Fonction pour charger les tweets depuis le stockage local
function loadTweetsFromLocalStorage() {
    const storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
    storedTweets.forEach(tweetData => {
        const tweetHTML = generateTweetHTML(tweetData.fullname, tweetData.username, tweetData.message, tweetData.date);
        $('.tweet-container').append(tweetHTML);
    });
}

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

