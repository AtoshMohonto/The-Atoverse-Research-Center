let balance = 1000;
const balanceEl = document.getElementById('balance');
const amountEl = document.getElementById('amount');
const messageEl = document.getElementById('message');

function deposit() {
  const amount = parseFloat(amountEl.value);
  if (amount > 0) {
    balance += amount;
    updateUI(`Deposited $${amount}`);
  } else {
    showError('Enter a valid amount');
  }
}

function withdraw() {
  const amount = parseFloat(amountEl.value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateUI(`Withdrew $${amount}`);
  } else {
    showError('Insufficient balance or invalid amount');
  }
}

function updateUI(msg) {
  balanceEl.textContent = balance.toFixed(2);
  messageEl.textContent = msg;
  messageEl.style.color = 'green';
  amountEl.value = '';
}

function showError(msg) {
  messageEl.textContent = msg;
  messageEl.style.color = 'red';
}