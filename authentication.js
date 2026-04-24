function togglePassword(inputId, btn) {
  var input = document.getElementById(inputId);
  var icon = btn ? btn.querySelector('i') : null;

  if (input.type === 'password') {
    input.type = 'text';
    btn.style.opacity = '1';

    if (icon) {
      icon.className = 'fa-regular fa-eye-slash';
    }
  } else {
    input.type = 'password';
    btn.style.opacity = '0.5';

    if (icon) {
      icon.className = 'fa-regular fa-eye';
    }
  }
}

// password strength checker
var passInput = document.getElementById('reg_password');

if (passInput) {
  passInput.addEventListener('input', function () {
    var val = this.value;
    var fill = document.getElementById('strengthFill');
    var txt = document.getElementById('strengthText');

    if (!fill || !txt) {
      return;
    }

    var score = 0;

    if (val.length >= 6) {
      score++;
    }

    if (/[A-Z]/.test(val)) {
      score++;
    }

    if (/[0-9]/.test(val)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(val)) {
      score++;
    }

    var colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
    var labels = ['Weak', 'Fair', 'Good', 'Strong'];
    var widths = ['25%', '50%', '75%', '100%'];

    if (val.length === 0) {
      fill.style.width = '0%';
      txt.textContent = '';
    } else {
      var idx = Math.max(score - 1, 0);
      fill.style.width = widths[idx];
      fill.style.background = colors[idx];
      txt.textContent = labels[idx];
      txt.style.color = colors[idx];
    }
  });
}

// register
var registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nm = document.getElementById('reg_name').value.trim();
    var em = document.getElementById('reg_email').value.trim();
    var pwd = document.getElementById('reg_password').value;
    var status = document.getElementById('reg-status');

    if (pwd.length < 6) {
      showMsg(status, 'error', 'Password must be at least 6 characters');
      return;
    }

    var req = new XMLHttpRequest();
    req.open('POST', 'register.php', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    req.onload = function () {
      if (req.status === 200) {
        try {
          var res = JSON.parse(req.responseText);

          if (res.success) {
            showMsg(status, 'success', 'Account created! Taking you to login...');

            setTimeout(function () {
              window.location.href = 'login.html';
            }, 1500);
          } else {
            showMsg(status, 'error', res.message || 'Registration failed');
          }
        } catch (e) {
          showMsg(status, 'error', 'Something went wrong');
        }
      } else {
        showMsg(status, 'error', 'Server error. Try again.');
      }
    };

    req.onerror = function () {
      showMsg(status, 'error', 'Network error');
    };

    req.send(
      'name=' + encodeURIComponent(nm) +
      '&email=' + encodeURIComponent(em) +
      '&password=' + encodeURIComponent(pwd)
    );
  });
}

// login
var loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var em = document.getElementById('login_email').value.trim();
    var pwd = document.getElementById('login_password').value;
    var status = document.getElementById('login-status');

    var req = new XMLHttpRequest();
    req.open('POST', 'login.php', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    req.onload = function () {
      if (req.status === 200) {
        try {
          var res = JSON.parse(req.responseText);

          if (res.success) {
            localStorage.setItem('user', res.name || em);
            showMsg(status, 'success', 'Logged in! Redirecting...');

            setTimeout(function () {
              window.location.href = 'dashboard.html';
            }, 1200);
          } else {
            showMsg(status, 'error', res.message || 'Wrong email or password');
          }
        } catch (e) {
          showMsg(status, 'error', 'Something went wrong');
        }
      } else {
        showMsg(status, 'error', 'Server error');
      }
    };

    req.onerror = function () {
      showMsg(status, 'error', 'Network error');
    };

    req.send(
      'email=' + encodeURIComponent(em) +
      '&password=' + encodeURIComponent(pwd)
    );
  });
}

function showMsg(el, type, msg) {
  el.className = 'form-status ' + type;
  el.textContent = msg;
}
