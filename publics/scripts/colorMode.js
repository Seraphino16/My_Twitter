document.getElementById('themingSwitcher').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.remove('theme-clair');
        document.body.classList.add('theme-sombre');
    } else {
        document.body.classList.remove('theme-sombre');
        document.body.classList.add('theme-clair');
    }
});