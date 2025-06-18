document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Skill Tabs Functionality (UPDATED)
    // ------------------------------------------

    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategoryContents = document.querySelectorAll('.skill-category-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // Get the category to show from the data attribute
            const targetCategory = tab.dataset.category; // e.g., 'frontend', 'backend'

            // Hide all skill category content
            skillCategoryContents.forEach(content => {
                content.classList.remove('active');
                // Reset skill bars when hiding a category to re-animate later
                content.querySelectorAll('.skill-bar').forEach(bar => {
                    bar.style.width = '0%';
                });
            });

            // Show the selected skill category content
            const activeCategoryContent = document.getElementById(`${targetCategory}-category`);
            if (activeCategoryContent) {
                activeCategoryContent.classList.add('active');
                // Re-trigger skill bar animation for the newly active category
                animateSkillBars(activeCategoryContent);
            }
        });
    });


    // ------------------------------------------
    // 2. Header Scroll Effect (No Change - keep previous code)
    // ------------------------------------------

    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');

    const handleScroll = () => {
        const scrollThreshold = heroSection ? heroSection.offsetHeight * 0.1 : 100;
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load


    // ------------------------------------------
    // 3. Optional: Smooth Scrolling for Navigation Links (No Change - keep previous code)
    // ------------------------------------------

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });


    // ------------------------------------------
    // 4. Skill Bar Animation Logic (UPDATED and moved into a function)
    //    Now called when a new category is made active.
    // ------------------------------------------

    // Function to animate skill bars within a given container
    const animateSkillBars = (container) => {
        const skillBarsInContainer = container.querySelectorAll('.skill-bar');
        skillBarsInContainer.forEach(bar => {
            const targetWidth = bar.dataset.skillWidth; // Get width from data attribute
            // Small delay to ensure CSS transition works after display: none -> flex change
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 50); // A very small delay, adjust if needed
        });
    };

    // Initial animation for the default active category (Front-end)
    const initialActiveCategory = document.querySelector('.skill-category-content.active');
    if (initialActiveCategory) {
        animateSkillBars(initialActiveCategory);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Skill Tabs Functionality
    // ------------------------------------------

    const skillTabs = document.querySelectorAll('.skill-tab');
    const toolsList = document.querySelector('.tools-list');
    const skillsList = document.querySelector('.skills-list'); // Assuming you want to hide/show both lists

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));

            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // --- You would typically use this to filter skills based on category ---
            // For now, since the HTML doesn't have separate lists for each category,
            // we'll just demonstrate toggling visibility if needed.
            // If you later structure your HTML with:
            // <div class="skills-content" id="front-end-skills">...</div>
            // <div class="skills-content" id="back-end-skills" style="display: none;">...</div>
            // Then you would hide all and show the relevant one.

            // Example of how you might hide/show based on the clicked tab's category:
            const category = tab.dataset.category;
            console.log(`Tab clicked: ${category}`); // For debugging

            // In a more complex scenario, you'd load/filter content here.
            // For this portfolio, we'll assume 'Tools' and 'Skills' lists are always visible
            // and the 'tabs' are more for visual indication or future expansion.
            // If you want to hide/show parts, you'll need more complex HTML structure.
            // For the current HTML, the tabs are primarily visual indicators.
        });
    });


    // ------------------------------------------
    // 2. Header Scroll Effect (Shrink/Background Change)
    // ------------------------------------------

    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section'); // To get the height for scroll trigger

    // Function to add/remove class based on scroll position
    const handleScroll = () => {
        // Get the height of the hero section or a fixed scroll point
        const scrollThreshold = heroSection ? heroSection.offsetHeight * 0.1 : 100; // 10% of hero height or 100px

        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Call it once on load in case the page is already scrolled
    handleScroll();

    // ------------------------------------------
    // 3. Optional: Smooth Scrolling for Navigation Links
    // ------------------------------------------

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href'); // Get the href attribute (e.g., '#about')
            const targetElement = document.querySelector(targetId); // Find the corresponding section

            if (targetElement) {
                // Calculate position considering fixed header
                const headerHeight = header.offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight - 20; // -20 for a bit of extra padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // ------------------------------------------
    // 4. Optional: Skill Bar Animation on Scroll (Intersection Observer)
    //    This makes the skill bars animate when they come into view.
    // ------------------------------------------

    const skillBars = document.querySelectorAll('.skill-bar');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.7 // Trigger when 70% of the element is visible
    };

    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the skill bar is in view, apply its defined width
                const skillBar = entry.target;
                const targetWidth = skillBar.style.width; // Get width from inline style
                skillBar.style.width = '0%'; // Reset to 0 before animation
                setTimeout(() => { // Small delay to ensure reset takes effect
                    skillBar.style.width = targetWidth; // Animate to original width
                }, 100);
                observer.unobserve(skillBar); // Stop observing after animation
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });

});



document.addEventListener('DOMContentLoaded', function() {
    const skillsButton = document.getElementById('skillsButton');
    const educationButton = document.getElementById('educationButton');
    const skillsContent = document.getElementById('skillsContent');
    const educationContent = document.getElementById('educationContent');

    // Function to show Skills content
    skillsButton.addEventListener('click', function() {
        // Show skills content and hide education content
        skillsContent.classList.add('active');
        educationContent.classList.remove('active');

        // Update button active state
        skillsButton.classList.add('active');
        educationButton.classList.remove('active');
    });

    // Function to show Education content
    educationButton.addEventListener('click', function() {
        // Show education content and hide skills content
        educationContent.classList.add('active');
        skillsContent.classList.remove('active');

        // Update button active state
        educationButton.classList.add('active');
        skillsButton.classList.remove('active');
    });
});

   // JavaScript to toggle the side nav
        const menuToggle = document.getElementById('menuToggle');
        const closeBtn = document.getElementById('closeBtn');
        const sideNavbar = document.getElementById('sideNavbar');

        menuToggle.addEventListener('click', () => {
            sideNavbar.style.width = '250px'; // Or whatever width you set in CSS
        });

        closeBtn.addEventListener('click', () => {
            sideNavbar.style.width = '0';
        });

        // Close sidebar if a link is clicked (optional, good UX)
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Only close on smaller screens
                    sideNavbar.style.width = '0';
                }
            });
        });

        // Optional: Close sidebar if clicked outside (more advanced, requires checking clicks)
        // document.addEventListener('click', (event) => {
        //     if (!sideNavbar.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 768 && sideNavbar.style.width !== '0px') {
        //         sideNavbar.style.width = '0';
        //     }
        // });
