 
        (function () {
            // Wait until DOM is ready
            document.addEventListener('DOMContentLoaded', function () {
                var wrapper = document.querySelector('.th-menu-wrapper');
                var closeBtn = document.querySelector('.th-menu-close');
                var menuLinks = document.querySelectorAll('.th-menu-inner .main-menu-mobile a');
                if (!wrapper) return;

                function closeMenu() {
                    // plugin toggles class 'th-body-visible' on .th-menu-wrapper
                    wrapper.classList.remove('th-body-visible');
                }

                if (closeBtn) {
                    closeBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        closeMenu();
                    });
                }

                // close when a link is clicked (helpful on mobile)
                if (menuLinks && menuLinks.length) {
                    menuLinks.forEach(function (link) {
                        link.addEventListener('click', function () {
                            // small delay so navigation can start
                            setTimeout(closeMenu, 80);
                        });
                    });
                }
            });
        })();
    