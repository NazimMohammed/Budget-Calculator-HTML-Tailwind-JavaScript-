//register-function
function registerBC() {
    const userID = document.getElementById('UserID').value
    const username = document.getElementById('username').value
    const password = document.getElementById('loginPass').value


    if (!username || !userID || !password) {
        alert("Please all the Details📝👆")
        return
    }
    if (userID in localStorage) {
        alert("Account Number already exists")
        return
    }
    const user = {
        uname: username,
        uid: userID,
        upass: password,

        incomeSummary: {},
        expSummary: {},

        incomelog: [],
        expllog: []
    }
    localStorage.setItem(userID, JSON.stringify(user))
    window.location.href = "./login.html"
}

//login-function
function loginBC() {
    //key -userID
    const userID = document.getElementById("logUserID").value
    const password = document.getElementById("loginPass").value

    if (!userID || !password) {
        alert("fill all the blanks")
    }

    if (!(userID in localStorage)) {
        alert("account not found")
    }

    const userOBJ = JSON.parse(localStorage.getItem(userID))

    if (userOBJ.upass !== password) {
        alert("incorrect password")
    }

    localStorage.setItem("loggedUser", userID)
    window.location.href = "./home.html"
}

//function-logout
function logOut() {
    localStorage.removeItem("loggedUser")
    window.location.href = "./login.html"
}


//function-deposit
function addIncome() {
    const incomeType = document.getElementById('incomeType').value.trim()
    const incomeAmount = document.getElementById('incomeAmount').value.trim()
    const loggedUserID = localStorage.getItem('loggedUser')
    const time = new Date().toLocaleString();

    if (!incomeType || !incomeAmount) {
        alert("Enter all the Details")
        return
    }

    if (incomeAmount <= 0) {
        alert("Please enter a valid value")
        return
    }

    const userObj = JSON.parse(localStorage.getItem(loggedUserID))

    // save history
    userObj.incomelog.push({ type: incomeType, amount: incomeAmount, time: time });

    if (incomeType in userObj.incomeSummary) {

        userObj.incomeSummary[incomeType] += Number(incomeAmount)
    }
    else {
        userObj.incomeSummary[incomeType] = Number(incomeAmount)
    }

    // save back to localStorage
    localStorage.setItem(loggedUserID, JSON.stringify(userObj))

    //display updated total income
    const totalIncome = Object.values(userObj.incomeSummary).reduce((sum, b) => sum + Number(b), 0)
    document.getElementById('incomeArea').innerHTML = `$${totalIncome}`

    // display balance
    const totalExpense = Object.values(userObj.expSummary).reduce((sum, e) => sum + Number(e), 0)
    const balance = totalIncome - totalExpense


    // displaybalance
    if (balance > 0) {
        document.getElementById('balance').innerHTML = ` $${balance}`
    }
    else {
        document.getElementById('balance').innerHTML = `$ ${balance}`

    }

    renderIncomeTable()



    // clear inputs
    document.getElementById('incomeAmount').value = ``
    document.getElementById('incomeType').value = ``
}

//Add-Expense
function addExpense() {
    const expenseType = document.getElementById("expenseType").value.trim()
    const expenseAmount = document.getElementById("expenseAmount").value.trim()
    const loggedUserID = localStorage.getItem('loggedUser')
    const time = new Date().toLocaleString();

    if (!expenseAmount || !expenseType) {
        alert('Enter all the details')
        return
    }
    if (expenseAmount < 0) {
        alert("Enter a valid amount")
        return
    }

    const userObj = JSON.parse(localStorage.getItem(loggedUserID))

    userObj.expllog.push({ type: expenseType, amount: expenseAmount, time: time });

    if (expenseType in userObj.expSummary) {

        userObj.expSummary[expenseType] += Number(expenseAmount)
    }
    else {
        userObj.expSummary[expenseType] = Number(expenseAmount)
    }

    localStorage.setItem(loggedUserID, JSON.stringify(userObj))

    //display updated total income
    const totalIncome = Object.values(userObj.incomeSummary).reduce((sum, b) => sum + Number(b), 0)
    document.getElementById('incomeArea').innerHTML = `$${totalIncome}`


    //expense
    const totalExpense = Object.values(userObj.expSummary || {}).reduce(
      (sum, e) => sum + Number(e),
      0,
    );
    document.getElementById("totalexp").innerHTML = `$${totalExpense}`
    
    const balance = totalIncome - totalExpense

    if (balance > 0) {
        document.getElementById('balance').innerHTML = `$${balance}`
    }
    else {
        document.getElementById('balance').innerHTML = `$${balance}`

    }


    
        // clear inputs
        document.getElementById('expenseAmount').value = ``
        document.getElementById('expenseType').value = ``
    renderExpenseTable()
    renderExpenseSummaryTable()


}

function renderIncomeTable() {
    const tbody = document.getElementById('incomeTable')
    const loggedUserID = localStorage.getItem("loggedUser")
    const userObj = JSON.parse(localStorage.getItem(loggedUserID))


    tbody.innerHTML = ''

    for (let i of userObj.incomelog) {
        tbody.innerHTML += `
        <tr>
              <td class="pb-2">${i.type}</td>
              <td class="pb-2 text-zinc-500">${i.time}</td>
              <td class="pb-2 text-right text-lime-500"> +${i.amount}</td>
            </tr>`

    }

}

function renderExpenseTable() {
    const tbody = document.getElementById('expenseTable')
    const loggedUserID = localStorage.getItem("loggedUser")
    const userObj = JSON.parse(localStorage.getItem(loggedUserID))


    tbody.innerHTML = ''

    for (let i of userObj.expllog) {
        tbody.innerHTML += `
        <tr>
              <td class="pb-2">${i.type}</td>
              <td class="pb-2 text-zinc-500">${i.time}</td>
              <td class="pb-2 text-right text-red-500"> - ${i.amount}</td>
            </tr>`

    }

}

function logout() {
    // 1. Remove the logged-in user key from LocalStorage
    localStorage.removeItem("loggedUser");

    // 2. Redirect to the login/index page
    window.location.href = "./index.html"; 
}