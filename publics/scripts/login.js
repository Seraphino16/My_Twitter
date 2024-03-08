
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

                    const user = response.message; 
                    const fullname = user.firstname + ' ' + user.lastname; 
                    const username = user.username;
                    const id = user.id;
                    
                    sessionStorage.setItem('id', id);
                    sessionStorage.setItem('fullname', fullname);
                    sessionStorage.setItem('username', username);
    
                    window.location.href = '/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/views/home.php';
                    
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