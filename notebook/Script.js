let Book = {
    nowPage: 0,
    Pages: [0,
        "https://rj-web.pages.dev/RuoYiBoard/",
        "https://r-j.pages.dev/",
        "https://rj-cloud.pages.dev/"
    ],
    full: false
}

function PagesCount() {
    $("#PagesCount").html(Book.nowPage + "/" + (Book.Pages.length - 1));
}; PagesCount();

$("#Previous").click(function () {
    if (Book.nowPage > 1) {
        Book.nowPage--;
        document.querySelector("#Book-Body").src = Book.Pages[Book.nowPage];
    } else if (Book.nowPage != 0) {
        Book.nowPage--;
        $("#cover").css({ "transform": "rotateY(0)" })
    };

    if (Book.nowPage == 0) {
        $("#Previous").slideUp(333);
    }; $("#Next").slideDown(333);

    PagesCount()
})

$("#Next").click(function () {
    if (Book.nowPage == 0) {
        $("#cover").css({ "transform": "rotateY(-135deg)" })
        Book.nowPage++;
        document.querySelector("#Book-Body").src = Book.Pages[Book.nowPage];
    } else if (Book.nowPage != (Book.Pages.length - 1)) {
        Book.nowPage++;
        document.querySelector("#Book-Body").src = Book.Pages[Book.nowPage];
    };

    if (Book.nowPage == (Book.Pages.length - 1)) {
        $("#Next").slideUp(333);
    }; $("#Previous").slideDown(333);

    PagesCount()
})

$("#full").click(function () {
    if (!Book.full) {
        $("#book").css({ transform: "none", height: "100vh", width: "100vw" })
        $("#Book-Body").css({ "position": "fixed", "height": "100vh", "width": "100vw" })
        $("#full").css({ position: "fixed", bottom: "50%", right: "100%", "z-index": "999"})
    } else {
        $("#book").css({ transform: " scale(0.25)",width: "56.25rem",height: "75rem"})
        $("#Book-Body").css({ "position": "absolute", "height": "100%", "width": "100%" })
        $("#full").css({ position: "unset", bottom: "auto", right: "auto" })
    }
    Book.full = !Book.full;
})