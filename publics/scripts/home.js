$(document).ready(function() {
    const fullname = sessionStorage.getItem('fullname');
    const username = sessionStorage.getItem('username');
    
    if (fullname && username) {

        $('.name').html('<strong>' + fullname + '</strong>');
        $('.username').text('@' + username);
    }
});
