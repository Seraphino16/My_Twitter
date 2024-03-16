$(document).ready(function() {

    
const userDataJSON = getCookie('user_data');
    
if (userDataJSON) {
    console.log("Contenu du cookie : ", userDataJSON);
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

        $('#sessionFullname').html('<strong>' + firstname + '</strong>');

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

    let ul = document.createElement("ul");

    users.forEach(user => {
        let li = document.createElement("li");
        let link = document.createElement("a");

        // Creation de l'url pour le profil sur lequel on clique
        let profileURL = "profil.php?username=" + encodeURIComponent(user.username);
        $(link).attr('href', profileURL).text(user.username);

        li.appendChild(link);
        ul.appendChild(li);
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