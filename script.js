// ==========================================
// PORTFOLIO WEBSITE - SCRIPT.JS
// ==========================================


// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================

    const nav = document.querySelector("nav");
    const navList = document.querySelector("nav ul");

    // Create mobile menu button
    const menuButton = document.createElement("button");

    menuButton.innerHTML = "☰";
    menuButton.classList.add("menu-button");

    // Add button to navigation
    nav.appendChild(menuButton);

    // Menu button styling
    menuButton.style.display = "none";
    menuButton.style.background = "none";
    menuButton.style.border = "none";
    menuButton.style.color = "white";
    menuButton.style.fontSize = "28px";
    menuButton.style.cursor = "pointer";


    // Show/hide mobile menu
    menuButton.addEventListener("click", () => {

        navList.classList.toggle("mobile-active");

    });


    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navList.classList.remove("mobile-active");

        });

    });


    // ==========================================
    // 2. SMOOTH SCROLLING
    // ==========================================

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId.startsWith("#")) {

                event.preventDefault();

                const targetSection = document.querySelector(targetId);

                if (targetSection) {

                    const headerHeight =
                        document.querySelector("header").offsetHeight;

                    const sectionPosition =
                        targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: sectionPosition,
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    // ==========================================
    // 3. ACTIVE NAVIGATION LINK
    // ==========================================

    const sections = document.querySelectorAll("section");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // ==========================================
    // 4. SCROLL ANIMATION
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".skill, .project, #about p, #contact p"
    );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach(element => {

        observer.observe(element);

    });


    // ==========================================
    // 5. TYPING EFFECT
    // ==========================================

    const typingElement = document.querySelector(".hero h3");

    if (typingElement) {

        const words = [
            "IT Student",
            "Future Web Developer",
            "Future IT Professional"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {

                        wordIndex = 0;

                    }

                }

            }


            const speed = deleting ? 60 : 100;

            setTimeout(typeEffect, speed);

        }


        // Start typing effect
        typingElement.textContent = "";
        typeEffect();

    }


    // ==========================================
    // 6. BACK TO TOP BUTTON
    // ==========================================

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(backToTop);


    // Button design
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "25px";
    backToTop.style.right = "25px";
    backToTop.style.width = "45px";
    backToTop.style.height = "45px";
    backToTop.style.border = "none";
    backToTop.style.borderRadius = "50%";
    backToTop.style.background = "#7c5cff";
    backToTop.style.color = "white";
    backToTop.style.fontSize = "22px";
    backToTop.style.cursor = "pointer";
    backToTop.style.display = "none";
    backToTop.style.zIndex = "999";
    backToTop.style.boxShadow =
        "0 5px 15px rgba(0,0,0,0.3)";


    // Show button when scrolling
    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";

        }

    });


    // Back to top action
    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // 7. PROJECT CARD HOVER EFFECT
    // ==========================================

    const projectCards =
        document.querySelectorAll(".project");


    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";

            card.style.transition =
                "transform 0.3s ease, box-shadow 0.3s ease";

            card.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.3)";

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

            card.style.boxShadow = "none";

        });

    });


    // ==========================================
    // 8. SKILLS HOVER EFFECT
    // ==========================================

    const skillCards =
        document.querySelectorAll(".skill");


    skillCards.forEach(skill => {

        skill.addEventListener("mouseenter", () => {

            skill.style.transform = "translateY(-8px)";

            skill.style.transition =
                "transform 0.3s ease, box-shadow 0.3s ease";

            skill.style.boxShadow =
                "0 10px 25px rgba(124, 92, 255, 0.2)";

        });


        skill.addEventListener("mouseleave", () => {

            skill.style.transform = "translateY(0)";

            skill.style.boxShadow = "none";

        });

    });


    // ==========================================
    // 9. PROFILE IMAGE EFFECT
    // ==========================================

    const profileImage =
        document.querySelector(".hero-image img");


    if (profileImage) {

        profileImage.addEventListener("mouseenter", () => {

            profileImage.style.transform =
                "scale(1.05)";

            profileImage.style.transition =
                "transform 0.3s ease";

        });


        profileImage.addEventListener("mouseleave", () => {

            profileImage.style.transform =
                "scale(1)";

        });

    }


    // ==========================================
    // 10. CURRENT YEAR IN FOOTER
    // ==========================================

    const footer =
        document.querySelector("footer p");


    if (footer) {

        const currentYear =
            new Date().getFullYear();

        footer.innerHTML =
            `© ${currentYear} Michael Fermo. All Rights Reserved.`;

    }


    // ==========================================
    // 11. PAGE LOAD ANIMATION
    // ==========================================

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity = "1";

    }, 100);


    // ==========================================
    // 12. CONSOLE MESSAGE
    // ==========================================

    console.log(
        "Portfolio website loaded successfully!"
    );

});