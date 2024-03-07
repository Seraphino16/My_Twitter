
$(document).ready(function() {
    
    $('#modalRegister').click(function() {
    
        $.get('/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/views/register.html', function(data) {
        
            $('#inscriptionModalContent').html(data);
            $('#inscriptionModal').modal('show');

            $('#inscriptionModal').on('hidden.bs.modal', function () {
                location.reload();
            });
        });
    });


    $('#modalLogin').click(function() {
        
        $.get('/Webac/W-WEB-090-LIL-1-1-academie-zoe.pilia/views/login.html', function(data) {

            $('#connexionModalContent').html(data);
            $('#connexionModal').modal('show');
        });

        $('#connexionModal').on('hidden.bs.modal', function () {
            location.reload();
        });
    });


});