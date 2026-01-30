function getCoin(amount = 0){
  let coins = parseInt(localStorage.getItem("myCoins")) || 0;
  coins += amount;
  localStorage.setItem("myCoins", coins);
}
