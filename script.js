// Toggle the menu visibility when the hamburger icon is clicked
const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});
