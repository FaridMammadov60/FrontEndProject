let btnchart = document.querySelectorAll(".btnchart");
let productCount = document.getElementById("productCount");
let productUsd = document.getElementById("productUsd");
let btnchartminus = document.querySelectorAll(".btnchartminus");
let btnchartplyus = document.querySelectorAll(".btnchartplyus");
let btnchartprice = document.querySelectorAll(".btncahrtprice");


btnchart.forEach(btn => {
    btn.addEventListener("click", function (ev) {
        ev.preventDefault();

        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]));
        }
        this.classList.add("d-none");
        this.nextElementSibling.classList.remove("d-none");

        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = this.parentElement.parentElement.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);

        if (existProductId == undefined) {
            arr.push({
                id: productId,
                price: this.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText,
                imageUrl: this.parentElement.parentElement.firstElementChild.getAttribute("src"),
                name: this.parentElement.parentElement.firstElementChild.innerText,
                count: 1
            })
        }
        else {
            existProductId.count++;
            btnchartprice.forEach(bt => {
                if (bt.parentElement.parentElement.parentElement.getAttribute("data-id") == productId) {
                    bt.innerText = existProductId.count
                }
            })
        }
        if (existProductId.count == 0) {
            this.classList.remove("d-none");
            this.nextElementSibling.classList.add("d-none");
        }
        else {
            this.classList.add("d-none");
            this.nextElementSibling.classList.remove("d-none");
        }

        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    });

    btn.parentElement.parentElement.onmouseover = function (ev) {
        ev.preventDefault();
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]));
        }
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = this.getAttribute("data-id");
        let existProductId2 = arr.find(p => p.id == productId);

        btnchartplyus.forEach(plus => {
            plus.addEventListener("click", function () {
                existProductId2.count++;
                btn.nextElementSibling.children.item(1).innerText = existProductId2.count;

                localStorage.setItem("basket", JSON.stringify(arr));
                WriteProductCount();
            })
        })
        btnchartminus.forEach(minus => {
            minus.addEventListener("click", function () {
                if (existProductId2.count == 0) {
                    let findarr = arr.filter(n => n.count > 0)
                    let newarr = [...findarr];
                    arr = newarr;

                }
                else {
                    existProductId2.count--;
                    btn.nextElementSibling.children.item(1).innerText = existProductId2.count;
                }
                if (existProductId2.count == 0) {
                    btn.classList.remove("d-none");
                    btn.nextElementSibling.classList.add("d-none");
                }
                else {
                    btn.classList.add("d-none");
                    btn.nextElementSibling.classList.remove("d-none");
                }

                localStorage.setItem("basket", JSON.stringify(arr));
                WriteProductCount();
            })
        })


        if (existProductId2 != undefined) {
            if (existProductId2.count > 0) {
                btn.classList.add("d-none");
                btn.nextElementSibling.classList.remove("d-none");
                btn.nextElementSibling.children.item(1).innerText = existProductId2.count;

            }
            else {
                btn.classList.remove("d-none");
                btn.nextElementSibling.classList.add("d-none");
            }
        }


        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    }

})





function WriteProductCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let totalCount = 0;
        arr.map(product => {
            totalCount += product.count;
        })
        productCount.innerText = totalCount;
        let totalPrice = 0;
        arr.forEach(product => {
            totalPrice += product.count * parseInt(product.price);
        })

        productUsd.innerText = totalPrice
        localStorage.setItem("basket", JSON.stringify(arr));
    }
}
WriteProductCount();





$(document).ready(function () {
    $(".location").click(function () {
        swal({
            title: "Choose your Delivery Location",
        });
    })

    // deadline start


    //wishlist
    let heartIcon = document.querySelectorAll(".heart")
    heartIcon.forEach(heart => {
        heart.onclick = function () {
            if (this.classList.contains("bxs-heart")) {
                this.classList.remove("bxs-heart")
                this.classList.add("bx-heart")
            }
            else {
                this.classList.remove("bx-heart")
                this.classList.add("bxs-heart")
            }
        }
    })
})
