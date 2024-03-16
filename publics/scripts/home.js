$(document).ready(function() {

    
    const userDataJSON = getCookie('user_data');

    console.log('cookie :' + userDataJSON);

    if (userDataJSON) {
        const user = JSON.parse(userDataJSON);
        const firstname = user.firstname;
        const username = user.username;
        const id = user.id;

            
    if (firstname && username) {

        $('.name').html('<strong>' + firstname + '</strong>');
        $('.username').text('@' + username);
    }
}

});

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
