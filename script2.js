"use script";
document.addEventListener("DOMContentLoaded", addIMG);
function addIMG() {
    document.querySelector("#capReloaded").innerHTML = localStorage.getItem("robot");
}