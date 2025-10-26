// 
const loadingPage = document.getElementById('loadingPage');
const spacePage = document.getElementById('spacePage');

// 初始化
function init() {
    setTimeout(() => {
        loadingPage.style.opacity = 0;
        setTimeout("loadingPage.remove();", 1888) // 去除加载中页面
    }, 3000);
}

init();

// 计算进入页面的次数
function Count_Love() {
    let Count;
    localStorage.getItem("Count_Love") ? Count = localStorage.getItem("Count_Love") : Count = 0;
    localStorage.setItem("Count_Love", Count = parseInt(Count) + 1);

    if (Count % 5 === 0) { // 5的倍数
        console.log(`你已经进入页面 ${Count} 次了`);
        // 定义包含爱的句子的数组
        const loveSentences = [
            "爱，是一种奇妙的情感，它如同温柔的微风，拂过心灵，点亮了生命的每一个角落。",
            "爱，是心灵深处绽放的花朵，它的馨香永远萦绕在感情的每一个角落。",
            "爱，是一种无法言喻的情感，它如同暖阳般温暖，填满了心间的每一个空隙。",
            "爱，是一种深沉的情感，它如同星辰般闪耀，照亮了感情的旅程，永不衰退。",
            "爱，是生命中最为柔软的力量，也是最坚定的信仰，它赋予了我们勇气和希望。",
            "爱，是一首永不停歇的歌谣，它穿越时光，唤醒了心中最美的共鸣。",
            "爱，是一种永恒的诺言，它超越了言语，流淌在每一个真挚的眼神中。",
            "爱，是一种柔软而又坚定的情感，它如同清泉般澄澈，润泽了心田的每一寸土地。",
            "爱，是心之所向，情之所钟，它如同繁星点点，照亮了漫漫夜色。",
            "爱，是一种美妙的心灵交融，它如同阳光般明媚，温暖了生命的每一寸土地。"
        ];

        // 随机获取一句爱的句子
        function getRandomLoveSentence() {
            const randomIndex = Math.floor(Math.random() * loveSentences.length);
            return loveSentences[randomIndex];
        }

        // 输出随机一句爱的句子
        let Toast = document.createElement("div");
        Toast.className = "toast";
        Toast.innerHTML = getRandomLoveSentence();
        document.body.append(Toast);
        setTimeout(function () {
            Toast.style.bottom = "50px";
        }, 100)
        setTimeout(function () {
            Toast.style.bottom = "-100px";
            setTimeout(function () {
                Toast.remove();
            }, 1500)
        }, 6666)
    }
} Count_Love();

// 播放音乐
let IsPlay = false;
let music_Img = document.querySelector("#Music_Img");
let music_Div = document.querySelector(".music");
const music_C = 3; // 音乐数量 后面用于随机选音乐
let Music = new Audio(`./doc/music-${Math.floor(Math.random() * music_C)}.mp3`);
Music.loop = true;
let musicFun = {
    on: () => {
        Music.play();
        music_Img.src = "./doc/music-on.png";
        music_Img.style.animation = "rotate 5s infinite linear";
        music_Div.style.transform = "scale(1)";
        music_Img.style.filter = "invert(88%)";
        IsPlay = true;
    },
    off: () => {
        Music.pause();
        music_Img.src = "./doc/music-off.png";
        music_Img.style.animation = "";
        music_Div.style.transform = "scale(.75)";
        music_Img.style.filter = "invert(66%)";
        IsPlay = false;
    },
    toggle: () => {
        if (IsPlay) { musicFun.off(); } else { musicFun.on(); }
    }
}