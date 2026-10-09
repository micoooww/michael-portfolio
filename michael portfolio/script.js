// ==========================================
// MICHAEL FERMO PORTFOLIO - SCRIPT.JS
// ==========================================


// ==========================================
// 1. APPLY SAVED THEME
// ==========================================

(function applySavedTheme() {
    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("theme") || "dark";
    } catch (error) {
        console.warn("Unable to read saved theme.");
    }

    const isLight = savedTheme === "light";

    document.documentElement.classList.toggle(
        "light-mode",
        isLight
    );

    if (document.body) {
        document.body.classList.toggle(
            "light-mode",
            isLight
        );
    }
})();


document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 2. LIGHT / DARK MODE
    // ==========================================

    let themeToggle = document.getElementById("theme-toggle");

    const nav = document.querySelector("nav");
    const navList = document.querySelector("nav ul");

    // Create the theme button if it does not exist.
    if (!themeToggle && navList) {
        const themeItem = document.createElement("li");

        themeToggle = document.createElement("button");

        themeToggle.id = "theme-toggle";
        themeToggle.className = "theme-toggle";
        themeToggle.type = "button";

        themeItem.appendChild(themeToggle);
        navList.appendChild(themeItem);
    }

    // Apply the same theme to both HTML and BODY.
    function applyTheme(isLight) {
        document.documentElement.classList.toggle(
            "light-mode",
            isLight
        );

        document.body.classList.toggle(
            "light-mode",
            isLight
        );

        try {
            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );
        } catch (error) {
            console.warn("Unable to save theme.");
        }

        updateThemeButton();
    }

    // Update the icon and accessibility labels.
    function updateThemeButton() {
        if (!themeToggle) {
            return;
        }

        const isLight =
            document.body.classList.contains("light-mode");

        themeToggle.textContent = isLight ? "🌙" : "☀️";

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        themeToggle.title = isLight
            ? "Switch to dark mode"
            : "Switch to light mode";
    }

    // Restore the saved theme.
    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("theme") || "dark";
    } catch (error) {
        console.warn("Unable to restore saved theme.");
    }

    applyTheme(savedTheme === "light");

    // Toggle the theme when clicked.
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isCurrentlyLight =
                document.body.classList.contains("light-mode");

            applyTheme(!isCurrentlyLight);
        });
    }


    // ==========================================
    // 3. MOBILE NAVIGATION
    // ==========================================

    if (nav && navList) {
        let menuButton = document.querySelector(".menu-button");

        if (!menuButton) {
            menuButton = document.createElement("button");

            menuButton.type = "button";
            menuButton.textContent = "☰";
            menuButton.classList.add("menu-button");

            menuButton.setAttribute(
                "aria-label",
                "Toggle navigation menu"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            nav.appendChild(menuButton);
        }

        menuButton.style.background = "none";
        menuButton.style.border = "none";
        menuButton.style.color =
            document.body.classList.contains("light-mode")
                ? "#222"
                : "white";

        menuButton.style.fontSize = "28px";
        menuButton.style.cursor = "pointer";

        menuButton.addEventListener("click", () => {
            const isOpen =
                navList.classList.toggle("mobile-active");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Close the menu when a navigation link is clicked.
        navList.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navList.classList.remove("mobile-active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    // ==========================================
    // 4. NAVIGATION LINKS
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    // Smooth scrolling for links to sections on this page.
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId.startsWith("#") &&
                targetId.length > 1
            ) {
                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {
                    event.preventDefault();

                    const header =
                        document.querySelector("header");

                    const headerHeight =
                        header ? header.offsetHeight : 0;

                    const sectionPosition =
                        targetSection.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: sectionPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    // ==========================================
    // 5. ACTIVE NAVIGATION LINK
    // ==========================================

    const sections = document.querySelectorAll("section");

    function updateActiveNavigation() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

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
                currentSection &&
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    // ==========================================
    // 6. SCROLL ANIMATIONS
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".skill, " +
        ".portfolio-project-card, " +
        "#about p, " +
        "#contact p"
    );

    if ("IntersectionObserver" in window) {
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

                        entry.target.style.transform =
                            "translateY(0)";

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
    }


    // ==========================================
    // 7. TYPING EFFECT
    // ==========================================

    const typingElement =
        document.getElementById("typing");

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
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

                // Pause after the whole word is typed.
                if (characterIndex === currentWord.length) {
                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

                // Move to the next word.
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

        typingElement.textContent = "";

        typeEffect();
    }


    // ==========================================
    // 8. BACK TO TOP BUTTON
    // ==========================================

    let backToTop =
        document.getElementById("back-to-top");

    if (!backToTop) {
        backToTop = document.createElement("button");

        backToTop.id = "back-to-top";
        backToTop.textContent = "↑";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(backToTop);
    }

    backToTop.type = "button";

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
        "0 5px 15px rgba(0, 0, 0, 0.3)";

    function updateBackToTopVisibility() {
        backToTop.style.display =
            window.scrollY > 500 ? "block" : "none";
    }

    window.addEventListener(
        "scroll",
        updateBackToTopVisibility
    );

    updateBackToTopVisibility();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ==========================================
    // 9. PROJECT CARD HOVER EFFECT
    // ==========================================

    const projectCards = document.querySelectorAll(
        ".project, .portfolio-project-card"
    );

    projectCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";

            card.style.transition =
                "transform 0.3s ease, box-shadow 0.3s ease";

            card.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.3)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.boxShadow = "";
        });
    });


    // ==========================================
    // 10. SKILLS HOVER EFFECT
    // ==========================================

    const skillCards = document.querySelectorAll(".skill");

    skillCards.forEach(skill => {
        skill.addEventListener("mouseenter", () => {
            skill.style.transform = "translateY(-8px)";

            skill.style.transition =
                "transform 0.3s ease, box-shadow 0.3s ease";

            skill.style.boxShadow =
                "0 10px 25px rgba(124, 92, 255, 0.2)";
        });

        skill.addEventListener("mouseleave", () => {
            skill.style.transform = "";
            skill.style.boxShadow = "";
        });
    });


    // ==========================================
    // 11. PROFILE IMAGE EFFECT
    // ==========================================

    const profileImages =
        document.querySelectorAll(".hero-image img");

    profileImages.forEach(profileImage => {
        profileImage.addEventListener("mouseenter", () => {
            profileImage.style.transform = "scale(1.05)";

            profileImage.style.transition =
                "transform 0.3s ease";
        });

        profileImage.addEventListener("mouseleave", () => {
            profileImage.style.transform = "";
        });
    });


    // ==========================================
    // 12. CURRENT YEAR IN FOOTER
    // ==========================================

    const footerText =
        document.querySelector("footer p");

    if (footerText) {
        const currentYear = new Date().getFullYear();

        footerText.textContent =
            `© ${currentYear} Michael Fermo. All Rights Reserved.`;
    }


    // ==========================================
    // 13. PAGE LOAD ANIMATION
    // ==========================================

    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity = "1";
    }, 100);


    // ==========================================
    // 14. CONSOLE MESSAGE
    // ==========================================

    console.log(
        "Michael Fermo portfolio loaded successfully!"
    );

});