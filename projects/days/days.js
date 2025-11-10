const buttons = document.querySelectorAll('.button');
const colors = {
    monday: '#8e44ad',
    tuesday: '#27ae60',
    wednesday: '#f1c40f',
    thursday: '#e67e22',
    friday: '#e74c3c',
    saturday: '#567de9',
    sunday: '#024a5c'
};

let activeBox = null;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const day = button.id.slice(0, -7);
        const box = document.getElementById(`box${day.charAt(0).toUpperCase() + day.slice(1)}`);

        if (activeBox) {
            activeBox.classList.remove('box-up');
            activeBox.classList.add('box-down');
        }

        box.style.backgroundColor = colors[day];
        box.classList.remove('box-down');
        box.classList.add('box-up');

        activeBox = box;
    });
});