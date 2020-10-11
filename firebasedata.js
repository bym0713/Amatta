var ulList = document.getElementById('todoList');
var trdata = document.getElementById("bus");
var todoListID = document.getElementById("todoList");
var busID = document.getElementById("bus");
var subwayID = document.getElementById("subway");

var database = firebase.database();
var dataRef = database.ref('SmartHome/raspberrpi');
var least_Rssi = dataRef.orderByChild("RSSI").limitToFirst(3);

function sleep (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
 }

function init() {
}

function icon() {
    var phone = document.createElement('i');
    phone.setAttribute("class", "fas fa-mobile-alt");
    ulList.appendChild(phone);
}

//새 정보업데이트를 위한 화면 초기화
function Delete() {
    while (busID.firstChild) {
        busID.removeChild(busID.firstChild);
    }
    while (subwayID.firstChild) {
        subwayID.removeChild(subwayID.firstChild);
    }
    while (todoListID.firstChild) {
        todoListID.removeChild(todoListID.firstChild);
    }
}

//날씨 데이터/
function dayInfo() {
    dataRef.once('value', function(snap) {
        var defWeather = snap.val()['WEATHER'];
        //상태관련 데이터//

        var statment = defWeather.statement;
        
        if (statment != undefined) {
            var state = JSON.stringify(statment).replace(/["\\]/gi, "");
            var statementId = document.getElementById('statement');
            var weatherCss = document.getElementById('weather');
            if (state == "Clear") {
                statementId.innerHTML = "맑음";
                weatherCss.style.backgroundImage = "url(image/clear.png)";
            } else if (state == "Clouds") {
                statementId.innerHTML = "흐림";
                weatherCss.style.backgroundImage = "url(image/cloud.jpg)";
            } else if (state == "Rain") {
                statementId.innerHTML = "비";
                weatherCss.style.backgroundImage = "url(image/rain.jpg)";
            } else if (state == "Snow") {
                statementId.innerHTML = "눈";
                weatherCss.style.backgroundImage = "url(image/snow.png)";
            } else {
                statementId.innerHTML = state;
            }
        }



        //온도관련 데이터//
        var degree = defWeather.degree;
        if (degree != undefined) {
            var aDegree = JSON.stringify(degree).replace(/["\\]/gi, "");
            var average_degree = document.getElementById('average');//평균온도
            var degree_cut = aDegree.split(".");
            average_degree.innerHTML = degree_cut[0] + "<span>&#176;</span>";

            var maxDegree = defWeather.max_degree;
            var mDegree = JSON.stringify(maxDegree).replace(/["\\]/gi, "");
            var max_degree = document.getElementById('high');//최고온도
            max_degree.innerHTML = mDegree + "<span>&#176;</span>";

            var minDegree = defWeather.min_degree;
            
            var miDegree = JSON.stringify(minDegree).replace(/["\\]/gi, "");
            var min_degree = document.getElementById('row');//최저온도
            min_degree.innerHTML = miDegree + "<span>&#176;</span>";
        }
    })
}

// 할 일, 교통정보, 좌우명 데이터 출력
function amatta() {
    least_Rssi.once('value', function(snap) {
        var objKey = Object.keys(snap.val())[2];
        
        dataRef.once('value', function(data) {

                
                var objList = snap.val()[objKey];

                var rs = objList.RSSI;
                

                //to_do_list
                var taskList = objList['Task'];

                //문자열 만들기
                if (taskList != undefined) {
                    var first = JSON.stringify(taskList);
                    //특수문자 제거
                    
                    var second = JSON.stringify(first).replace(/[\{\}\"\[\]\'\\]/gi, "").replace(/,/gi, "\n\n").replace(/:/gi, "\n");

                    ulList.innerText = second;
                    var objKeyString = JSON.stringify(objKey);
                    var objKey_edit = objKeyString.replace(/[\[\]\"]/gi, "");

                }

                //좌우명//
                var refMoto = objList["좌우명"];
                var moto = JSON.stringify(refMoto).replace(/["\\]/gi, "");
                var max_degree = document.getElementById('moto');
                max_degree.innerHTML = moto;
                



                //버스 데이터
                var Transport = objList['Public Transport'];
                if (Transport != undefined) {
                    var Bus = Transport['Bus'];
                    if (Bus != undefined) {
                        var stationName = Object.keys(Bus);
                        var sn = stationName.length;


                        for (var i = 0; i < sn; i++) {
                            //버스정류소 이름 표기
                            var newUL = document.createElement("d");
                            var menu = document.getElementById("bus");
                            menu.appendChild(newUL);
                            newUL.setAttribute("id", stationName[i]);
                            newUL.innerHTML = stationName[i];


                            //버스 번호 가져오기

                            var busNumber = Bus[stationName[i]];
                            // 버스남은시간
                            var arr1 = busNumber.arrmsg1;
                            var arr2 = busNumber.arrmsg2;
                            if (arr1 != undefined && arr2 != undefined) {
                                var edit1 = JSON.stringify(arr1).replace(/["\\]/gi, "");
                                var edit2 = JSON.stringify(arr2).replace(/["\\]/gi, "");

                                var newli1 = document.createElement("li");
                                var newli2 = document.createElement("li");
                                newli1.innerHTML = edit1;
                                newli2.innerHTML = edit2;
                                var append = document.getElementById(stationName[i]);
                                append.appendChild(newli1);
                                append.appendChild(newli2);

                            }
                        }
                    }

                    var subway = Transport['Subway'];

                    var objSubway = Object.keys(subway);
                    var objL = objSubway.length;

                    for (var j = 0; j < objL; j++) {
                        var station = objSubway[j];
                        var newUl = document.createElement("d");
                        newUl.innerHTML = station;
                        var appendS = document.getElementById("subway");
                        appendS.appendChild(newUl);
                        newUl.setAttribute("id", station);

                        var arrmsg1_1 = subway[station].arrmsg1_1;
                        var arrmsg1_2 = subway[station].arrmsg1_2;
                        var arrmsg2_1 = subway[station].arrmsg2_1;
                        var arrmsg2_2 = subway[station].arrmsg2_1;
                        var arr1_1 = document.createElement("li");
                        var arr1_2 = document.createElement("li");
                        var arr2_1 = document.createElement("li");
                        var arr2_2 = document.createElement("li");
                        if (arrmsg1_1 != undefined && arrmsg1_2 != undefined && arrmsg2_1 != undefined && arrmsg2_2 != undefined) {
                            arr1_1.innerHTML = JSON.stringify(arrmsg1_1).replace(/["\\]/gi, "");
                            arr1_2.innerHTML = JSON.stringify(arrmsg1_2).replace(/["\\]/gi, "");
                            arr2_1.innerHTML = JSON.stringify(arrmsg2_1).replace(/["\\]/gi, "");
                            arr2_2.innerHTML = JSON.stringify(arrmsg2_2).replace(/["\\]/gi, "");
                            var appendA = document.getElementById(station);
                            appendA.appendChild(arr1_1);
                            appendA.appendChild(arr1_2);
                            appendA.appendChild(arr2_1);
                            appendA.appendChild(arr2_2);


                        }

                    }
                }
        })
    })
}