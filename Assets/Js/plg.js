// Countdown Start

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


// countDown End


// ProductCarpusel Start

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
        // document.getElementById("carbon-block").appendChild(carbonScript);
    });
} catch (error) {
    console.log(error);
}
// product carousel end