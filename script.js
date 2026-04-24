// contact form
var form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nm = document.getElementById('cf_name').value.trim();
    var em = document.getElementById('cf_email').value.trim();
    var msg = document.getElementById('cf_message').value.trim();
    var btn = document.getElementById('submitBtn');
    var stat = document.getElementById('form-status');

    if (!nm || !em || !msg) {
      stat.className = 'form-status error';
      stat.textContent = 'Please fill all fields.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    var fd = new FormData();
    fd.append('name', nm);
    fd.append('email', em);
    fd.append('message', msg);

    var req = new XMLHttpRequest();
    req.open('POST', 'contact.php', true);

    req.onload = function () {
      btn.disabled = false;
      btn.textContent = 'Send Message';

      if (req.status === 200) {
        stat.className = 'form-status success';
        stat.textContent = 'Message sent! I will get back to you soon.';
        form.reset();
      } else {
        stat.className = 'form-status error';
        stat.textContent = 'Something went wrong. Try again.';
      }
    };

    req.onerror = function () {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      stat.className = 'form-status error';
      stat.textContent = 'Network error.';
    };

    req.send(fd);
  });
}

// hamburger menu
var ham = document.getElementById('hamb');
var links = document.querySelector('.nav-links');

if (ham && links) {
  ham.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    var icon = ham.querySelector('i');

    ham.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (icon) {
      if (open) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      var icon = ham.querySelector('i');

      links.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');

      if (icon) {
        icon.className = 'fa-solid fa-bars';
      }
    });
  });
}

// simple fade in for feature cards
var cards = document.querySelectorAll('.about-card');

cards.forEach(function (card, idx) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';

  setTimeout(function () {
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, idx * 100);
});

// footer year
var yr = document.getElementById('year');

if (yr) {
  yr.textContent = new Date().getFullYear();
}
