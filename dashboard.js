// Event listeners for sidebar links
document.getElementById("profile-link").addEventListener("click", function() {
  showContent("profile-content");
});

document.getElementById("projects-link").addEventListener("click", function() {
  showContent("projects-content");
});

document.getElementById("contact-link").addEventListener("click", function() {
  showContent("contact-content");
});

// Function to show the selected content and hide others
function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => {
      section.classList.remove("active");
  });

  // Show the clicked section
  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
}
