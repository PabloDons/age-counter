import {ageInYears} from "./utils.js"
import "./style/style.sass"

document.addEventListener("DOMContentLoaded", function(){


    const dateinput = document.getElementById("dateinput")
    const counterspan = document.getElementById("counternum")
    let datevalue = dateinput.value
    
    dateinput.addEventListener("change", (ev)=>{
        datevalue = ev.target.value
    });
    
    const step = (timestamp) => {
        const arr = dateinput.value.split("-").map(Number)
        counterspan.innerText = ageInYears(arr[0], arr[1]-1, arr[2]).toFixed(10)
        window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)

})


