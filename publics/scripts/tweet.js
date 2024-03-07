$(document).ready(function () {
    characterCount();
});


function characterCount() {
    const textField = document.querySelector('.text-whathappen');
    const counter = document.getElementById('count');

    textField.addEventListener('input', function() {
        const textLength = textField.value.length;

        const remainingCharacters = 140 - textLength;
        counter.textContent = remainingCharacters;

        if (remainingCharacters < 0) {
            counter.style.color = 'red';
            textField.style.color = 'red';
        } else {
            counter.style.color = '';
            textField.style.color = '';
        }
    });
}