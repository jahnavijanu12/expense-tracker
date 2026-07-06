# Expense Tracker

A simple, responsive expense tracker built with vanilla HTML, CSS, and JavaScript. 
Add income and expense transactions, track your balance in real time, and keep your data saved between visits using the browser's localStorage.

## Live Demo
[Add your GitHub Pages link here once enabled]

## Features
- Add transactions with a description, amount, and date
- Automatically calculates and displays total balance, income, and expense
- Color-coded transaction list (green for income, red for expense)
- Delete transactions with a confirmation prompt to prevent accidental removal
- Input validation (rejects empty fields and non-numeric or zero amounts)
- Data persists across page refreshes using localStorage
- Clean, responsive UI with a glassmorphism design

## Built With
- HTML5
- CSS3
- JavaScript (ES6, no frameworks or libraries)

## How It Works
- Each transaction is stored as an object (`{ id, text, amount, date }`) inside an array
- The array is saved to `localStorage` on every change, so data isn't lost on refresh
- Balance, income, and expense totals are recalculated using `map`, `filter`, and `reduce` every time a transaction is added or removed
- The form uses `event.preventDefault()` to stop the page from reloading on submit, then validates input before creating a new transaction

## Getting Started
1. Clone this repository
   ```bash
   git clone https://github.com/jahnavijanu12/expense-tracker.git
   ```
2. Open `index.html` in your browser — no build steps or dependencies required

## Future Improvements
- Edit existing transactions
- Filter by category or date range
- Export transaction history to CSV

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
