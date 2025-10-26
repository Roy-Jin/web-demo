let Volume = 0.5;

if (localStorage.getItem('Volume')) {
    Volume = parseFloat(localStorage.getItem('Volume'));
}

function songsRun(path, v) {
    console.log(path, '*' + v);
    audio = new Audio(path);
    if (!v) {
        audio.volume = Volume;
    } else {
        if (v > 1) {
            audio.volume = 1;
        } else {
            if (Volume == 0) {
                audio.volume = Volume;
            } else {
                audio.volume = v;
            }
        }
    }
    audio.currentTime = 0;
    audio.play();
}