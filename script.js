document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        addExpense(expenseName, expenseAmount);
        updateTotal();
        document.getElementById("expense-name").value = '';
        document.getElementById("expense-amount").value = '';
    } else {
        alert("Please enter a valid expense name and amount.");
    }
});

let expenses = [];

function addExpense(name, amount) {
    const expense = { name, amount };
    expenses.push(expense);

    const expenseList = document.getElementById("expense-list");
    const li = document.createElement("li");
    li.innerHTML = `${name}: $${amount.toFixed(2)} <button onclick="removeExpense(${expenses.length - 1})">Remove</button>`;
    expenseList.appendChild(li);
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotal();
}

function updateExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.name}: $${expense.amount.toFixed(2)} <button onclick="removeExpense(${index})">Remove</button>`;
        expenseList.appendChild(li);
    });
}

function updateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById("total-amount").textContent = `$${totalAmount.toFixed(2)}`;
}
