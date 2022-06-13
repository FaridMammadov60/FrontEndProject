let table = document.getElementById("table")
let rtnBtn = document.getElementById("rtnBtn")
// let productCount = document.getElementById("product-count");
let totalPricess = document.getElementById("totalPricess")
// let sumTotalPrice = 0;
rtnBtn.classList.remove("d-none")

if (localStorage.getItem("basket") != null) {

    let arr = JSON.parse(localStorage.getItem("basket"));
    if (productCount.innerText == 0) {
        productCount.parentElement.classList.remove("bx-tada")
    }
    else if (productCount.innerText > 0) {
        productCount.parentElement.classList.add("bx-tada")
    }
    arr.forEach(product => {
        if (product.count > 0) {
            rtnBtn.classList.add("d-none")
            let tr = document.createElement("tr")
            let tdImage = document.createElement("td")
            let image = document.createElement("img")
            image.src = product.imageUrl
            image.style.width = "100px"
            tdImage.append(image)
            let tdName = document.createElement("td")
            tdName.innerText = product.name
            let tdPrice = document.createElement("td")
            tdPrice.innerText = `$ ${product.price}`
            let tdCount = document.createElement("td")

            let minusBtn = document.createElement("button")
            minusBtn.style.background = "transparent"
            let minus = document.createElement("input")
            minusBtn.append(minus)
            minus.setAttribute("value", "-")
            minus.style.width = "20px"
            minusBtn.style.border = "none"
            minus.style.background = "white"
            minus.style.cursor = "pointer"
            minus.style.borderRadius = "50%"
            minus.style.padding = "0px 4px"

            let plusBtn = document.createElement("button")
            plusBtn.style.background = "transparent"
            let plus = document.createElement("input")
            plusBtn.append(plus)
            plus.setAttribute("value", "+")
            plus.style.value = "+"
            plus.style.width = "20px"
            plusBtn.style.border = "none"
            plus.style.background = "white"
            plus.style.cursor = "pointer"
            plus.style.borderRadius = "50%"
            plus.style.padding = "0px 2px;"

            tdCount.innerHTML = `${product.count}`
            tdCount.prepend(minusBtn)
            tdCount.append(plusBtn)

            let tdSubTotal = document.createElement("td")
            let oneProductPrice = product.count * product.price
            tdSubTotal.innerText = `$ ${oneProductPrice}`

            let removeBtn = document.createElement("td")
            let remove = document.createElement("button")
            remove.innerText = "X"
            remove.style.cursor = "pointer"
            removeBtn.append(remove)

            tr.append(tdImage, tdName, tdPrice, tdCount, tdSubTotal, removeBtn)
            table.append(tr)
            sumTotalPrice += product.count * product.price;
            totalPrice.innerText = `$ ${parseFloat(sumTotalPrice).toFixed(2)}`;

            minus.onclick = function () {
                product.count--
                if (product.count > 0) {
                    tdCount.innerHTML = `${product.count}`
                    tdCount.prepend(minusBtn)
                    tdCount.append(plusBtn)
                    let prodPrice = product.count * product.price;
                    tdSubTotal.innerText = parseFloat(prodPrice).toFixed(2)
                    sumTotalPrice -= product.price;
                    totalPrice.innerText = parseFloat(sumTotalPrice).toFixed(2);
                }
                else {
                    tr.remove()
                    let zero = arr.filter(element => element.count > 0);
                    let newArr = [...zero];
                    arr = newArr
                    if (table.children.length == 2) {
                        rtnBtn.classList.remove("d-none")
                    }
                    sumTotalPrice -= parseFloat(product.price);
                    totalPrice.innerText = parseFloat(sumTotalPrice).toFixed(2);
                }
                localStorage.setItem("basket", JSON.stringify(arr))
                WriteProductCount();
            }

            plus.onclick = function () {
                product.count++
                tdCount.innerHTML = `${product.count}`
                tdCount.prepend(minusBtn)
                tdCount.append(plusBtn)

                let prodPrice = product.count * product.price;
                tdSubTotal.innerText = parseFloat(prodPrice).toFixed(2)
                sumTotalPrice += product.price;
                totalPrice.innerText = parseFloat(sumTotalPrice).toFixed(2);
                localStorage.setItem("basket", JSON.stringify(arr))
                WriteProductCount();
            }

            removeBtn.onclick = function () {
                this.parentElement.remove()
                localStorage.removeItem(this.parentElement)
                sumTotalPrice -= product.count * product.price;
                product.count = 0;
                let zero = arr.filter(element => element.count > 0);
                let newArr = [...zero];
                arr = newArr
                if (productCount.innerText == 0) {
                    productCount.parentElement.classList.remove("bx-tada")
                }
                if (table.children.length == 2) {
                    productCount.parentElement.classList.remove("bx-tada")
                    rtnBtn.classList.remove("d-none")
                }
                totalPrice.innerText = parseFloat(sumTotalPrice).toFixed(2);
                localStorage.setItem("basket", JSON.stringify(arr));
                WriteProductCount();
            }
        }
        else {
            rtnBtn.classList.remove("d-none")
        }
        WriteProductCount()
    });
}
if (productCount.innerText == 0) {
    productCount.parentElement.classList.remove("bx-tada")
}
else if (productCount.innerText > 0) {
    productCount.parentElement.classList.add("bx-tada")
}

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
        totalPricess.innerText = sumTotalPrice;
    }
}
WriteProductCount();