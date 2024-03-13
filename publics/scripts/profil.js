$(document).ready(function() {

    const fullname = sessionStorage.getItem('fullname');
    const username = sessionStorage.getItem('username');
    const id = sessionStorage.getItem('id');

    const urlParams = new URLSearchParams(window.location.search);
    let selectedUsername = urlParams.get('user');

    if(selectedUsername === null) {
        selectedUsername = username;
    }

    console.log(selectedUsername);
    
    if (fullname && username) {
     
        // $('.fullname').html('<strong>' + fullname + '</strong>');
        // $('.username').text('@' + username);

        // $('.fullname').text(fullname);
        // $('.pseudo').text('@' + username);

    
        getUserInfos(id, selectedUsername);
        getUserFollowers(id, selectedUsername);
        getUserFollows(id, selectedUsername);

        getFollowsList(id, selectedUsername);
        getFollowersList(id, selectedUsername);

        $("#saveUpdateBtn").click(function () {
            updateProfile(id, selectedUsername);
        });
        
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

                console.log(response);

                const user = response.data;

                $(".pseudo").text("@" + user.username);
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
            console.log(JSON.stringify(data));
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
            console.log(JSON.stringify(data));
            $(".count-following").text(data.nbFollows);
        }
    });

}

function getFollowersList(id, selectedUsername) {

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
            console.log(data);
            ul = displayList(data.followersList);
            modalFollowers.appendChild(ul);
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
        }
    });
}

function displayList(users) {

    let ul = document.createElement("ul");

    users.forEach(user => {
        let li = document.createElement("li");
        let link = document.createElement("a");

        // Creation de l'url pour le profil sur lequel on clique
        let profileURL = "profil.php?user=" + encodeURIComponent(user.username);
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

    console.log(selectedUsername);

    const formData = {
        id: id,
        username: selectedUsername,
        action: "updateProfile",
        firstname: $("#nameForm").val(),
        bio: $("#bioForm").val(),
        location: $("#locationForm").val(),
        url: $("#urlForm").val(),
    }

    console.log(formData);
    
    $.ajax({
        url: "../../controllers/user_controller.php",
        method: "POST",
        data: formData,
        // dataType: "json",
        success: function(data) {
            console.log(data);
            location.reload()
        }
    });
}










/*$(document).ready(function () {
    console.log("Hello");

    let idValue  = 1;

    $.ajax({
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
        method: "POST",
        success: function (data) {
            $(".count-following").text(data);
        }
    });

    $.ajax({
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
        method: "POST",
        data: {
            id: idValue,
        },
        success: function(data) {
            let follows = JSON.parse(data)
            console.log(follows);
        },
        error: function(data) {
            console.log(data);$(document).ready(function () {
                console.log("Hello");
            
                let idValue  = 16;
            
                $.ajax({
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
                    method: "POST",
                    data: {
                        id: idValue,
                    },
                    success: function (data) {
                        // console.log(data);
                        dataJSON = JSON.parse(data);
                        console.log(dataJSON);
                        console.log(JSON.stringify(data));
                        displayUser(dataJSON[0]);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                })
            
                $.ajax({
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
                    method: "POST",
                    success: function (data) {
                        $(".count-following").text(data);
                    }
                });
            
                $.ajax({
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
                    url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
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
        }
    });

})

$(".count-followers-i").click(function () {
    console.log("Let's get your followers !");

    idValue = 16;

    $.ajax({
        url: "/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/controllers/user_controller.php",
        method: "POST",
        data: {
            id: idValue,
        },
        success: function(data) {
            let followers = JSON.parse(data);
            console.log(followers);
        }
    });
})*/