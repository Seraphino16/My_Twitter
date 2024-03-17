$(document).ready(function() {
    characterCount();
    const initialCount = parseInt($('#count').text());

    // Gestionnaire d'événements pour détecter les changements dans le texte du tweet et fournir des suggestions d'utilisateurs lors de la saisie après '@'
    $('.text-whathappen').on('input', function() {
        const text = $(this).val();
        let newText = text;

        // Rechercher l'index du dernier '@' dans le texte
        const atIndex = text.lastIndexOf('@');

        // Vérifier si un '@' est trouvé et s'il n'est pas suivi d'un espace
        if (atIndex !== -1 && text[atIndex + 1] !== ' ' && text.substring(atIndex + 1, text.length).trim() !== '') {
            // Extraire la requête de recherche d'utilisateur après '@'
            const query = text.substring(atIndex + 1);

            // Afficher les suggestions d'utilisateur basées sur la requête
            fetchUserSuggestions(query)
                .then(showUserSuggestions)
                .catch(error => console.error(error));
        } else {
            // Masquer la liste déroulante si aucun nom d'utilisateur n'est entré ou s'il est suivi d'un espace
            $('#user-suggestions').hide();
        }

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

        // Afficher le texte modifié avec les liens
        $('#display-text').html(newText);
    });

    $('#tweet-input').click(function(e) {
        e.preventDefault();

        // Récupérer le texte entré dans le champ textarea
        const message = $('.text-whathappen').val();

        const userDataJSON = getCookie('user_data');
        const user = JSON.parse(userDataJSON);
        const id = user.id;
       

        // Appeler le contrôleur via AJAX pour créer le tweet
        $.ajax({
            url: '../controllers/tweet_controller.php',
            type: 'POST',
            dataType: 'json',
            data: { tweet: true, status: message, id: id },
            success: function(response) {
                if (response.success) {

                    // Générer l'HTML du tweet avec les hashtags et les noms d'utilisateur
                    const tweetHTML = generateTweetHTML(response.fullname, response.username, response.message, response.date);
                    $('.tweet-container').prepend(tweetHTML);

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

    // Gestionnaire d'événements pour le clic sur l'icône de coeur
    $('.tweet-container').on('click', '.fa-heart', function() {
        const likeCount = $(this).siblings('.like-count');
        let currentCount = parseInt(likeCount.text());
        const isLiked = $(this).hasClass('fas');

        if (isLiked) {
            currentCount--;
            $(this).removeClass('fas').addClass('far');
            $(this).css('color', '');
        } else {
            currentCount++;
            $(this).removeClass('far').addClass('fas');
            $(this).css('color', 'var(--color-twitter-red)');
        }

        // Mettez à jour le texte du compteur de likes
        likeCount.text(currentCount);
    });

    // Gestionnaire d'événements pour le clic sur l'icône de retweet
    $('.tweet-container').on('click', '.fa-retweet', function() {
        // Déclarer et initialiser le tableau pour stocker les IDs des tweets retweetés par l'utilisateur
        let retweetedTweets = [];

        // Récupérer l'ID du tweet
        const tweetId = $(this).closest('.tweet').data('tweet-id');

        // Vérifier si l'utilisateur a déjà retweeté ce tweet
        if (retweetedTweets.includes(tweetId)) {
            alert("Vous avez déjà retweeté ce tweet !");
            return; // Arrêter l'exécution de la fonction si le tweet a déjà été retweeté
        }

        // Republier le tweet
        const originalTweet = $(this).closest('.tweet');
        const tweetClone = originalTweet.clone(); // Créer une copie complète du tweet

        // Récupérer le nom d'utilisateur de l'utilisateur connecté
        const username = $('#username').text().substring(1); // Supprimer le '@'

        // Modifier le message pour indiquer que c'est un retweet avec le nom d'utilisateur
        const retweetMessage = $(`<div class="retweet-message"><i class="fas fa-retweet"></i> @${username} a retweeté</div>`);
        tweetClone.find('.tweet-header').before(retweetMessage);

        // Ajouter la copie du tweet à la liste des tweets
        $('.tweet-container').prepend(tweetClone);

        // Ajouter l'ID du tweet à la liste des tweets retweetés par l'utilisateur
        retweetedTweets.push(tweetId);

        // Incrémenter le compteur de retweets sur le tweet d'origine et sur la copie du tweet
        const retweetCount = originalTweet.find('.retweet-count');
        let currentCount = parseInt(retweetCount.text());
        currentCount++;
        retweetCount.text(currentCount);

        const retweetCountClone = tweetClone.find('.retweet-count');
        retweetCountClone.text(currentCount);

        // Mettre à jour l'icône de retweet pour qu'elle soit remplie et de couleur verte sur le tweet d'origine et sur la copie du tweet
        originalTweet.find('.fa-retweet').removeClass('far').addClass('fas').css('color', 'var(--color-twitter-green)');
        tweetClone.find('.fa-retweet').removeClass('far').addClass('fas').css('color', 'var(--color-twitter-green)');

        const userDataJSON = getCookie('user_data');
        const user = JSON.parse(userDataJSON);
        const id = user.id;


        // Appeler le contrôleur via AJAX pour enregistrer le retweet
        $.ajax({
            url: '../controllers/tweet_controller.php',
            type: 'POST',
            dataType: 'json',
            data: { retweet: true, tweet_id: tweetId, id: id },
            success: function(response) {
                if (response.success) {
                    console.log("Retweet enregistré avec succès !");
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

function generateTweetHTML(fullname, username, message, date) {
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
                    <div class="tweet-author">${fullname}</div>
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

// Fonction pour récupérer les suggestions d'utilisateurs du serveur
function fetchUserSuggestions(query) {
    return new Promise((resolve, reject) => {
        // Vérifier si la requête est vide ou contient uniquement un espace après avoir supprimé les espaces
        if (!query.trim()) {
            // Ne rien faire si la requête est vide ou contient uniquement des espaces
            resolve([]);
            return;
        }

        $.ajax({
            url: '../controllers/tweet_controller.php',
            type: 'GET',
            data: { query: query },
            dataType: 'json',
            success: function(response) {
                resolve(response.users);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

// Fonction pour afficher les suggestions d'utilisateurs dans la liste déroulante
function showUserSuggestions(suggestions) {
    const suggestionList = $('#user-suggestions ul');
    suggestionList.empty();

    suggestions.forEach(user => {
        const listItem = $(`
            <li>
                <div class="suggestion">
                    <div class="grid-user">
                        <div><img src="../publics/img/profile.png" alt="user" class="img-user"/></div>
                        <div id="userData">
                            <p class="name" id="fullname"><strong>${user.fullname}</strong></p>
                            <p class="username" id="username">@${user.username}</p>
                        </div>
                    </div>
                </div>
            </li>
        `);

        listItem.on('click', function() {
            insertUsernameSuggestion(user.username);
        });

        suggestionList.append(listItem);
    });

    $('#user-suggestions').show(); // Afficher la liste déroulante
}

// Fonction pour insérer la suggestion d'utilisateur sélectionnée dans le champ de texte
function insertUsernameSuggestion(username) {
    const textField = $('.text-whathappen');
    const text = textField.val();
    const atIndex = text.lastIndexOf('@');
    const newText = text.substring(0, atIndex + 1) + username + ' ';
    textField.val(newText);
    $('#user-suggestions').hide();
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