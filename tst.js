if (localStorage.getItem("basket") != null) {
    let arr = JSON.parse(localStorage.getItem("basket"));
    arr.forEach(product => {
        if (product.count == 0) {

        }
        else {
            btnchartminus.forEach(minus => {
                //let arr = JSON.parse(localStorage.getItem("basket"));

                minus.onclick = function () {
                    let productId = this.parentElement.parentElement.parentElement.getAttribute("data-id");
                    let existProductId = arr.find(p => p.id == productId);
                    product.count--;
                    console.log(existProductId);
                    existProductId.count--;
                    if (product.count == 0) {
                        productUsd -= parseInt(product.price);

                    } else {
                        productUsd -= parseInt(product.price);

                    }
                    btnchartprice.forEach(bt => {
                        if (bt.parentElement.parentElement.parentElement.getAttribute("data-id") == existProductId.id) {
                            bt.innerText = existProductId.count;
                            console.log(bt);
                        }
                    })
                    localStorage.setItem("basket", JSON.stringify(arr));
                    WriteProductCount();
                }
            })

        }
    })
};