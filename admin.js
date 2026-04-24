// auth check
var user = localStorage.getItem('user');

if (!user) {
  window.location.href = 'login.html';
}

var logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}

var allMsgs = [];

function loadSubmissions() {
  var req = new XMLHttpRequest();
  req.open('GET', 'messages.php', true);
  req.onload = function () {
    if (req.status === 200) {
      try {
        var data = JSON.parse(req.responseText);
        allMsgs = data.messages || [];

        renderTable(allMsgs);
        var cnt = document.getElementById('submissionCount');

        if (cnt) {
          cnt.textContent = allMsgs.length + ' total';
        }
      } catch (e) {
        console.log('parse error');
      }
    }
  };
  req.send();
}

function renderTable(msgs) {
  var body = document.getElementById('submissionsTable');

  if (!body) {
    return;
  }

  if (msgs.length === 0) {
    body.innerHTML =
      '<tr>' +
      '<td colspan="6" class="empty-row">No submissions yet.</td>' +
      '</tr>';
    return;
  }

  var html = '';
  msgs.forEach(function (m, i) {
    var msgShort = esc(m.message.substring(0, 50));
    var dots = m.message.length > 50 ? '...' : '';

    html += '<tr>';
    html += '<td style="color:var(--muted)">' + (i + 1) + '</td>';
    html += '<td><strong>' + esc(m.name) + '</strong></td>';
    html += '<td style="color:var(--accent);font-size:13px">' + esc(m.email) + '</td>';
    html += '<td style="color:var(--muted);font-size:13px">' + msgShort + dots + '</td>';
    html += '<td style="color:var(--muted);font-size:12px">' + formatDate(m.created_at) + '</td>';
    html +=
      '<td>' +
      '<button class="view-btn" onclick="openModal(' + i + ')">View</button>' +
      '</td>';
    html += '</tr>';
  });

  body.innerHTML = html;
}

function openModal(index) {
  var m = allMsgs[index];

  if (!m) {
    return;
  }

  document.getElementById('modal-name').textContent = m.name;
  document.getElementById('modal-email').textContent = m.email;
  document.getElementById('modal-message').textContent = m.message;
  document.getElementById('modal-date').textContent = 'Received: ' + formatDate(m.created_at);
  document.getElementById('msgModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('msgModal').style.display = 'none';
}

// close modal on overlay click
var modalEl = document.getElementById('msgModal');

if (modalEl) {
  modalEl.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
}

// search filter
var searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    var q = this.value.toLowerCase();
    var rows = allMsgs.filter(function (m) {
      return (
        m.name.toLowerCase().indexOf(q) !== -1 ||
        m.email.toLowerCase().indexOf(q) !== -1
      );
    });

    renderTable(rows);

    var cnt = document.getElementById('submissionCount');
    if (cnt) {
      cnt.textContent = rows.length + ' of ' + allMsgs.length;
    }
  });
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

loadSubmissions();
