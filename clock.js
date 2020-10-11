function printClock() {
    
    var clock = document.getElementById("clock");// 출력할 장소 선택
    var week = document.getElementById("week");
    var AMPM = document.getElementById("AMPM");
    var day = document.getElementById("day");
    var currentDate = new Date();// 현재시간
    var date =  currentDate.getDate()// 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours()); 
    var currentMinute = addZeros(currentDate.getMinutes());
    var weekKorName=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    
    if(currentHours >= 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    	amPm = 'PM';
    	currentHours = addZeros(currentHours - 12,2);
    }

    clock.innerHTML = " "+currentHours+":"+currentMinute+" "+ amPm; //날짜를 출력해 줌
    week.innerHTML = weekKorName[currentDate.getDay()];
    day.innerHTML = date;
    setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출
}

function addZeros(num) { // 자릿수 맞춰주기
    var zero = 0;
    num = num.toString();
    var numDigit = num.length;
    if(numDigit<2){
      return zero + num;
    }
    else{
      return num;
    }
}

printClock();

