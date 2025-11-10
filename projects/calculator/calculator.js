let input = document.querySelector('.output');

function appendToInput(value) {
  input.textContent += value;
}

function deleteLast() {
  input.textContent = input.textContent.slice(0, -1);
}

function clearInput() {
  input.textContent = '';
}

function calculateResult() {
  try {
    input.textContent = eval(input.textContent);
  } catch (error) {
    input.textContent = 'Error';
  }
}