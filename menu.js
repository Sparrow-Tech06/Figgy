// menu.js (ROOT)
document.addEventListener("DOMContentLoaded", () => {

  // ---------- URL Data ----------
  const params = new URLSearchParams(location.search);
  const gameKey = params.get("game") || "default";
  const title = params.get("title") || "Game";
  const subtitle = params.get("subtitle") || "";

  // ---------- Inject Menu ----------
  document.body.insertAdjacentHTML("beforeend", `
    <div id="menuOverlay">
      <div class="menuBox">
        <h3>${title}</h3>
        <p>${subtitle}</p>
        <div id="timer">00:00</div>

        <button onclick="toggleSound()" id="soundBtn">🔊 Sound</button>
        <button onclick="restartGame()">🔄 Restart</button>
        <button onclick="goHome()">🏠 Home</button>
      </div>
    </div>

    <button id="menuBtn" onclick="openMenu()">☰</button>
  `);

  // ---------- Style ----------
  const style = document.createElement("style");
  style.innerHTML = `
    #menuBtn{
      position:fixed;
      top:10px;
      right:10px;
      z-index:999;
      padding:8px 12px;
    }
    #menuOverlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.6);
      display:none;
      align-items:center;
      justify-content:center;
      z-index:1000;
    }
    .menuBox{
      background:#fff;
      padding:20px;
      border-radius:12px;
      text-align:center;
      width:85%;
      max-width:300px;
    }
    #timer{
      font-size:24px;
      margin:10px 0;
    }
  `;
  document.head.appendChild(style);

  // ---------- Howler ----------
  window.gameSound = new Howl({
    src:[`../assets/sound/${gameKey}.mp3`],
    volume:1
  });

  let soundOn = true;

  window.toggleSound = () => {
    soundOn = !soundOn;
    gameSound.mute(!soundOn);
    document.getElementById("soundBtn").innerText =
      soundOn ? "🔊 Sound" : "🔇 Muted";
  };

  // ---------- Timer ----------
  let sec = 0;
  setInterval(()=>{
    sec++;
    timer.innerText =
      String(Math.floor(sec/60)).padStart(2,"0") + ":" +
      String(sec%60).padStart(2,"0");
  },1000);

  // ---------- Global ----------
  window.openMenu = () => menuOverlay.style.display="flex";
  window.goHome = () => location.href="../index.html";
  window.restartGame = () => location.reload();

});
