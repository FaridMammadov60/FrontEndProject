let basketIcon = document.querySelector(".basketIcon")
let btnAdd = document.querySelectorAll(".btn-add");
let productCount = document.getElementById("product-count");
let totalPrice = document.getElementById("totalPrice")
let sumTotalPrice = 0;

if (localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", JSON.stringify([]))
}

btnAdd.forEach(btn => {
    btn.addEventListener("click", function (ev) {
        this.style.display = "none"
        this.nextElementSibling.style.display = "block"
        basketIcon.classList.add("bx-tada")

        ev.preventDefault();
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = this.parentElement.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);

        if (existProductId == undefined) {
            arr.push({
                id: productId,
                price: this.previousElementSibling.children.item(1).innerText,
                imageUrl: this.parentElement.firstElementChild.getAttribute("src"),
                name: this.parentElement.children.item(3).innerText,
                count: 1,
            })
        }
        else {
            existProductId.count++;
            this.nextElementSibling.firstElementChild.nextElementSibling.innerText = existProductId.count;
        }
        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    });
    btn.parentElement.onmouseover = function () {
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = btn.parentElement.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);

        if (existProductId != undefined) {
            btn.nextElementSibling.firstElementChild.nextElementSibling.innerText = existProductId.count
            btn.style.display = "none"
            btn.nextElementSibling.style.display = "block"
        }
        else {
            btn.style.display = "block"
        }
    };
    btn.parentElement.onmouseleave = function () {
        btn.style.display = "none"
        btn.nextElementSibling.style.display = "none"
    };
    btn.nextElementSibling.firstElementChild.onclick = function () {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = btn.parentElement.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);
        if (existProductId.count > 0) {
            existProductId.count--
            btn.nextElementSibling.firstElementChild.nextElementSibling.innerText = existProductId.count
            btn.style.display = "block"
            btn.nextElementSibling.style.display = "none"
        }
        let zero = arr.filter(element => element.count > 0);
        let newArr = [...zero];
        arr = newArr

        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    }
    btn.nextElementSibling.lastElementChild.onclick = function () {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = btn.parentElement.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);
        if (existProductId.count >= 1) {
            existProductId.count++
            btn.nextElementSibling.firstElementChild.nextElementSibling.innerText = existProductId.count
        }
        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    }
}

)



// function WriteProductCount() {
//     let arr = JSON.parse(localStorage.getItem("basket"));
//     productCount.innerText = arr.length;
// }
// WriteProductCount();

function WriteProductCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let totalCount = 0;
        let sumTotalPrice = 0;
        arr.map(product => {
            totalCount += product.count;
            let oneProdPrice = product.count * product.price
            sumTotalPrice += oneProdPrice
        })
        productCount.innerText = totalCount;
        totalPrice.innerText = parseFloat(sumTotalPrice).toFixed(2);
        if (productCount.innerText == 0) {
            productCount.parentElement.classList.remove("bx-tada")
        }
        else if (productCount.innerText > 0) {
            productCount.parentElement.classList.add("bx-tada")
        }

    }
}
WriteProductCount();

// basket section end