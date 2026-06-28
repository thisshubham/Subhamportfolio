function openAboutMe() {
  fetch("tooltip.html")
    .then(r => {
      if (!r.ok) throw new Error();
      return r.text();
    })
    .then(data => {
      document.getElementById("modalContent").innerHTML = data;
      document.getElementById("aboutModal").classList.remove("hidden");
    })
    .catch(() => {
      document.getElementById("modalContent").innerHTML =
        '<p class="text-white text-center p-8">Could not load profile. Please try again.</p>';
      document.getElementById("aboutModal").classList.remove("hidden");
    });
}

function closeAboutMe() {
  document.getElementById("aboutModal").classList.add("hidden");
  document.getElementById("modalContent").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Close modal when clicking outside the content
  document.getElementById("aboutModal").addEventListener("click", function(e) {
    if (e.target.id === "aboutModal") {
      closeAboutMe();
    }
  });

  // Dark/light mode toggle
  const sunBtn = document.getElementById("sunBtn");
  const moonBtn = document.getElementById("moonBtn");

  sunBtn.addEventListener("click", () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  });

  moonBtn.addEventListener("click", () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  });

  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }

  // AJAX contact form with inline feedback
  const form = document.querySelector('form[action*="formspree"]');
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      status.textContent = "Sending…";
      status.className = "text-sm mt-2 text-gray-400";
      status.classList.remove("hidden");

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          status.textContent = "Message sent! I’ll get back to you soon.";
          status.className = "text-sm mt-2 text-green-400";
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "text-sm mt-2 text-red-400";
      }
    });
  }
});

function typeLetters(element, delay = 100, callback) {
  const text = element.getAttribute("data-text") || element.innerText;
  element.setAttribute("data-text", text);
  element.innerText = "";

  let i = 0;
  function showNextLetter() {
    if (i < text.length) {
      element.innerText += text[i];
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
        loopTyping(h1, p);
      }, 1500);
    });
  });
}

window.onload = () => {
  const h1 = document.getElementById("typing-h1");
  const p = document.getElementById("typing-p");
  loopTyping(h1, p);
};
