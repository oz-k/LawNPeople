const message = document.querySelector('.message');
const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const repw = document.querySelector('#repw');
const userName = document.querySelector('#name');
const age = document.querySelector('#age');
const email = document.querySelector('#email');


document.getElementById('overlap').addEventListener('click', function() { //id 중복확인버튼 이벤트
    if(idCompare()){ //id가 공백이아니고
        if(idDuplicate()) { //사용가능한 id일 때
            alert('사용가능한 id입니다.');
        }
    } 
})


function checkAll() { //전체 확인
    if(!idCompare()) {
        return false;
    } else if(!idDuplicate()){
        return false;
    } else if(!pwCompare()) {
        return false;
    } else if(!pwInspection()) {
        return false;
    } else if(!checkName()) {
        return false;
    } else if(!checkAge()) {
        return false;
    } else if(!checkEmail()) {
        return false;
    } else {
        return true;
    }
}

function idCompare(){ //id 공백확인
    if(id.value){
        return true;
    } else {
        alert("아이디를 입력 해 주세요.");
        id.focus();
        return false;
    }
}

function idDuplicate() { //id중복확인
    let flag = true;
    $.ajax({
        url: '/ajax', //ajax라는 url로 data보냄
            dataType: 'json', //dataType은 json
            type: 'POST', //post방식으로 보냄
            data: {id:id.value}, //id를 보냄
            async:false, //동기식으로 처리
            success: function(result) { //성공했을 때 콜백함수
            if (result === false) {
                //이미 존재하는 id일 때
                alert('이미 존재하는 id입니다.');
                id.focus();
                flag = false;
            }
        }
    });
    return flag;
}

function pwCheck(){ //비밀번호 같은지 확인
    const pwValue = pw.value;
    const repwValue = repw.value;
    if(pwValue !== repwValue) {
        message.style.visibility = 'visible';
    } else{
        message.style.visibility = 'hidden';
    }
}

function pwCompare(){ //비밀번호 공백확인
    if(pw.value){
        return true;
    } else {
        alert("비밀번호를 입력 해 주세요.");
        pw.focus();
        return false;
    }
}

function pwInspection(){ //비밀번호 같은지 확인
    if(pw.value == repw.value) {
        return true;
    } else {
        alert("비밀번호가 일치하지 않습니다.");
        repw.focus();
        return false;
    }
}

function checkName(){ //이름 공백확인
    if(userName.value){
        return true;
    } else{
        alert("이름을 입력 해 주세요.");
        userName.focus();
        return false;
    }
}

function checkAge(){ //나이 공백확인
    if(age.value){
        return true;
    } else{
        alert("나이를 입력 해 주세요.");
        age.focus();
        return false;
    }
}

function checkEmail(){ //이메일 공백확인(추후 이메일양식확인 로직 들어가야함)
    if(email.value){
        return true;
    } else{
        alert("이메일을 입력 해 주세요.");
        email.focus();
        return false;
    }
}

repw.addEventListener('keyup', pwCheck);
pw.addEventListener('keyup', pwCheck);