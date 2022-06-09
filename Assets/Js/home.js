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
        localStorage.setItem("basket", JSON.stringify(arr));
        WriteProductCount();
    });
    btn.parentElement.parentElement.onmouseover = function () {
        let arr = JSON.parse(localStorage.getItem("basket"));
        let productId = this.getAttribute("data-id");
        let existProductId = arr.find(p => p.id == productId);
        if (existProductId != undefined) {
            if (existProductId.count > 0) {
                btn.classList.add("d-none");
                btn.nextElementSibling.classList.remove("d-none");
                btn.nextElementSibling.children.item(1).innerText = existProductId.count;

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

    $('#deadline').countdown('2022/8/12', function (event) {

        // $('#days').html(event.strftime(''
        //     + `<div>${66}</div>`
        // ));
        $('#hours').html(event.strftime(''
            + `<div>%H</div>`
        ));
        $('#minutes').html(event.strftime(''
            + `<div>%M</div>`
        ));
        $('#sec').html(event.strftime(''
            + `<div>%S</div>`
        ));
    });

    (function () {
        let second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        //I'm adding this section so I don't have to keep updating this pen every year :-)
        //remove this if you don't need it
        let today = new Date(),
            dd = String(today.getDate()).padStart(2, "0"),
            mm = String(today.getMonth() + 1).padStart(2, "0"),
            yyyy = today.getFullYear(),
            nextYear = yyyy,
            dayMonth = "08/12/",
            deadline = dayMonth + yyyy;

        today = mm + "/" + dd + "/" + yyyy;
        if (today > deadline) {
            deadline = dayMonth + nextYear;
        }
        //end

        let countDown = new Date(deadline).getTime(),
            x = setInterval(function () {

                let now = new Date().getTime(),
                    distance = countDown - now;

                document.getElementById("days").innerText = Math.floor(distance / (day));
                // document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                // document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                // document.getElementById("sec").innerText = Math.floor((distance % (minute)) / second);

                //do something later when date is reached
                if (distance < 0) {
                    clearInterval(x);
                }
                //seconds
            }, 0)
    }());


    // deadline end

})




//  Carousel Section Start

let index = 0,
    amount = 0,
    currTransl = [],
    translationComplete = true,
    moveOffset = 0;

let transitionCompleted = function () {
    translationComplete = true;
}

document.addEventListener("DOMContentLoaded", function () {
    amount = document.getElementsByClassName("slide").length;
    // get the width of the container
    moveOffset = parseInt(window.getComputedStyle(document.getElementById('carousel-container')).width, 10);
    // calcuate the width of the carousel
    document.getElementById('carousel').style.width = (amount * moveOffset) + 'px';
    // prevent multiple click when transition
    for (let i = 0; i < amount; i++) {
        currTransl[i] = -moveOffset;
        // document.getElementsByClassName("slide")[i].addEventListener("transitionend", transitionCompleted, true);
        document.getElementsByClassName("slide")[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
        document.getElementsByClassName("slide")[i].addEventListener("oTransitionEnd", transitionCompleted, true);
        document.getElementsByClassName("slide")[i].addEventListener("MSTransitionEnd", transitionCompleted, true);
    }
    // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
    document.getElementById('carousel').insertBefore(document.getElementById('carousel').children[3], document.getElementById('carousel').children[0])
    // add click events to control arrows
    document.getElementById('prev').addEventListener('click', prev, true);
    document.getElementById('next').addEventListener('click', next, true);
});

function prev() {
    if (translationComplete === true) {
        translationComplete = false;

        index--;
        if (index == -1) {
            index = amount - 1;
        }
        let outerIndex = (index) % amount;
        for (let i = 0; i < amount; i++) {
            let slide = document.getElementsByClassName("slide")[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + (currTransl[i] + moveOffset) + 'px)';
            currTransl[i] = currTransl[i] + moveOffset;
        }
        let outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] - (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] - moveOffset * (amount);
    }
}

function next() {
    if (translationComplete === true) {
        translationComplete = false;
        let outerIndex = (index) % amount;
        index++;
        for (let i = 0; i < amount; i++) {
            let slide = document.getElementsByClassName("slide")[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + (currTransl[i] - moveOffset) + 'px)';
            currTransl[i] = currTransl[i] - moveOffset;
        }
        let outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] + (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] + moveOffset * (amount);
    }
}

//  Carousel Section End


// product carousel start 
let items = document.querySelectorAll('#featurecntnr .carousel .carousel-item');
items.forEach((el) => {
    const minPerSlide = 5
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})
$(document).ready(function () {
    $('#featureCarousel').carousel({ interval: false });
    $('#featureCarousel').carousel('pause');
});


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

try {
    fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' })).then(function (response) {
        return true;
    }).catch(function (e) {
        var carbonScript = document.createElement("script");
        carbonScript.src = "//cdn.carbonads.com/carbon.js?serve=CK7DKKQU&placement=wwwjqueryscriptnet";
        carbonScript.id = "_carbonads_js";
        document.getElementById("carbon-block").appendChild(carbonScript);
    });
} catch (error) {
    console.log(error);
}