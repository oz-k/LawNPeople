const textarea = document.querySelector('#write_textarea');
const count = document.querySelector('.count');

function lengthCheck(){
    count.innerText = `${textarea.value.length}`;
}

textarea.addEventListener('keyup', lengthCheck);