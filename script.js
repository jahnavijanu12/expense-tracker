const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const date = document.getElementById("date");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransactionDOM(transaction) {
    const item = document.createElement("li");
    if (transaction.amount < 0) {
        item.classList.add("minus");
    } else {
        item.classList.add("plus");
    }
    const sign = transaction.amount < 0 ? "-" : "+";
    item.innerHTML = `
        <span>${transaction.text} <br><small>${transaction.date || "No date"}</small></span>
        <span>
            ${sign}₹${Math.abs(transaction.amount)}
            <button
                class="delete"
                onclick="removeTransaction(${transaction.id})">
                X
            </button>
        </span>
    `;
    transactionList.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(function (transaction) {
        return transaction.amount;
    });
    const total = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    const totalIncome = amounts
        .filter(function (value) {
            return value > 0;
        })
        .reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
    const totalExpense = amounts
        .filter(function (value) {
            return value < 0;
        })
        .reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerText = `₹${totalIncome.toFixed(2)}`;
    expense.innerText = `₹${Math.abs(totalExpense).toFixed(2)}`;
}

function init() {
    transactionList.innerHTML = "";
    transactions.forEach(function (transaction) {
        addTransactionDOM(transaction);
    });
    updateValues();
}
init();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
        text.value.trim() === "" ||
        amount.value.trim() === "" || date.value.trim() === ""
    ) {
        alert("Please enter description, amount, and date.");
        return;
    }
    if(isNaN(Number(amount.value)) || Number(amount.value) === 0){
        alert("Please enter a valid,non-xero number for amount.");
        return;
    }
    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: Number(amount.value),
        date: date.value
    };
    transactions.push(transaction);
    updateLocalStorage();
    init();
    text.value = "";
    amount.value = "";
    date.value = "";
});

function removeTransaction(id) {
    const confirmDelete = confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) {
        return;
    }
    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });
    updateLocalStorage();
    init();
}