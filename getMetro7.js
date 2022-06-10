// 재료들
// 7호선 역 배열
const station = ["석남", "산곡", "부평구청", "굴포천", "삼산체육관", "상동", "부천시청",
"신중동", "춘의", "부천종합운동장", "까치울", "온수", "천왕", "광명사거리", "철산", "가산디지털단지", "남구로", "대림", "신풍", "보라매", "신대방삼거리", "장승배기", "상도", "숭실대입구", "남성", "이수", "내방", "고속터미널", "반포", "논현", "학동", "강남구청", "청담", "뚝섬유원지", "건대입구", "어린이대공원", "군자", "중곡", "용마산", "사가정", "면목", "상봉", "중화", "먹골", "태릉입구", "공릉", "하계", "중계", "노원", "마들", "수락산", "도봉산", "장암"]

// 인증키
var key = "4d6c786564736d6237365970784e63"

// 마커 위치용 배열들
const rotateSt = ["부천종합운동장", "까치울", "온수", "가산디지털단지", "장승배기", "뚝섬유원지", "먹골"]
const line1 = ["석남", "산곡", "부평구청", "굴포천", "삼산체육관", "상동", "부천시청",
"신중동", "춘의"]
const line2 = ["천왕", "광명사거리", "철산"]
const line3 = ["남구로", "대림", "신풍", "보라매", "신대방삼거리"]
const line4 = ["상도", "숭실대입구", "남성", "이수", "내방", "고속터미널", "반포", "논현", "학동", "강남구청", "청담"]
const line5 = ["건대입구", "어린이대공원", "군자", "중곡", "용마산", "사가정", "면목", "상봉", "중화"]
const line6 = ["태릉입구", "공릉", "하계", "중계", "노원", "마들", "수락산", "도봉산", "장암"]

// fetch 구문 (처음 로딩할 때 적용)

// 디버깅 용
// var url = "http://swopenAPI.seoul.go.kr/api/subway/" + key + "/json/realtimeStationArrival/0/20/" + station[17]
// fetch(url).then(res => res.json())
// .then(function(msg) {
//     // 1. 해당 역의 msg 중 해당 호선인지 확인하기
//     // 2. 해당 역의 arvlCd를 확인하고 0, 1이면 해당 역에 마커 표시하기
//     console.log(msg)

//     for (var j = 0; j < msg.realtimeArrivalList.length; j++) {
//         if (msg.realtimeArrivalList[j].subwayId === "1007" && (msg.realtimeArrivalList[j].arvlCd === "0" || msg.realtimeArrivalList[j].arvlCd === "1" || msg.realtimeArrivalList[j].arvlCd === "3")) {
//             setMarker(msg.realtimeArrivalList[j], msg.realtimeArrivalList[j].statnNm)
//         }
//     }
// })

// var newMarker = document.createElement("img")
// newMarker.src = "marker.png"
// newMarker.style.position = "absolute"
// newMarker.style.left = "930px"
// newMarker.style.bottom = "82px"
// newMarker.style.transform = "rotate(90deg)"
// document.getElementById("forMarker").appendChild(newMarker)

// 역마다 fetch하여 열차 위치 정보를 가져오기
for (var i = 0; i < station.length; i++) {
    var url = "http://swopenAPI.seoul.go.kr/api/subway/" + key + "/json/realtimeStationArrival/0/20/" + station[i]

    fetch(url).then(res => res.json())
    .then(function(msg) {
        // 1. 해당 역의 msg 중 해당 호선인지 확인하기
        // 2. 해당 역의 arvlCd를 확인하고 0, 1이면 해당 역에 마커 표시하기
        console.log(msg)

        for (var j = 0; j < msg.realtimeArrivalList.length; j++) {
            if (msg.realtimeArrivalList[j].subwayId === "1007" && (msg.realtimeArrivalList[j].arvlCd === "0" || msg.realtimeArrivalList[j].arvlCd === "1" || msg.realtimeArrivalList[j].arvlCd === "3")) {
                setMarker(msg.realtimeArrivalList[j], msg.realtimeArrivalList[j].statnNm)
            }
        }
    })
}

// 마커를 이미지 위에 위치시키는 함수
function setMarker(obj, name) {
    // 만약 해당 역이 rotateSt에 있다면
    for (var j = 0; j < rotateSt.length; j++) {
        if (rotateSt[j] === name) {
            //rotation(obj, j)
        }
    }

    // 만약 해당 역이 line1에 있다면
    for (var j = 0; j < line1.length; j++) {
        if (line1[j] === name) {
            lineOne(obj, j)
        }
    }

    // 만약 해당 역이 line2에 있다면
    for (var j = 0; j < line2.length; j++) {
        if (line2[j] === name) {
            lineTwo(obj, j)
        }
    }

    // 만약 해당 역이 line3에 있다면
    for (var j = 0; j < line3.length; j++) {
        if (line3[j] === name) {
            lineThree(obj, j)
        }
    }

    // 만약 해당 역이 line4에 있다면
    for (var j = 0; j < line4.length; j++) {
        if (line4[j] === name) {
            lineFour(obj, j)
        }
    }

    // 만약 해당 역이 line5에 있다면
    for (var j = 0; j < line5.length; j++) {
        if (line5[j] === name) {
            lineFive(obj, j)
        }
    }

    // 만약 해당 역이 line4에 있다면
    for (var j = 0; j < line6.length; j++) {
        if (line6[j] === name) {
            lineSix(obj, j)
        }
    }
}

// 마커의 위치를 결정하는 함수 곡선
function rotation(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 석남 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var garo = 930 - gangeok * index * 2
    if (flag) {
        garo = garo + gangeok
    }
    var sero = 82

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    newMarker.style.transform = "rotate(180deg)"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 1 (left 930px, bottom 103px, rotate(180deg), 25px)
function lineOne(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 석남 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var garo = 930 - gangeok * index * 2
    if (flag) {
        garo = garo + gangeok
    }
    var sero = 82

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    newMarker.style.transform = "rotate(180deg)"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 2 (left 480px, bottom 158px, 25px)
function lineTwo(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 천왕 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var garo = 480 + gangeok * index * 2
    if (flag) {
        garo = garo + gangeok
    }
    var sero = 137

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 3 (left 635px, bottom 250px, rotate(90deg), 25px)
function lineThree(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 천왕 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var sero = 229 + gangeok * index * 2
    if (flag) {
        sero = sero + gangeok
    }
    var garo = 635
    console.log(garo)

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    newMarker.style.transform = "rotate(90deg)"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 4 (left 730px, bottom 510px, 25px)
function lineFour(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 천왕 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var garo = 730 + gangeok * index * 2
    if (flag) {
        garo = garo + gangeok
    }
    var sero = 489

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 5 (left 1340px, bottom 603px, rotate(90deg), 25px)
function lineFive(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 천왕 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var sero = 582 + gangeok * index * 2
    if (flag) {
        sero = sero + gangeok
    }
    var garo = 1340

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    newMarker.style.transform = "rotate(90deg)"
    document.getElementById("forMarker").appendChild(newMarker)
}

// 마커의 위치를 결정하는 함수 6 (left 1455px, bottom 968px, rotate(90deg), 25px)
function lineSix(obj, index) {
    var state = obj.arvlCd
    var flag = false
    // 현재 상태가 3 (이전 역~ 해당 역 사이)일 때 flag가 true
    // 현재 상태가 0, 1 (진입, 도착)일 때 flag가 false
    if (state === "3") flag = true

    // 천왕 위치를 기본 값으로 하여 상대적인 위치 지정
    var gangeok = 25
    var sero = 947 - gangeok * index * 2
    if (flag) {
        sero = sero + gangeok
    }
    var garo = 1455

    var newMarker = document.createElement("img")
    newMarker.src = "marker.png"
    newMarker.style.position = "absolute"
    newMarker.style.left = garo + "px"
    newMarker.style.bottom = sero + "px"
    newMarker.style.transform = "rotate(90deg)"
    document.getElementById("forMarker").appendChild(newMarker)
}