const menuBar = document.querySelector('#side-bar .sidebar-header .bx.bx-menu');
const sidebar = document.getElementById('side-bar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('active');
})

const menuList = document.querySelectorAll('#side-bar .nav-sidebar .list-item')

menuList.forEach(function (item) {
    item.addEventListener('click', function () {
        if (window.innerWidth < 576) {
            sidebar.classList.remove('active');
        }
    })

})

window.addEventListener('resize', function () {
    if (this.innerWidth < 768) {
        sidebar.classList.remove('active');
    }
});
