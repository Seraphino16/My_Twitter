
//Fonction qui contient la requête ajax pour la connexion
function loginUser() {

    const formData = {

        email: $('#email').val(),
        password: $('#password').val(),
        form_type: 'login' 
    };

        $.ajax({
            type: 'POST',
            url: '../controllers/formHandler_controller.php',
            dataType: 'json',
            data: formData,
            success: function(response) { 

                if (response.status === 'success') {

                    const userData = JSON.parse(response.cookie_data);

                    const user = JSON.parse(response.user);

                    console.log(response.user);
                    const username = userData.username;

                    const fullname = user.firstname + ' ' + user.lastname; 
                    const id = user.id;

                    sessionStorage.setItem('id', id);
                    sessionStorage.setItem('fullname', fullname);
                    sessionStorage.setItem('username', user.username);

                    window.location.href = `../views/home.php?username=${encodeURIComponent(username)}`;
                    
                } else {
                    alert('Erreur lors de l\'inscription : ' + response.message);
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


//Formulaire de connexion
$(document).ready(function() {
    
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        loginUser();
    });
});

// Fonction pour récupérer la valeur d'un cookie
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