var moonIcn = document.getElementById('icn')

// Function to set the theme based on localStorage value
function setTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        moonIcn.src = 'src/img/sun.png';
    } else {
        document.body.classList.remove('dark-theme');
        moonIcn.src = 'src/img/moon.png';
    }
}

// Set the initial theme on page load
setTheme();

 moonIcn.onclick = function () {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains("dark-theme")) {
        moonIcn.src = 'src/img/sun.png';
        localStorage.setItem('theme', 'dark');
    } else {
        moonIcn.src = 'src/img/moon.png';
        localStorage.setItem('theme', 'light');
    }
}
