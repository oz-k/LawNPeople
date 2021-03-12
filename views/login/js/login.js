const id = document.querySelector('#id');
const pw = document.querySelector('#pw');

function accountCheck(){
    let flag = true;
    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: {id:id.value},
        async: false,
        success: function(result) {
            if(result === true) {
                alert("아이디나 비밀번호를 잘못 입력하셨습니다.");
                id.focus();
                flag = false;
            }
        }
    });
    return flag;
}

function idNone(){ //아이디 공백
    if(id.value){
        return true;
    } else{
        alert("아이디를 입력 해 주세요.");
        id.focus();
        return false;
    }
}
function pwNone(){ // pw 공백
    if(pw.value){
        return true;
    } else{
        alert("비밀번호를 입력 해 주세요.");
        pw.focus();
        return false;
    }
}
function check(){ //공백 확인
    if(!idNone()) {
        return false;
    } else if(!pwNone()){
        return false;
    } else {
        return true;
    }
}