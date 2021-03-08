const message = document.querySelector('.message');
const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const repw = document.querySelector('#repw');
const userName = document.querySelector('#name');
const age = document.querySelector('#age');
const email = document.querySelector('#email');



document.getElementById('overlap').addEventListener('click', function() {
    if(!idCompare()){
        $.ajax({
            url: '/ajax',
                dataType: 'json',
                type: 'POST',
                data: id.value,
                success: function(result) {
                    console.log(result)
                if (result) {
                    
                }
            }
        });
    } 
})

function checkAll() {
    if(idCompare()) {
        return false;
    } else if(pwCheck()) {
        return false;
    } else if(pwCompare()) {
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
        email.focus();
        return true;
    }
}
function checkAge(){
    if(age.value){
        return false;
    } else{
        alert("나이를 입력 해 주세요.");
        age.focus();
        return true;
    }
}

function checkName(){
    if(userName.value){
        return false;
    } else{
        alert("이름을 입력 해 주세요.");
        userName.focus();
        return true;
    }
}

function pwCompare(){
    if(pw.value){
        return false;
    } else {
        alert("비밀번호를 입력 해 주세요.");
        pw.focus();
        return true;
    }
}

function idCompare(){
    if(id.value){
        return false;
    } else {
        alert("아이디를 입력 해 주세요.");
        id.focus();
        return true;
    }
}

function pwInspection(){
    if(pw.value == repw.value) {
        return false;
    } else {
        alert("비밀번호가 일치하지 않습니다.");
        repw.focus();
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