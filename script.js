document.getElementById('add-project-btn').addEventListener('click', async () => {
    const name = prompt('Enter the project name:');
    const codeLink = prompt('Enter the "View Code" link:');
    const outputLink = prompt('Enter the "View Output" link:');
    const flowchartInput = document.getElementById('flowchart-image');
    const flowchartFile = flowchartInput ? flowchartInput.files[0] : null; // Ensure the file is selected

    if (name && codeLink && outputLink && flowchartFile) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('codeLink', codeLink);
        formData.append('outputLink', outputLink);
        formData.append('flowchart_image', flowchartFile);

        try {
            const response = await fetch('http://localhost:3000/projects', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Project added successfully!');
                fetchProjects(); // Refresh the projects
            } else {
                alert('Error adding project.');
            }
        } catch (error) {
            console.error('Error adding project:', error);
        }
    } else {
        alert('Please provide all required fields.');
    }
});

// Fetch and display projects from the backend
async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:3000/projects');
        const projects = await response.json();

        // Clear the previous projects
        const projectContainer = document.querySelector('.card-container');
        projectContainer.innerHTML = '';

        // Add new projects
        projects.forEach(project => {
            addProjectToDOM(project.name, project.codeLink, project.outputLink, project.flowchart_image);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

// Add project to DOM
function addProjectToDOM(name, codeLink, outputLink, flowchartImage) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const flowchartImgTag = flowchartImage
        ? `<img src="data:image/png;base64,${flowchartImage}" alt="${name} Flowchart" />`
        : '';
        
    card.innerHTML = `
        <h3>${name}</h3>
        <div class="dropdown">
            <button id="dots-button" class="fa fa-ellipsis-v" style="font-size: 1.2rem;"></button>
            <div class="dropdown-content">
                <a href="${codeLink}" target="_blank">View Code</a>
                <a href="${outputLink}" target="_blank">View Output</a>
            </div>
        </div>
        ${flowchartImgTag}
    `;
    
    document.querySelector('.card-container').appendChild(card);
}

// Toggle the menu visibility when the hamburger icon is clicked
const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Menu links functionality
const menuLinks = document.querySelectorAll('#menu a');
const sections = document.querySelectorAll('section');

// Hide all sections initially
sections.forEach(section => section.style.display = 'none');

// Show the "Profile", "My Projects", and "Contact" sections by default
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
