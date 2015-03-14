/*global DOMParser*/
/*jslint browser: true*/
/**
 * Get a random integer
 *
 * @param {int} min Minimum
 * @param {int} max Maximum
 *
 * @return {int}
 * */
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random image from Twitpic and add it to the page
 * */
function getImg() {
    'use strict';
    var req = new XMLHttpRequest(), num = getRandomInt(0, 100000);
    req.onreadystatechange = function () {
        var dummy,
            parser = new DOMParser(),
            media,
            pic = document.createElement('li'),
            link = document.createElement('a'),
            img = document.createElement('img');
        if (this.readyState === 4) {
            if (this.status === 200) {
                dummy = parser.parseFromString(this.responseText, 'text/html');
                media = dummy.getElementById('media');
                if (media) {
                    pic.appendChild(link);
                    link.setAttribute('href', 'https://twitpic.com/' + num);
                    link.setAttribute('target', '_blank');
                    img.setAttribute('src', 'https://twitpic.com/show/mini/' + num);
                    link.appendChild(img);
                    document.getElementById('pics').appendChild(pic);
                } else {
                    getImg();
                }
            } else {
                getImg();
            }
        }
    };
    req.open('GET', 'https://cors-anywhere.herokuapp.com/twitpic.com/' + num, true);
    req.send(null);
}

/**
 * Main function
 * */
function init() {
    'use strict';
    var i;
    for (i = 0; i < 100; i += 1) {
        getImg();
    }
}

window.addEventListener('load', init, false);
