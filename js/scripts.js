const url = "https://api.scryfall.com/cards/random?format=image&version=art_crop";
let xhr = new XMLHttpRequest();
let load = "";
let tmp = null; // Variable to hold click event
let im = new Image(); // Image object to preload image
im.src = "images/pacman.gif";
const img_el = document.querySelector("#mtg");

// Request random MTG
xhr.open("GET", url, true);
xhr.onload = function () {
    console.log(xhr.responseURL);
    img_el.attr("src", xhr.responseURL);

    // Load next image before click to avoid waiting
    newMTG();

    // Image on click - available after loading first image
    img_el.onclick = () => {
        console.log(xhr.readyState);

        if (xhr.readyState == 4 && load != "") {
            // If loaded, present and load another
            img_el.attr("src", load);
            newMTG();
        } else {
            // Else wait for loading, present and load another
            img_el.attr("src", "images/pacman.gif"); // Loading GIF
            tmp = img_el.onclick;
            img_el.onclick = null;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    img_el.attr("src", xhr.responseURL);
                    img_el.onclick = tmp;
                    xhr.onreadystatechange = null;
                    newMTG();
                }
            };
        }
    };
};
xhr.send(null);

// Request random MTG
function newMTG() {
    xhr.open("GET", url, true);
    xhr.onload = function () {
        console.log(xhr.responseURL);
        load = xhr.responseURL;
        im.src = load;
    };
    xhr.send(null);
}
