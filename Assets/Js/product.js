let Btn = document.getElementById("productBtn")
let Product = document.getElementById("productInfo")
let minusBtn = Btn.parentElement.children.item(3)
let prodCount = Btn.parentElement.children.item(4)
let plusBtn = Btn.parentElement.children.item(5)
let resetCount = Btn.nextElementSibling.nextElementSibling

if (localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", JSON.stringify([]))
}

Btn.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (localStorage.getItem("basket") == null) {
        localStorage.setItem("basket", JSON.stringify([]))
    }
    let arr = JSON.parse(localStorage.getItem("basket"));
    let productId = Product.firstElementChild.getAttribute("data-id");
    let existProductId = arr.find(p => p.id == productId);

    if (existProductId == undefined) {
        arr.push({
            id: productId,
            price: this.parentElement.firstElementChild.lastElementChild.innerText,
            imageUrl: Product.firstElementChild.firstElementChild.getAttribute("src"),
            name: Product.parentElement.parentElement.parentElement.firstElementChild.innerText,
            count: parseInt(prodCount.innerText),
        })
    }
    else {
        if (Btn.nextElementSibling.hasAttribute("disabled")) {
            existProductId.count += parseInt(prodCount.innerText)
        }
        else {
            if (Btn.nextElementSibling.value <= 99) {
                existProductId.count += parseInt(Btn.nextElementSibling.value)
            }
            else {
                alert("max 99")
            }
        }
    }
    localStorage.setItem("basket", JSON.stringify(arr));
    WriteProductCount();
})

minusBtn.onclick = function () {
    if (prodCount.innerText > 0) {
        newCount = prodCount.innerText--
    }
    if (prodCount.innerText == 0) {
        Btn.nextElementSibling.removeAttribute('disabled')
    }
}
plusBtn.onclick = function () {
    prodCount.innerText++
    Btn.nextElementSibling.setAttribute('disabled', '');
}
resetCount.onclick = function () {
    let arr = JSON.parse(localStorage.getItem("basket"));

    let productId = Product.firstElementChild.getAttribute("data-id");
    let existProductId = arr.find(p => p.id == productId);
    existProductId.count = 0
    let zero = arr.filter(element => element.count > 0);
    let newArr = [...zero];
    arr = newArr
    localStorage.setItem("basket", JSON.stringify(arr));
    WriteProductCount();
    if (arr.length == 0) {
        localStorage.removeItem("basket")
        WriteProductCount();
    }
}

WriteProductCount();