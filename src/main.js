import {ageInYears, agingVelocity} from "./utils.js"
import "./style/style.sass"

const DEFAULT_DATE = "2000-01-01"

function toDateObj(str) {
    const arr = str.split("-").map(Number);
    if (arr.length !== 3) {
        return null
    }
    return new Date(arr[0], arr[1]-1, arr[2]);
}

function hashToDateVal(str) {
    if (str[0] === "#") {
        str = str.substr(1)
    }
    if (!str) {
        return null
    }
    if (toDateObj(str)) {
        return str;
    }
    return null
}

document.addEventListener("DOMContentLoaded", function(){
    const dateinput = document.getElementById("dateinput")
    const counterspan = document.getElementById("counternum")
    dateinput.value =
        hashToDateVal(window.location.hash)
        || hashToDateVal(window.localStorage.getItem("birthday"))
        || DEFAULT_DATE

    window.location.hash = dateinput.value
    window.localStorage.setItem("birthday", dateinput.value)

    dateinput.addEventListener("change", (ev)=>{
        const datevalue = ev.target.value
        window.localStorage.setItem("birthday", datevalue)
        window.location.hash = datevalue
    });

    let prevage = 0
    let prevtime = ageInYears(toDateObj(dateinput.value))
    const step = (timestamp) => {
        const currage = ageInYears(toDateObj(dateinput.value))
        counterspan.innerText = currage.toFixed(9)
        
        prevage = currage
        prevtime = timestamp
        window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)

})


