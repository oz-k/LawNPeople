const test = document.querySelector('.test');
const test2 = document.querySelector('.test2');
const userBtn = document.querySelector('.user');
const loginBtn = document.querySelector('.login');

// 로그인 test
function a(){
    userBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
}
// 로그아웃 test
function b(){
    userBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
}

test.addEventListener('click', a);
test2.addEventListener('click', b);