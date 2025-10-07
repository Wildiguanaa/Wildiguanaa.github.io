document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");

    // Set a timeout to remove the intro after the animation
    setTimeout(() => {
        intro.style.display = "none"; // Hide the intro
    }, 4000); // Duration should be equal to the time for the animation
});
