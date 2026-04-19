// js/components.js
// This script dynamically injects the navbar and footer from HTML files in the components directory.

document.addEventListener("DOMContentLoaded", async () => {
    // Inject Navbar
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        try {
            const res = await fetch("/components/navbar.html");
            const html = await res.text();
            navbarContainer.innerHTML = html;
            
            // Re-attach interactivity
            const menuBtn = document.getElementById("mobile-menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            const menuIcon = document.getElementById("mobile-menu-icon");
            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener("click", () => {
                    const isHidden = mobileMenu.classList.contains("hidden");
                    if (isHidden) {
                        mobileMenu.classList.remove("hidden");
                        if(menuIcon) menuIcon.textContent = "close";
                    } else {
                        mobileMenu.classList.add("hidden");
                        if(menuIcon) menuIcon.textContent = "menu";
                    }
                });
            }
        } catch (err) {
            console.error("Failed to load Navbar:", err);
        }
    }

    // Inject Footer
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        try {
            const res = await fetch("/components/footer.html");
            const html = await res.text();
            footerContainer.innerHTML = html;
        } catch (err) {
            console.error("Failed to load Footer:", err);
        }
    }
});
