/* =========================================================
   PRAGATI ARYA — PORTFOLIO SCRIPT
   ========================================================= */


/* ================= INTRO SCREEN ================= */

const introPop = document.getElementById("introPop");

if (introPop) {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        introPop.classList.add("hide");
        document.body.style.overflow = "";
    }, 2600);
}


/* ================= CURSOR GLOW ================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ================= TOUCH / CLICK RIPPLE ================= */

function createRipple(x, y) {

    const ripple = document.createElement("span");

    ripple.className = "ripple";

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 750);
}


/* Mouse click */

document.addEventListener("click", (event) => {

    createRipple(
        event.clientX,
        event.clientY
    );

});


/* Mobile touch */

document.addEventListener(
    "touchstart",
    (event) => {

        const touch = event.touches[0];

        if (!touch) {
            return;
        }

        createRipple(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);


/* ================= CERTIFICATE MODAL ================= */

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");

const certificateCards =
    document.querySelectorAll(".cert-card");

const modalClose =
    document.querySelector(".modal-close");


certificateCards.forEach((card) => {

    card.addEventListener("click", () => {

        const image =
            card.getAttribute("data-img");

        const title =
            card.getAttribute("data-title");

        if (!image || !modal) {
            return;
        }

        modalImg.src = image;

        modalImg.alt =
            title || "Certificate";

        modalTitle.textContent =
            title || "Certificate";

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


/* Close button */

if (modalClose) {

    modalClose.addEventListener("click", () => {
        closeModal();
    });

}


/* Click outside certificate */

if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });

}


/* ESC key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});


function closeModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


/* ================= BACK TO TOP ================= */

const backTop =
    document.querySelector(".back-top");


window.addEventListener(
    "scroll",
    () => {

        if (!backTop) {
            return;
        }

        if (window.scrollY > 700) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    },
    {
        passive: true
    }
);


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav nav a");


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* ================= HERO PARALLAX ================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual && window.innerWidth > 800) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (scroll < window.innerHeight) {

                heroVisual.style.transform =
                    `translateY(${scroll * 0.08}px)`;

            }

        },
        {
            passive: true
        }
    );

}


/* ================= IMAGE ERROR HANDLING ================= */

document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

        img.style.background =
            "linear-gradient(135deg,#e9e7df,#d9d7d0)";

        img.style.objectFit = "cover";

    });

});


/* ================= PROJECT CARD TILT ================= */

const cards =
    document.querySelectorAll(
        ".skill-card, .project-feature"
    );


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 2;

        const rotateX =
            ((y / rect.height) - 0.5) * -2;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ================= PAGE LOADED ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});