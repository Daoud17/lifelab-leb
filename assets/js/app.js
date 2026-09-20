document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");


    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        if (!menuToggle || !mainNav) return;

        mainNav.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");

    }


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        if (!menuToggle || !mainNav) return;

        mainNav.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

    }


    /* =====================================================
       NAVIGATION EVENTS
    ===================================================== */

    if (menuToggle && mainNav) {


        /* -------------------------------------------------
           HAMBURGER CLICK
        ------------------------------------------------- */

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const menuIsOpen =
                    mainNav.classList.contains("open");


                if (menuIsOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        /* -------------------------------------------------
           NAVIGATION LINKS
        ------------------------------------------------- */

        const navLinks =
            mainNav.querySelectorAll(".nav-link");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


        /* -------------------------------------------------
           CLICK OUTSIDE MENU
        ------------------------------------------------- */

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideMenu =
                    mainNav.contains(event.target);

                const clickedToggle =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedToggle &&
                    mainNav.classList.contains("open")
                ) {

                    closeMenu();

                }

            }
        );


        /* -------------------------------------------------
           ESCAPE KEY
        ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    mainNav.classList.contains("open")
                ) {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /* -------------------------------------------------
           WINDOW RESIZE
        ------------------------------------------------- */

        window.addEventListener(
            "resize",
            function () {

                /*
                    Mobile navigation ends at 700px.

                    If the mobile menu is open and the
                    browser returns to desktop/tablet size,
                    reset the mobile menu state.
                */

                if (window.innerWidth > 700) {

                    closeMenu();

                }

            }
        );

    }



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formSuccess =
        document.getElementById("formSuccess");


    /*
        Only run the following code if the contact form
        exists on the current page.

        This allows the same app.js file to be safely used
        on index.html, interventions.html, strategy.html,
        sector.html, departments.html and contact.html.
    */

    if (contactForm && formSuccess) {


        /* =================================================
           FORM FIELDS
        ================================================= */

        const fullName =
            document.getElementById("fullName");

        const phone =
            document.getElementById("phone");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");



        /* =================================================
           PHONE NUMBER
           ALLOW NUMBERS ONLY
        ================================================= */

        phone.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(/\D/g, "");

            }
        );



        /* =================================================
           REMOVE ERROR WHILE USER CORRECTS FIELD
        ================================================= */

        const formFields =
            contactForm.querySelectorAll(
                "input, textarea"
            );


        formFields.forEach(function (field) {

            field.addEventListener(
                "input",
                function () {

                    const formGroup =
                        this.closest(".form-group");


                    if (formGroup) {

                        formGroup.classList.remove(
                            "error"
                        );

                    }


                    formSuccess.classList.remove(
                        "show"
                    );

                }
            );

        });



        /* =================================================
           SHOW ERROR
        ================================================= */

        function showError(field) {

            const formGroup =
                field.closest(".form-group");


            if (formGroup) {

                formGroup.classList.add(
                    "error"
                );

            }

        }



        /* =================================================
           FORM SUBMISSION
        ================================================= */

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                let formIsValid = true;


                /*
                    Remove previous errors before
                    validating again.
                */

                const formGroups =
                    contactForm.querySelectorAll(
                        ".form-group"
                    );


                formGroups.forEach(function (group) {

                    group.classList.remove(
                        "error"
                    );

                });


                formSuccess.classList.remove(
                    "show"
                );



                /* =========================================
                   FULL NAME
                ========================================= */

                const fullNameValue =
                    fullName.value.trim();


                if (
                    fullNameValue.length < 2
                ) {

                    showError(fullName);

                    formIsValid = false;

                }



                /* =========================================
                   LEBANESE PHONE NUMBER
                ========================================= */

                const cleanPhone =
                    phone.value.replace(/\D/g, "");


                /*
                    Because +961 is already displayed
                    separately in the form, the user
                    enters only the Lebanese number.

                    Examples accepted:

                    03 123 456
                    3 123 456

                    70 123 456
                    71 123 456
                    76 123 456
                    78 123 456
                    79 123 456
                    81 123 456
                */

                const lebanesePhonePattern =
                    /^(?:0?3\d{6}|(?:70|71|76|78|79|81)\d{6})$/;


                if (
                    !lebanesePhonePattern.test(
                        cleanPhone
                    )
                ) {

                    showError(phone);

                    formIsValid = false;

                }



                /* =========================================
                   GMAIL ADDRESS
                ========================================= */

                const emailValue =
                    email.value.trim();


                const gmailPattern =
                    /^[A-Za-z0-9._%+-]+@gmail\.com$/i;


                if (
                    !gmailPattern.test(
                        emailValue
                    )
                ) {

                    showError(email);

                    formIsValid = false;

                }



                /* =========================================
                   SUBJECT
                ========================================= */

                const subjectValue =
                    subject.value.trim();


                if (
                    subjectValue.length < 2
                ) {

                    showError(subject);

                    formIsValid = false;

                }



                /* =========================================
                   MESSAGE
                ========================================= */

                const messageValue =
                    message.value.trim();


                if (
                    messageValue.length < 5
                ) {

                    showError(message);

                    formIsValid = false;

                }



                /* =========================================
                   INVALID FORM
                ========================================= */

                if (!formIsValid) {

                    /*
                        Move the user to the first
                        incorrect field.
                    */

                    const firstError =
                        contactForm.querySelector(
                            ".form-group.error input, " +
                            ".form-group.error textarea"
                        );


                    if (firstError) {

                        firstError.focus();

                    }


                    return;

                }



                /* =========================================
                   SUCCESS
                ========================================= */

                formSuccess.classList.add(
                    "show"
                );


                /*
                    Clear all fields after successful
                    validation.
                */

                contactForm.reset();



                /* =========================================
                   SCROLL TO SUCCESS MESSAGE
                ========================================= */

                formSuccess.scrollIntoView({

                    behavior: "smooth",

                    block: "nearest"

                });

            }
        );

    }


});