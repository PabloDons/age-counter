import {ageInYears, agingVelocity} from "./utils.js"
import "./style/style.sass"
import { getEclipticLongitudalVelocityMillenia } from "./astronomy.js";

function toDateObj(str) {
    const arr = str.split("-").map(Number);
    return new Date(arr[0], arr[1]-1, arr[2]);
}

document.addEventListener("DOMContentLoaded", function(){
    if (!window.localStorage.getItem("birthday")) {
        window.localStorage.setItem("birthday", "1998-05-07")
    }

    const dateinput = document.getElementById("dateinput")
    const counterspan = document.getElementById("counternum")

    dateinput.value = window.localStorage.getItem("birthday")
    
    dateinput.addEventListener("change", (ev)=>{
        const datevalue = ev.target.value
        window.localStorage.setItem("birthday", datevalue)

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


