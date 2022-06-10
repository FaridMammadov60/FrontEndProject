let plus = document.querySelectorAll(".plus")
let minus = document.querySelectorAll(".minus")
plus.forEach(p => {
    p.onclick = function () {
        this.classList.add("d-none")
        this.nextElementSibling.classList.remove("d-none")
        this.parentElement.children.item(3).style.display = "block"
    }
})
minus.forEach(p => {
    p.onclick = function () {
        this.classList.add("d-none")
        this.previousElementSibling.classList.remove("d-none")
        this.parentElement.children.item(3).style.display = "none"
    }
})


$("body").on("input", "#slider", function () {
    $(".progress").css("width", $("#slider").val() + "%");
});

let direction = 1;
let price = document.getElementById("filterPrice")
let oldVal = parseInt($("#slider").val());
let newVal = oldVal + (10 * direction);
price.innerText = newVal;

setInterval(function () {
    let oldVal = parseInt($("#slider").val());

    if (oldVal === 70) {
        direction = -1;
    } else if (oldVal === 0) {
        direction = 1;
    }
    let newVal = oldVal + (10 * direction);
    price.innerText = newVal;

    $("#slider").val(newVal);
    // $("#slider").trigger("input");
}, 1000);