let balance = 1000;
const historyList = document.getElementById('historyList');

function updateBalance() {
  document.getElementById('balance').textContent = balance;
}

function addHistory(type, amount) {
  const li = document.createElement('li');
  li.textContent = `${type}: $${amount}`;
  historyList.appendChild(li);
}

function deposit() {
  const amount = parseFloat(document.getElementById('amount').value);
  if (isNaN(amount) || amount <= 0) {
    showMessage('Enter a valid amount!', 'red');
    return;
  }
  balance += amount;
  updateBalance();
  addHistory('Deposit', amount);
  showMessage(`Deposited $${amount}`, 'green');
}

function withdraw() {
  const amount = parseFloat(document.getElementById('amount').value);
  if (isNaN(amount) || amount <= 0) {
    showMessage('Enter a valid amount!', 'red');
    return;
  }
  if (amount > balance) {
    showMessage('Insufficient funds!', 'red');
    return;
  }
  balance -= amount;
  updateBalance();
  addHistory('Withdraw', amount);
  showMessage(`Withdrew $${amount}`, 'green');
}

function resetBalance() {
  balance = 1000;
  updateBalance();
  showMessage('Balance reset to $1000', 'blue');
  historyList.innerHTML = '';
}

function showMessage(msg, color) {
  const message = document.getElementById('message');
  message.textContent = msg;
  message.style.color = color;
}

function showModule(module) {
  // Example: Only home and history modules for now
  document.getElementById('homeModule').style.display = module === 'home' ? 'block' : 'none';
  document.getElementById('historyModule').style.display = module === 'history' ? 'block' : 'none';
}