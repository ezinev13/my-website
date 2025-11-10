document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const userInfoContainer = document.getElementById('userInfoContainer');
  
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const username = document.getElementById('ign').value;
  
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }
  
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        const playerId = generatePlayerId();
  
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('playerId', playerId);
        localStorage.setItem('password', password);
        registrationFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';//MAY CONTAINER SA TAAS NETONG LOGIN FORM DI KO MAALIS
    });
  
    loginFormContainer.addEventListener('submit', function(event) {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
  
    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');
    
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        event.preventDefault(); 
        registrationFormContainer.style.display = 'block';
        displayUserInfo();
        loginFormContainer.style.display = 'none';
        
    } else {
        alert('Invalid username or password. Please try again.');
    }
  
    return false;
        
    });
  
    function generatePlayerId() {
        let id = '';
        for (let i = 0; i < 12; i++) {
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
        userInfoContainer.innerHTML = `<br><p style="font-size: 20px; font-weight: bold; background-color: pink; border-radius:10px; color: #fc5151; text-align: center">HI ${username}, WELCOME TO POKEMON WORLD!</p>
        <br><p style = "font-weight:bold"> Email: ${email}<br>Username: ${username}<br>Player ID: ${playerId}</p>`;
    }
  
  });