const lyrics = [
    { time: 0, text: "Güneş her gün doğar... ✨" },
    { time: 8, text: "Güneşi gülüşüne nasıl sığdırdın?" },
    { time: 16, text: "Döndürür kalbimi çöle..." },
    { time: 20, text: "Gözünden akan yağmurlar..." },
    { time: 24, text: "Döndürür çölleri sele..." },
    { time: 27, text: "Saçında kopan fırtınalar..." },
    { time: 30, text: "Eserken ruhumda hâlâ..." },
    { time: 34, text: "Dediler: 'Bu kız neymiş?'" },
    { time: 37, text: "Dedim: 'Felaket, felaket!'" },
    { time: 42, text: "Günaydın Felaketim... ✨🌼" }
];

// Yıldızları Oluştur
const starsContainer = document.getElementById('stars-container');
for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 3 + 1 + 'px';
    s.style.width = size; s.style.height = size;
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = Math.random() * 2 + 's';
    starsContainer.appendChild(s);
}

// Dağınık Bulutları Oluştur
const cloudsContainer = document.getElementById('clouds-container');
for (let i = 0; i < 8; i++) {
    const c = document.createElement('div');
    c.className = 'cloud';
    c.style.width = Math.random() * 100 + 80 + 'px';
    c.style.height = Math.random() * 20 + 30 + 'px';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = Math.random() * 80 + 'vh';
    cloudsContainer.appendChild(c);
}

// YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1', width: '1', videoId: '-x5LnDSctk0',
        playerVars: { 'autoplay': 0, 'controls': 0, 'enablejsapi': 1 },
        events: { 'onStateChange': onPlayerStateChange }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(() => {
            const time = player.getCurrentTime();
            const activeLyric = lyrics.find((l, i) => time >= l.time && (!lyrics[i+1] || time < lyrics[i+1].time));
            if (activeLyric) document.getElementById('karaoke-text').innerText = activeLyric.text;
        }, 500);
    }
}

function baslat() {
    document.getElementById('giris-ekrani').style.display = 'none';
    document.body.style.background = "var(--gok-mavisi)";
    document.getElementById('sun').classList.add('rise');
    
    // GÜNDÜZ OLUNCA YILDIZLARI SİL
    const allStars = document.querySelectorAll('.star');
    allStars.forEach(s => {
        s.style.opacity = "0";
        setTimeout(() => s.remove(), 2000); // 2 saniye sonra koddandan siler
    });

    // BULUTLARI GETİR
    document.querySelectorAll('.cloud').forEach(c => c.style.opacity = "1");

    const ana = document.getElementById('ana-icerik');
    ana.style.display = 'block';
    setTimeout(() => ana.style.opacity = "1", 100);
    if (player) player.playVideo();
}
