// menu.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const gameKey = params.get("game") || "default";
  const title   = params.get("title") || "Game";
  const subtitle= params.get("subtitle") || "";

  // Inject menu overlay
  const html = `
  <div id="menuOverlay">
    <div class="menuBox">
      <h1>${title}</h1>
      <p>${subtitle}</p>

      <div class="opt">
        <span>⏱ Enable Timer</span>
        <input type="checkbox" id="mTimer" checked>
      </div>

      <div class="opt">
        <span>🔊 Sound</span>
        <input type="checkbox" id="mSound" checked>
      </div>

      <button id="mStart">Start Game</button>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);

  // CSS
  const css = document.createElement("style");
  css.innerHTML = `
    #menuOverlay{
      position:fixed;
      inset:0;
      background: #fff;
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:9999;
      animation:fade .3s ease;
    }
    .menuBox{
      background:#fff;
      width:90%;
      max-width:320px;
      padding:20px;
      border-radius:14px;
      text-align:center;
    }
    .opt{
      display:flex;
      justify-content:space-between;
      align-items:center;
      border:1px solid #e6e8ef;
      padding:10px;
      border-radius:12px;
      margin:10px 0;
    }
    #mStart{
      margin-top:14px;
      padding:14px;
      width:100%;
      border:none;
      background:#4f46e5;
      color:#fff;
      border-radius:12px;
      font-weight:600;
    }
    @keyframes fade{
      from{opacity:0;transform:translateY(10px)}
      to{opacity:1}
    }
  `;
  document.head.appendChild(css);

  // Load previous settings
  const prevTimer = localStorage.getItem('timerOn');
  const prevSound = localStorage.getItem('soundOn');

  const mTimer = document.getElementById("mTimer");
  const mSound = document.getElementById("mSound");

  if(prevTimer !== null) mTimer.checked = prevTimer === '1';
  if(prevSound !== null) mSound.checked = prevSound === '1';

  // Sound effect only if checkbox enabled
  let clickSound = null;
  if(mSound.checked){
    clickSound = new Howl({
      src:[`../assets/sound/${gameKey}.mp3`],
      loop:true,
      volume:1
    });
    clickSound.play();
  }

  mSound.addEventListener("change",()=>{
    if(clickSound){
      clickSound.stop();
      clickSound = null;
    }
    if(mSound.checked){
      clickSound = new Howl({
        src:[`../assets/sound/${gameKey}.mp3`],
        loop:true,
        volume:1
      });
      clickSound.play();
    }
  });

  // Start button
  const mStart = document.getElementById("mStart");
  mStart.onclick = ()=>{
    // Save settings
    localStorage.setItem('timerOn', mTimer.checked ? '1':'0');
    localStorage.setItem('soundOn', mSound.checked ? '1':'0');

    // Remove menu
    document.getElementById("menuOverlay").remove();

    // Stop menu music
    if(clickSound) clickSound.stop();
  };
});

