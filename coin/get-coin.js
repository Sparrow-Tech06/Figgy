function getCoin(amount = 0, source = "Unknown") {

  // total coins
  let coins = parseInt(localStorage.getItem("myCoins")) || 0;
  coins += amount;
  localStorage.setItem("myCoins", coins);

  // history
  let history = JSON.parse(localStorage.getItem("coinHistory")) || [];

  history.unshift({
    amount: amount,
    source: source,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("coinHistory", JSON.stringify(history));

  // 👉 Android Toast callback
  if (window.Android && typeof Android.showToast === "function") {
    Android.showToast("Coin added successfully");
  }
}
