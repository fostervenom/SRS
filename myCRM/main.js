async function login() {
  const id = document.getElementById('sapId').value;
  const pass = document.getElementById('password').value;
  const url = 'https://docs.google.com/spreadsheets/d/1IfQ1DQzCULynwq1sA8okjenn8tgnuUL2Hmyit7JIBZo/gviz/tq?tqx=out:json&sheet=Users';
  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.substring(47).slice(0, -2));
  const rows = json.table.rows;
  const user = rows.find(r => r.c[0].v === id && r.c[5].v === pass && r.c[4].v === 'Active');
  if (user) {
    localStorage.setItem('user', JSON.stringify({
      sap: user.c[0].v,
      name: user.c[1].v,
      email: user.c[2].v,
      role: user.c[3].v
    }));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials or inactive user.");
  }
}

function logAttendance(action) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return alert("Please login first");
  console.log(`${user.email} | ${action} logged.`); // Replace with actual POST to Google Form or API
}

document.getElementById('callForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Call tagging submitted:", data); // Replace with POST to Sheet
});

function sendEmail() {
  const email = document.getElementById('sellerEmail').value;
  const template = document.getElementById('template').value;
  window.location.href = `mailto:${email}?subject=CRM Follow-up&body=${encodeURIComponent(template)}`;
}