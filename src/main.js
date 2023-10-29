import {ageInYears, agingVelocity} from "./utils.js"
import "./style/style.sass"

const DEFAULT_DATE = "2000-01-01"

function toDateObj(str) {
    const arr = str.split("-").map(Number);
    if (arr.length !== 3) {
        throw new Error("Expected date string to contain 3 numbers")
    }
    return new Date(arr[0], arr[1]-1, arr[2]);
}

function hashToDateVal(str) {
    str = str.substr(1)
    if (!str) {
        return null
    }
    try {
        toDateObj(str)
        return str;
    } catch (error) {}
    return null
}

document.addEventListener("DOMContentLoaded", function(){
    const dateinput = document.getElementById("dateinput")
    const counterspan = document.getElementById("counternum")
    dateinput.value =
        hashToDateVal(window.location.hash)
        || hashToDateVal(window.localStorage.getItem("birthday"))
        || DEFAULT_DATE

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


