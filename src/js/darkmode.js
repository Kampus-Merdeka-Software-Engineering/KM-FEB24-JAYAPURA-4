var moonIcn = document.getElementById('icn')
 moonIcn.onclick = function () {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains("dark-theme")) {
        moonIcn.src = 'src/img/sun.png'
    } else {
        moonIcn.src = 'src/img/moon.png'
    }
}
