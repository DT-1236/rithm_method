this.onload = function() {
    document.querySelector('button').addEventListener('click', function(event) {
        let urlMeme = document.getElementById('urlInput').value;
        let top = document.getElementById('topInput').value;
        let bottom = document.getElementById('bottomInput').value;
        document.getElementById('meme').style.backgroundImage = 'url(' + urlMeme + ')';
        document.querySelector('#top p').innerText = top.toUpperCase();
        document.querySelector('#bottom p').innerText = bottom.toUpperCase();
        textBoxes = document.querySelectorAll('input');
        textBoxes.forEach(function(box) {
            box.value = '';
        });
    });
}
