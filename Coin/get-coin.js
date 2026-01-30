function getCoin(amount = 0){
  let wallet = parseInt(localStorage.getItem("myCoins")) || 0;
  wallet += amount;
  localStorage.setItem("myCoins", wallet);
}
