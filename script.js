const lap_reset_btn = document.querySelector("#lap-reset-btn");
const start_stop_resume_btn = document.querySelector("#start-stop-resume-btn");

const laps = document.querySelector('.laps')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const milliseconds = document.querySelector('#milliseconds')

let hour = 0, minute = 0, second = 0, millisecond = 0
let lap_hour = 0, lap_minute = 0, lap_second = 0, lap_millisecond = 0
let timer, lap_count = 1

function updateTime(){
    updateClock()
    if(millisecond >= 99){
        second += 1
        millisecond = 0
    }
    if(second > 59){
        minute += 1
        second = 0
    }
    if(minute >= 59){
        hour += 1
        minute = 0
    }
    millisecond += 1

    // for the lap time
    if(lap_millisecond >= 99){
        lap_second += 1
        lap_millisecond = 0
    }
    if(lap_second > 59){
        lap_minute += 1
        lap_second = 0
    }
    if(lap_minute >= 59){
        lap_hour += 1
        lap_minute = 0
    }
    lap_millisecond += 1
}


function updateClock(){
    hour = Number(hour), 
    minute = Number(minute)
    second = Number(second)
    millisecond = Number(millisecond)

    hours.textContent = hour >= 10 ? hour : "0" + hour
    minutes.textContent = minute >= 10 ? minute : "0" + minute
    seconds.textContent = second >= 10 ? second : "0" + second
    milliseconds.textContent = millisecond >= 10 ? millisecond : "0" + millisecond
}

function modifyTimes(){
    lap_hour = lap_hour >= 10 ? lap_hour : "0" + lap_hour
    lap_minute = lap_minute >= 10 ? lap_minute : "0" + lap_minute
    lap_second = lap_second >= 10 ? lap_second : "0" + lap_second
    lap_millisecond = lap_millisecond >= 10 ? lap_millisecond : "0" + lap_millisecond
    
    hour = hour >= 10 ? hour : "0" + hour
    minute = minute >= 10 ? minute : "0" + minute
    second = second >= 10 ? second : "0" + second
    millisecond = millisecond >= 10 ? millisecond : "0"+ millisecond
}

function start(){
    lap_reset_btn.disabled = false;
    start_stop_resume_btn.textContent = "Stop"
    timer = setInterval(updateTime, 10)
    
}
function stop(){
    clearInterval(timer)
    start_stop_resume_btn.textContent = "Resume";
    lap_reset_btn.textContent = "Reset";
}

function resume(){
    timer = setInterval(updateTime, 10)
    lap_reset_btn.textContent = "Lap";
    start_stop_resume_btn.textContent = "Stop"
}

function reset(){
    hour = 0, minute = 0, second = 0, millisecond = 0;
    [...laps.childNodes].forEach(child => {
        laps.removeChild(child)
    })
    updateClock()
    lap_reset_btn.textContent = "Lap";
    lap_reset_btn.disabled = true;
    start_stop_resume_btn.textContent = "Start"
}

function createLap(){
    modifyTimes()
    const lap = document.createElement("div")
    lap.classList.add("lap")
    lap.innerHTML = `<span>${lap_count >= 10 ? lap_count : "0" + lap_count}</span>
    <span>${lap_hour}:${lap_minute}:${lap_second}.${lap_millisecond}</span>
    <span>${hour}:${minute}:${second}.${millisecond}</span>`
    laps.appendChild(lap)
    lap_hour = 0, lap_minute = 0, lap_second = 0, lap_millisecond = 0
    lap_count += 1
    laps.scrollBy(100, 100)
}

start_stop_resume_btn.addEventListener("click", (e)=>{
    const text = e.currentTarget.textContent.toLowerCase()
    console.log(text)
    if(text == "start"){
        start()
    }
    else if(text == "stop"){
        stop()
    }
    else{ // if resume
        resume()
    }
    console.log("hi")
})


lap_reset_btn.addEventListener("click", (e)=>{
    const text = e.currentTarget.textContent.toLowerCase()
    if(text == "lap"){
        createLap()
    }
    else{ // if reset
        reset()
    }
})


