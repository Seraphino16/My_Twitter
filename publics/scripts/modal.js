
$(document).ready(function() {
    
    $('#modalRegister').click(function() {
    
        $.get('../views/register.html', function(data) {
        
            $('#inscriptionModalContent').html(data);
            $('#inscriptionModal').modal('show');

            $('#inscriptionModal').on('hidden.bs.modal', function () {
                location.reload();
            });
        });
    });


    $('#modalLogin').click(function() {
        
        $.get('../views/login.html', function(data) {

            $('#connexionModalContent').html(data);
            $('#connexionModal').modal('show');
        });

        $('#connexionModal').on('hidden.bs.modal', function () {
            location.reload();
        });
    });


});