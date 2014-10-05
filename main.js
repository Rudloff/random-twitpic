/*global DOMParser*/
/*jslint browser: true*/
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



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
                media = dummy.getElementById('media-full');
                if (media) {
                    pic.appendChild(link);
                    link.setAttribute('href', 'https://twitpic.com/' + media.getElementsByClassName('blue-button')[0].getAttribute('href'));
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
    req.open('GET', 'http://www.corsproxy.com/twitpic.com/' + num + '/full', true);
    req.send(null);
}

function init() {
    'use strict';
    var i;
    for (i = 0; i < 100; i += 1) {
        getImg();
    }
}

window.addEventListener('load', init, false);
