// check if user is logged in
var user = localStorage.getItem('user');

if (!user) {
  window.location.href = 'login.html';
}

// greeting based on time
var hour = new Date().getHours();
var greeting = 'Hello';

if (hour < 12) {
  greeting = 'Good morning';
} else if (hour < 18) {
  greeting = 'Good afternoon';
} else {
  greeting = 'Good evening';
}

var greetingEl = document.getElementById('greeting');

if (greetingEl) {
  greetingEl.textContent = greeting;
}

// show username
var nameEl = document.getElementById('userName');

if (nameEl) {
  nameEl.textContent = user;
}

// show first letter of name in avatar
var avatarEl = document.getElementById('userAvatar');

if (avatarEl) {
  avatarEl.textContent = user.charAt(0).toUpperCase();
}

// logout
var logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}

// load stats
function loadStats() {
  var req = new XMLHttpRequest();
  req.open('GET', 'stats.php', true);
  req.onload = function () {
    if (req.status === 200) {
      try {
        var data = JSON.parse(req.responseText);
        var msg = document.getElementById('totalMessages');
        var usr = document.getElementById('totalUsers');

        if (msg) {
          msg.textContent = data.total_messages || 0;
        }

        if (usr) {
          usr.textContent = data.total_users || 0;
        }
      } catch (e) {
        console.log('could not parse stats');
      }
    }
  };
  req.send();
}

// load recent messages for table
function loadMessages() {
  var req = new XMLHttpRequest();
  req.open('GET', 'messages.php?limit=5', true);
  req.onload = function () {
    if (req.status === 200) {
      try {
        var data = JSON.parse(req.responseText);
        var body = document.getElementById('recentMessages');

        if (!body) {
          return;
        }

        if (data.messages && data.messages.length > 0) {
          var html = '';
          data.messages.forEach(function (m) {
            var msgShort = esc(m.message.substring(0, 55));
            var dots = m.message.length > 55 ? '...' : '';

            html += '<tr>';
            html += '<td><strong>' + esc(m.name) + '</strong></td>';
            html += '<td style="color:var(--muted)">' + esc(m.email) + '</td>';
            html +=
              '<td style="color:var(--muted)">' +
              msgShort +
              dots +
              '</td>';
            html += '<td style="color:var(--muted);font-size:12px">' + formatDate(m.created_at) + '</td>';
            html += '</tr>';
          });

          body.innerHTML = html;
        } else {
          body.innerHTML =
            '<tr>' +
            '<td colspan="4" class="empty-row">No messages yet.</td>' +
            '</tr>';
        }
      } catch (e) {
        console.log('error loading messages');
      }
    }
  };
  req.send();
}

function esc(str) {
  var el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

function formatDate(str) {
  if (!str) {
    return '-';
  }

  var d = new Date(str);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

loadStats();
loadMessages();
