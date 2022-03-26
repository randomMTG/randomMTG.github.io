const url = "https://api.scryfall.com/cards/random?format=image&version=art_crop";
const img = document.querySelector("#mtg");
const next = new Image();
let loaded = false;
let waiting = false;

fetch(url).then((res) => {
    img.src = res.url;

    get_next();

    img.onclick = () => {
        if (loaded) {
            change_img();
            get_next();
        } else {
            img.src = "images/pacman.gif";
            waiting = true;
        }
    };
});

// Get second image.
get_next = () => {
    fetch(url).then((res) => {
        next.src = res.url;
        loaded = true;

        // If already waiting for new image then display and get new image immediately
        if (waiting) {
            change_img();
            waiting = false;
            get_next();
        }
    });
};

// Change image to the next
change_img = () => {
    img.src = next.src;
    loaded = false;
};
