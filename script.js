window.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("image-track");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const yearSpan = document.getElementById("year");

  /* Footer year */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* Mobile nav toggle */
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  /* Smooth-ish scroll for in-page links */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 70;
          const elementPosition =
            target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  /* DRAGGABLE IMAGE TRACK */
  if (!track) return;

  const handleOnDown = (clientX) => {
    track.dataset.mouseDownAt = clientX;
  };

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || "0";
  };

  const handleOnMove = (clientX) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta =
      parseFloat(track.dataset.mouseDownAt) - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextUnconstrained =
      parseFloat(track.dataset.prevPercentage || "0") + percentage;
    const nextPercentage = Math.max(
      Math.min(nextUnconstrained, 0),
      -100
    );

    track.dataset.percentage = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, 0%)`
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  /* Mouse events */
  window.addEventListener("mousedown", (e) =>
    handleOnDown(e.clientX)
  );
  window.addEventListener("mouseup", handleOnUp);
  window.addEventListener("mousemove", (e) =>
    handleOnMove(e.clientX)
  );

  /* Touch events */
  window.addEventListener("touchstart", (e) =>
    handleOnDown(e.touches[0].clientX)
  );
  window.addEventListener("touchend", handleOnUp);
  window.addEventListener("touchmove", (e) =>
    handleOnMove(e.touches[0].clientX)
  );
});

window.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("image-track");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const yearSpan = document.getElementById("year");

  /* Footer year */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* Mobile nav toggle */
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  /* Smooth-ish scroll for in-page links */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 70;
          const elementPosition =
            target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  /* DRAGGABLE IMAGE TRACK */
  if (!track) return;

  let isDragging = false;

  const handleOnDown = (clientX) => {
    isDragging = true;
    track.dataset.mouseDownAt = clientX;
  };

  const handleOnUp = () => {
    isDragging = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || "0";
  };

  const handleOnMove = (clientX) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta =
      parseFloat(track.dataset.mouseDownAt) - clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextUnconstrained =
      parseFloat(track.dataset.prevPercentage || "0") + percentage;
    const nextPercentage = Math.max(
      Math.min(nextUnconstrained, 0),
      -100
    );

    track.dataset.percentage = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, 0%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  /* Mouse events */
  window.addEventListener("mousedown", (e) => handleOnDown(e.clientX));
  window.addEventListener("mouseup", handleOnUp);
  window.addEventListener("mousemove", (e) => handleOnMove(e.clientX));

  /* Touch events */
  window.addEventListener("touchstart", (e) =>
    handleOnDown(e.touches[0].clientX)
  );
  window.addEventListener("touchend", handleOnUp);
  window.addEventListener("touchmove", (e) =>
    handleOnMove(e.touches[0].clientX)
  );

  /* IMAGE CLICK HANDLERS - Opens gallery links in new window */
  const images = document.querySelectorAll(".image");
  
  images.forEach((image, index) => {
    image.style.cursor = "pointer";
    
    image.addEventListener("click", (e) => {
      // Only open link if not dragging
      if (!isDragging && image.dataset.galleryLink) {
        e.preventDefault();
        window.open(image.dataset.galleryLink, "_blank");
      }
    });

    // Visual feedback on hover
    image.addEventListener("mouseenter", () => {
      if (image.dataset.galleryLink) {
        image.style.opacity = "0.8";
      }
    });

    image.addEventListener("mouseleave", () => {
      image.style.opacity = "1";
    });
  });
});


function openCategory(page) {
  window.open(page, "_blank");
}
