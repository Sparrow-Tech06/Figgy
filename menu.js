// menu.js (ROOT)

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Read game data from URL ----------
  const params = new URLSearchParams(window.location.search);

  const gameKey   = params.get("game") || "default";
  const gameTitle = params.get("title") || "Game";
  const subtitle  = params.get("subtitle") || "Have Fun";

  // ---------- Inject Overlay Menu ----------
  const menuHTML = `
    <div id="gameMenuOverlay">
      <div class="menu-box">
        <h4>${gameTitle}</h4>
        <p>${subtitle}</p>

        <div class="timer" id="gameTimer">00:00</div>

        <div class="menu-actions">
          <button id="soundToggle">🔊 Sound</button>
          <button onclick="goHome()">🏠 Home</button>
          <button onclick="restartGame()">🔄 Restart</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", menuHTML);

  // ---------- Styles ----------
  const style = document.createElement("style");
  style.innerHTML = `
    #gameMenuOverlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.6);
      display:none;
      justify-content:center;
      align-items:center;
      z-index:9999;
    }
    .menu-box{
      background:#fff;
      padding:20px;
      border-radius:12px;
      width:85%;
      max-width:320px;
      text-align:center;
    }
    .timer{
      font-size:24px;
      margin:10px 0;
    }
    .menu-actions button{
      margin:5px;
      padding:8px 12px;
    }
  `;
  document.head.appendChild(style);

  // ---------- Howler Sound ----------
  const clickSound = new Howl({
    src: [`../assets/sound/${gameKey}.mp3`],
    volume: 1
  });

  let soundOn = true;

  document.getElementById("soundToggle").onclick = () => {
    soundOn = !soundOn;
    clickSound.mute(!soundOn);
    document.getElementById("soundToggle").innerText =
      soundOn ? "🔊 Sound" : "🔇 Muted";
  };

  // ---------- Timer ----------
  let sec = 0;
  setInterval(() => {
    sec++;
    document.getElementById("gameTimer").innerText =
      String(Math.floor(sec/60)).padStart(2,"0") + ":" +
      String(sec%60).padStart(2,"0");
  }, 1000);

  // ---------- Global functions ----------
  window.openMenu = () => {
    document.getElementById("gameMenuOverlay").style.display = "flex";
  };

  window.goHome = () => {
    location.href = "../index.html";
  };

  window.restartGame = () => {
    location.reload();
  };
});
