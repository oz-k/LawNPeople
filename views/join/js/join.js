const message = document.querySelector('.message');
const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const repw = document.querySelector('#repw');
const userName = document.querySelector('#name');
const age = document.querySelector('#age');
const email = document.querySelector('#email');

// 수정 할거
function checkId() {
    if(!id.value) {
        alert('아이디는 영문 대소문자와 숫자를 조합하여 4~12자리로 입력해야합니다.');
        ("사용할 수 없는 ID입니다.");
       userName.css('color', 'red');
        id.focus();
        return true;
    }
    return false;
}
    $('#overlap').click(function() {
       var id= 'test';


        //Ajax POST Method TEST
        $.ajax({
            url: '/api/post',
              dataType: 'json',
              type: 'POST',
              data: id,
              success: function(result) {
                  if (result) {
                     console.log(result);
                  }
              }
          });
    });

function checkAll() {
    if(checkId()) {
        return false;
    } else if(pwCheck()) {
        return false;
    } else if(pwCompair()) {
        return false;
    } else if(repwCompair()) {
        return false;
    } else if(pwInspection()) {
        return false;
    } else if(checkName()) {
        return false;
    } else if(checkAge()) {
        return false;
    } else if(checkEmail()) {
        return false;
    } else {
        return true;
    }
}

function checkEmail(){
    if(email.value){
        
        return false;
    } else{
        alert("이메일을 입력 해 주세요.");
        return true;
    }
}
function checkAge(){
    if(age.value){
        
        return false;
    } else{
        alert("나이를 입력 해 주세요.");
        return true;
    }
}

function checkName(){
    if(userName.value){
        return false;
    } else{
        alert("이름을 입력 해 주세요.");
        return true;
    }
}

function repwCompair(){
    if(repw.value){
        return false;
    } else {
        alert("비밀번호2를 입력 해 주세요.");
        return true;
    }
}

function pwCompair(){
    if(pw.value){
        return false;
    } else {
        alert("비밀번호를 입력 해 주세요.");
        return true;
    }
}

function pwInspection(){
    if(pw.value == repw.value) {
        return false;
    } else {
        alert("비밀번호가 일치 하지 않습니다.");
        return true;
    }
}

function pwCheck(){
    const pwValue = pw.value;
    const repwValue = repw.value;
    if(pwValue !== repwValue) {
        message.style.visibility = 'visible';
    } else{
        message.style.visibility = 'hidden';
    }
}


repw.addEventListener('keyup', pwCheck);
pw.addEventListener('keyup', pwCheck);