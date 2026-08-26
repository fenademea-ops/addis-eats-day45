

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.replace('admin-dashboard.html');
    return;
  }

  const form = document.getElementById('adminLoginForm');
  const errorBox = document.getElementById('loginError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();

    if (user === 'admin' && pass === 'admin123') {
      sessionStorage.setItem('adminLoggedIn', 'true');
      errorBox.classList.remove('visible');
      window.location.replace('admin-dashboard.html');
    } else {
      errorBox.classList.add('visible');
    }
  });
});
