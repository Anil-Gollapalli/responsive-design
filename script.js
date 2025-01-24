// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const menu = document.getElementById('menu');

    if (!toggleBtn || !menu) {
        console.error('Toggle button or menu element not found. Check your HTML IDs.');
        return;
    }

    // Toggle the menu visibility when the hamburger icon is clicked
    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Menu links functionality
    const menuLinks = document.querySelectorAll('#menu a');
    const sections = document.querySelectorAll('section');

    // Hide all sections initially except for Profile
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('profile').style.display = 'block';

    // Handle menu link clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Hide all sections
            sections.forEach(section => section.style.display = 'none');

            // Show the clicked section
            const targetSectionId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                targetSection.style.display = 'block';
            } else {
                console.error(`Section with ID "${targetSectionId}" not found.`);
            }

            // Collapse the menu on mobile
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });

    // Filter and sort functionality
    const filterSelect = document.getElementById('filter-select');
    const sortButton = document.getElementById('sort-button');
    const cards = document.querySelectorAll('.card');

    // Filter projects based on category
    filterSelect.addEventListener('change', () => {
        const category = filterSelect.value;

        cards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === 'all' || category === cardCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Sort projects by name (replace with actual date sorting as needed)
    sortButton.addEventListener('click', () => {
        const container = document.querySelector('.card-container');
        const sortedCards = Array.from(cards).sort((a, b) => {
            return a.querySelector('h3').innerText.localeCompare(b.querySelector('h3').innerText);
        });

        container.innerHTML = '';
        sortedCards.forEach(card => container.appendChild(card));
    });
});
