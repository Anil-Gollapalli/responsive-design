// Toggle the menu visibility when the hamburger icon is clicked
const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

// Handle menu toggle
toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Menu links functionality
const menuLinks = document.querySelectorAll('#menu a');
const sections = document.querySelectorAll('section');

// Hide all sections initially
sections.forEach(section => section.style.display = 'none');

// Show the "Profile" section by default
document.getElementById('profile').style.display = 'block';
document.getElementById('myprojects').style.display = 'block';
document.getElementById('contact').style.display = 'block';

// Handle menu link clicks
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior

        // Hide all sections
        sections.forEach(section => section.style.display = 'none');

        // Show the clicked section
        const targetSectionId = link.getAttribute('href').substring(1);
        document.getElementById(targetSectionId).style.display = 'block';

        // Collapse the menu on mobile
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});
