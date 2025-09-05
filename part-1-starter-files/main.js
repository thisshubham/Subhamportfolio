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

function typeLetters(element, delay = 100, callback) {
  const text = element.getAttribute("data-text") || element.innerText; 
  element.setAttribute("data-text", text); // store original text
  element.innerText = ""; // clear text

  let i = 0;
  function showNextLetter() {
    if (i < text.length) {
      element.innerText += text[i];  // preserve spaces
      i++;
      setTimeout(showNextLetter, delay);
    } else if (callback) {
      callback();
    }
  }
  showNextLetter();
}

function loopTyping(h1, p) {
  typeLetters(h1, 120, () => {
    typeLetters(p, 80, () => {
      setTimeout(() => {
        h1.innerText = "";
        p.innerText = "";
        loopTyping(h1, p); // restart loop
      }, 1500); // pause before restart
    });
  });
}

window.onload = () => {
  const h1 = document.getElementById("typing-h1");
  const p = document.getElementById("typing-p");
  loopTyping(h1, p);
};