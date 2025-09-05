function openAboutMe() {
  fetch("tooltip.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("modalContent").innerHTML = data;
      document.getElementById("aboutModal").classList.remove("hidden");
    });
}

function closeAboutMe() {
  document.getElementById("aboutModal").classList.add("hidden");
  document.getElementById("modalContent").innerHTML = "";
}

// Close modal when clicking outside the content
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("aboutModal").addEventListener("click", function(e) {
    if (e.target.id === "aboutModal") {
      closeAboutMe();
    }
  });
});
