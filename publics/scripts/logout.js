// Fonction pour la déconnexion
function userLogout() {
    $.ajax({
        url: '../controllers/formHandler_controller.php',
        type: 'POST',
        dataType: 'json',
        data: { form_type: 'logout' },
        success: function(response) {

            if (response.status === 'success') {

                sessionStorage.removeItem('id');
                sessionStorage.removeItem('fullname');
                sessionStorage.removeItem('username');

                window.location.href = '../views/index.html';
            }
        
        },
        error: function(xhr, status, error) {

            
        }

    });
}


$(document).ready(function() {
    $('#logout').click(function(event) {
        event.preventDefault();

       
        userLogout();
       
    });
});