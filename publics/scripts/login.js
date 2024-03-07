
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

                    window.location.href = '/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/views/home.html';
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