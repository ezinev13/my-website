document.addEventListener('DOMContentLoaded', function() {
  const accountBtn = document.getElementById('accountBtn');
  const registrationFormContainer = document.getElementById('registrationFormContainer');
  const autoInput = document.querySelector('.auto-input');
  const pikachuImage = document.querySelector('.svg img');
  const userInfoContainer = document.getElementById('userInfoContainer');

  accountBtn.addEventListener('click', function() {
      registrationFormContainer.style.display = 'block';
      registrationFormContainer.style.margin = 'auto';

      autoInput.style.display = 'none';//ayaw neto guman di nahahide
      pikachuImage.style.display = 'none';
      const dropDownMenu = document.querySelector('.dropdown_menu');
      dropDownMenu.classList.remove('open');
      const toggleBtnIcon = document.querySelector('.toggle_btn i');
      toggleBtnIcon.classList = 'fa-solid fa-bars';
  });
});

function validateForm() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var username = document.getElementById('ign').value; 
  if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
  }

  if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
  }

  var playerId = generatePlayerId();

   localStorage.setItem('email', email);
   localStorage.setItem('username', username);
   localStorage.setItem('playerId', playerId);
    displayUserInfo();
 
   return false; 
}

function generatePlayerId() {
  var id = '';
  for (var i = 0; i < 12; i++) {
      if (i > 0 && i % 4 === 0) {
          id += ' ';
      }
      id += Math.floor(Math.random() * 10);
  }
  return id;
}

function displayUserInfo() {
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  const playerId = localStorage.getItem('playerId');
  userInfoContainer.innerHTML = `<br>Hi ${username}, you're registered!<br>Email: ${email}<br>Username: ${username}<br>Player ID: ${playerId}`;
  userInfoContainer.style.display = 'block';
}

