let balance = 1000;
let transactions = [];
let totalDeposits = 0;
let totalWithdrawals = 0;

// Module switching
function showModule(module) {
  document.querySelectorAll('.module').forEach(m => m.style.display = 'none');
  document.getElementById(module + 'Module').style.display = 'block';
  if (module === 'history') renderHistory();
  if (module === 'deposit') renderDepositStats();
  if (module === 'withdraw') renderWithdrawStats();
}

// Home actions
function updateBalance() {
  document.getElementById('balance').textContent = balance.toFixed(2);
}

function showMessage(id, msg, color = 'green') {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = color;
  setTimeout(() => { el.textContent = ''; }, 2000);
}

// Deposit
function deposit() {
  let amount = parseFloat(document.getElementById('depositAmount')?.value || document.getElementById('amount').value);
  let method = document.getElementById('depositMethod')?.value || 'cash';
  if (isNaN(amount) || amount <= 0) {
    showMessage('depositMessage', 'Enter a valid amount!', 'red');
    return;
  }
  balance += amount;
  totalDeposits += amount;
  transactions.push({ type: 'Deposit', amount, method, date: new Date() });
  updateBalance();
  showMessage('depositMessage', `Deposited $${amount} via ${method}`);
  renderDepositStats();
  renderHistory();
}

function renderDepositStats() {
  let last = transactions.filter(t => t.type === 'Deposit').slice(-1)[0];
  let stats = `Total Deposited: $${totalDeposits.toFixed(2)}<br>`;
  stats += last ? `Last Deposit: $${last.amount} (${last.method})` : 'No deposits yet.';
  document.getElementById('depositMessage').innerHTML = stats;
}

// Withdraw
function withdraw() {
  let amount = parseFloat(document.getElementById('withdrawAmount')?.value || document.getElementById('amount').value);
  let method = document.getElementById('withdrawMethod')?.value || 'atm';
  if (isNaN(amount) || amount <= 0) {
    showMessage('withdrawMessage', 'Enter a valid amount!', 'red');
    return;
  }
  if (amount > balance) {
    showMessage('withdrawMessage', 'Insufficient funds!', 'red');
    return;
  }
  balance -= amount;
  totalWithdrawals += amount;
  transactions.push({ type: 'Withdraw', amount, method, date: new Date() });
  updateBalance();
  showMessage('withdrawMessage', `Withdrew $${amount} via ${method}`, 'red');
  renderWithdrawStats();
  renderHistory();
}

function renderWithdrawStats() {
  let last = transactions.filter(t => t.type === 'Withdraw').slice(-1)[0];
  let stats = `Total Withdrawn: $${totalWithdrawals.toFixed(2)}<br>`;
  stats += last ? `Last Withdrawal: $${last.amount} (${last.method})` : 'No withdrawals yet.';
  document.getElementById('withdrawMessage').innerHTML = stats;
}

// History
function renderHistory() {
  const ul = document.getElementById('fullHistoryList');
  ul.innerHTML = '';
  transactions.slice().reverse().forEach(t => {
    const li = document.createElement('li');
    li.className = `transaction ${t.type.toLowerCase()}`;
    li.innerHTML = `<span>${t.type}</span>
      <span>$${t.amount}</span>
      <span>${t.method}</span>
      <span>${t.date.toLocaleString()}</span>`;
    ul.appendChild(li);
  });
}

function clearHistory() {
  transactions = [];
  totalDeposits = 0;
  totalWithdrawals = 0;
  renderHistory();
  renderDepositStats();
  renderWithdrawStats();
}

// Settings
function setInitialBalance() {
  let val = parseFloat(document.getElementById('initialBalance').value);
  if (isNaN(val) || val < 0) {
    showMessage('settingsMessage', 'Enter a valid initial balance!', 'red');
    return;
  }
  balance = val;
  updateBalance();
  showMessage('settingsMessage', `Initial balance set to $${val}`);
}

function resetBalance() {
  balance = 1000;
  updateBalance();
  showMessage('settingsMessage', 'Balance reset to $1000');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark-mode'));
}

// Initial setup
updateBalance();
renderDepositStats();
renderWithdrawStats();
renderHistory();