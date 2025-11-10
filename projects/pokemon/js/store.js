const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0); 
})

let menu = document.querySelector("#menu-icon");
let navmenu = document.querySelector(".navmenu");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

function scrollDown() {
    window.scrollBy({
      top: window.innerHeight, // Scroll down by the height of the viewport
      behavior: 'smooth' // Smooth scrolling behavior
    });
  }

  // Attach click event listener to down arrow
  document.querySelector('.down').addEventListener('click', function(e) {
    e.preventDefault();
    scrollDown();
  });

  // Attach click event listener to main button
  document.querySelector('.main-btn').addEventListener('click', function(e) {
    e.preventDefault();
    scrollDown();
  });