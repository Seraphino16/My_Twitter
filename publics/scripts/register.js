
//Fonction qui contient la requête ajax pour l'inscription
function registerUser() {

    const formData = {
        lastname: $('#lastname').val(),
        firstname: $('#firstname').val(),
        birthdate: $('#birthdate').val(),
        genre: $('#genre').val(),
        email: $('#email').val(),
        pseudo: $('#pseudo').val(),
        password: $('#password').val(),
        confirm_password: $('#confirmPassword').val(),
        form_type: 'register' 
    };


        $.ajax({
            type: 'POST',
            url: '../controllers/formHandler_controller.php',
            dataType: 'json',
            data: formData,
            success: function(response) {

                if (response.status === 'success') {

                    alert('Inscription réussie !');
                } else {
                    alert('Erreur lors de l\'inscription : ' + response.message);
                }
            },
            error: function(xhr, status, error) {

                console.log('Erreur AJAX : ');
                console.log('status: ' + status);
                console.log('error: ' + error);
                console.log('responseText: ' + xhr.responseText);
                console.log('Erreur AJAX : ' + status);
            }

        });

    }


//Fonction pour calculer l'âge de l'utilisateur
function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate)) {
        age--;
    }

    return age;
}

//Fonction pour vérifier que l'utilisateur à au minimun 13 ans
function verifAge(birthdate) {
    const userAge = calculateAge(birthdate);

    if (userAge < 13) {
        alert('Vous devez avoir au moins 13 ans pour vous inscrire');

        return false;
    }
}

//Fonction pour vérifier que le mot de passe est sécurisé
function securePassword (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spéciale');

        return false;
    }
}

//Fonction pour vérifier la similarité entre le mot de passe et sa confirmation
function samePassword (password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Le mot de passe et sa confirmation doivent être identiques');

        return false;
    }
}

//Formulaire d'inscription
$(document).ready(function() {
    
    $('#registerForm').submit(function(event) {
        event.preventDefault();

        const birthdate = $('#birthdate').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        verifAge(birthdate);
        securePassword(password);
        samePassword(password, confirmPassword);

        registerUser();
    });
});