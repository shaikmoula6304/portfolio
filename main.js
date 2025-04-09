function goToLink(url) 
{
    window.location.href =url;
}
const skillsButton = document.getElementById('skillsButton');
const educationButton = document.getElementById('educationButton');
const skillsContent = document.getElementById('skillsContent');
const educationContent = document.getElementById('educationContent');

skillsButton.addEventListener('click', () => {
    skillsContent.classList.add('active');
    educationContent.classList.remove('active');
});

educationButton.addEventListener('click', () => {
    educationContent.classList.add('active');
    skillsContent.classList.remove('active');
});

// Initially show skills content
skillsContent.classList.add('active');
