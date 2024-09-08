const lap_reset_btn = document.querySelector("#lap-reset-btn");
const start_pause_stop_btn = document.querySelector("#start-pause-stop-btn");

const laps = document.querySelector('.laps')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const milliseconds = document.querySelector('#milliseconds')

let hour = 9, minute = 58, second = 58, millisecond = 0
let timer

function updateTime(){
    // console.log('1')
    hours.textContent = hour >= 10 ? hour : "0" + hour
    minutes.textContent = minute >= 10 ? minute : "0" + minute
    seconds.textContent = second >= 10 ? second : "0" + second
    milliseconds.textContent = millisecond >= 10 ? millisecond : "0" + millisecond
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
}

function start(){
    lap_reset_btn.disabled = false;
    start_pause_stop_btn.textContent = "Stop"
    timer = setInterval(updateTime, 10)

}
function stop(){
    [...laps.childNodes].forEach(child => {
        laps.removeChild(child)
    })
}

start_pause_stop_btn.addEventListener("click", ()=>{
    start()
    console.log("hi")
})