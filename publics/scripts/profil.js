$(document).ready(function() {

        
const userDataJSON = getCookie('user_data');
    
if (userDataJSON) {
    
    const user = JSON.parse(userDataJSON);
    const firstname = user.firstname;
    const username = user.username;
    const id = user.id;

    const urlParams = new URLSearchParams(window.location.search);
    let selectedUsername = urlParams.get('username');

    if(selectedUsername === null) {
        selectedUsername = username;
    }

    if(selectedUsername === username) {
        $("#follow-btn").remove();
        $("#unfollow-btn").remove();
    } else {
        $("#edit-profile-btn").remove();
    }
    
    if (firstname && username) {
    
        getUserInfos(id, selectedUsername);
        getUserFollowers(id, selectedUsername);
        getUserFollows(id, selectedUsername);

        getUserTweets(id, selectedUsername);

        getFollowsList(id, selectedUsername);
        getFollowersList(id, selectedUsername, username);

        $("#saveUpdateBtn").click(function () {
            updateProfile(id, selectedUsername);
        });

        $("#follow-btn").click(function () {
            follow(id, username, selectedUsername);
        })

        $("#unfollow-btn").click(function () {
            unfollow(id, username, selectedUsername);
        })

        $('#sessionFullname').html('<strong>' + fullname + '</strong>');

        $('#sessionPseudo').text("@" + username);
        
    }
}
});



function getUserInfos(id, selectedUsername) {

    const formData = {
        id: id,
        username: selectedUsername,
        action: "fetchCurrentUser",
    };

    $.ajax({
        type: 'POST',
        url: '../controllers/user_controller.php',
        data: formData,
        dataType: 'json',
        success: function(response) {
            
            if (response.status === 'success') {

                const user = response.data;

                $(".pseudo").text("@" + user.username);
                $(".fullname").text(user.firstname);

                console.log(response)
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

                    const websiteLink = `<a href="${user.website}" target="_blank">${user.website}</a>`;
                    $(".fa-link").after(' ', websiteLink);
                } else {
                    $(".website-url").parent().parent().css("display", "none");
                }
                
                let joinedDate = formatJoinedDate(user.created_at);

                $(".bi-calendar-event").text(joinedDate);
                $(".bi-calendar-event").css("color", "gray");

                displayFormUpdate(user);
               
                
            } else {
                console.error('Erreur lors de la récupération des informations supplémentaires.');
            }
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

function getUserFollowers(id, selectedUsername) {

    const formData = {
        id: id,
        username: selectedUsername,
        action: "getNbFollowers",
    };

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        dataType: 'json',
        success: function (data) {
            $(".count-followers").text(data.nbFollowers);
        },
        
    });
}

function getUserFollows(id, selectedUsername) {

    const formData = {
        id: id,
        username: selectedUsername,
        action: "getNbFollows",
    };

    $.ajax({
        
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        dataType: 'json',
        success: function (data) {
            $(".count-following").text(data.nbFollows);
        }
    });

}

function getFollowersList(id, selectedUsername, username) {

    const modalFollowers = $("#followers-modal .modal-body").get(0);

    const formData = {
        id: id,
        username: selectedUsername,
        action: "getFollowersList"
    };

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        dataType: 'json',
        success: function(data) {
            ul = displayList(data.followersList);
            modalFollowers.appendChild(ul);

            checkFollow(data.followersList, username);
        }
    }); 
}


function getFollowsList(id, selectedUsername) {

    const modalFollowing = $("#following-modal .modal-body").get(0);

    const formData = {
        id: id,
        username: selectedUsername,
        action: "getFollowsList"
    };

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        dataType: 'json',
        success: function(data) {
            ul = displayList(data.followsList);
            modalFollowing.appendChild(ul);
            return data.followsList;
        }
    });
}

function displayList(users) {

    let ul = document.createElement("div");

    users.forEach(user => {

        console.log(user)
        let li = document.createElement("div");
        let link = document.createElement("a");

        // Creation de l'url pour le profil sur lequel on clique
        let profileURL = "profil.php?username=" + encodeURIComponent(user.username);

        let bio = (user.bio !== null && user.bio !== undefined) ? user.bio : "";

        const userResult =  `
        <div id="box-search-explore" class="box-search-explore">
        <div id="myTabContent" class="tab-content">
        <div id="resultsContent">
        <div class="tweet">
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
                    <p class="bio">${bio}</p>
                </div>
                </div>
            </div>
            </div>
            </div>`
                
            // if(user.bio !== null && user.bio.length !== 0) {
            //     $(".bio").text(user.bio);
                
            // }


        $(link).attr('href', profileURL).html(userResult);
        $(link).css("color", "black");
        $(link).css("text-decoration", "none");


        ul.appendChild(link);
    });


    return ul;
}

function displayFormUpdate (user) {
    $("#nameForm").val(user.firstname);
    $("#bioForm").val(user.bio);
    $("#locationForm").val(user.localisation);
    $("#urlForm").val(user.website);
}

function updateProfile(id, selectedUsername) {

    const formData = {
        id: id,
        username: selectedUsername,
        action: "updateProfile",
        firstname: $("#nameForm").val(),
        bio: $("#bioForm").val(),
        location: $("#locationForm").val(),
        url: $("#urlForm").val(),
    }
    
    $.ajax({
        url: "../../controllers/user_controller.php",
        method: "POST",
        data: formData,
        // dataType: "json",
        success: function(data) {
            location.reload()
        }
    });
}

function checkFollow (followers, username) {

    let isFollowed = false;

    followers.forEach(follower => {
        if(follower.username === username) {
            isFollowed = true;
        }
    })

    if(isFollowed) {
        $("#follow-btn").remove();
    } else {
        $("#unfollow-btn").remove();
    }
}

function follow (id, currentUser, userToFollow) {

    const formData = {
        action: "follow",
        id: id,
        username: currentUser,
        userToFollow: userToFollow,
    }

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        success: function(data) {
            data = JSON.parse(data);

            if(data.isFollow === true) {
                location.reload()
            } else {
                alert("Error");
            }            
        }
    })
}

function unfollow (id, currentUser, userToUnfollow) {

    const formData = {
        action: "unfollow",
        id: id,
        username: currentUser,
        userToUnfollow: userToUnfollow,
    }

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: formData,
        success: function(data) {
            data = JSON.parse(data);

            if(data.isUnfollow === true) {
                location.reload()
            } else {
                alert("Error");
            }
        }
    })
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


function getUserTweets (id, username) {

    $.ajax({
        url: "../controllers/user_controller.php",
        method: "POST",
        data: {
            id: id,
            username: username,
            action: "oneUser",
        },
        success: function (data) {

            data = JSON.parse(data);
            console.log(data);
           
            
            if(data.tweets.length === 0) {
                const emptyTweetTxt = `<p class='empty-tweets'>@${username} hasn't tweeted yet !</div>`;
                $(".tweet-container").prepend(emptyTweetTxt);
            } else {
                data.tweets.forEach(tweet => {
                const tweetHTML = generateTweetHTML(tweet.firstname, tweet.username, tweet.message, tweet.date);
                $('.tweet-container').prepend(tweetHTML);
            });
        }
        }  
    });
}

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