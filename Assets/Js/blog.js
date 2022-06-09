
$(document).ready(function () {

    let article1 = document.getElementById("article1")
    let article2 = document.getElementById("article2")
    let article3 = document.getElementById("article3")
    let article4 = document.getElementById("article4")


    let numb1 = document.getElementById("numb1")
    let numb2 = document.getElementById("numb2")

    let leftIcon = document.getElementById("leftIcon")
    let rightIcon = document.getElementById("rightIcon")

    rightIcon.onclick = right;
    numb2.onclick = right;
    leftIcon.onclick = left;
    numb1.onclick = left;

    function right() {
        numb1.classList.remove("active")
        numb2.classList.add("active")
        article1.classList.add("d-none")
        article2.classList.add("d-none")
        article3.classList.add("d-none")
        article4.classList.remove("d-none")
        rightIcon.classList.add("d-none")
        leftIcon.classList.remove("d-none")
    }

    function left() {
        numb1.classList.add("active")
        numb2.classList.remove("active")
        article1.classList.remove("d-none")
        article2.classList.remove("d-none")
        article3.classList.remove("d-none")
        article4.classList.add("d-none")
        leftIcon.classList.add("d-none")
        rightIcon.classList.remove("d-none")
    }
})