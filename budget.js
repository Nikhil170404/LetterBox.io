const csvFilePath = '/unionbudget.csv'; // Adjust the path as needed

async function readBudgetData() {
    try {
        const response = await fetch(csvFilePath);
        const text = await response.text();
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        const data = [];
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');
            if (cells.length === headers.length) {
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    row[headers[j]] = cells[j];
                }
                data.push(row);
            }
        }
        return data;
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        throw error;
    }
}

async function renderBudgetTable() {
    const budgetTable = document.getElementById('budgetTable');
    try {
        const data = await readBudgetData();
        const shuffledData = shuffleArray(data); // Shuffle the entire dataset
        budgetTable.innerHTML = ''; // Clear previous content
        shuffledData.forEach((ministry) => {
            const card = document.createElement('div');
            card.className = 'card';
            const title = document.createElement('h3');
            title.textContent = ministry['Ministries/Departments'];
            card.appendChild(title);
            const details = document.createElement('div');
            const keys = Object.keys(ministry);
            keys.forEach((key) => {
                const strong = document.createElement('strong');
                strong.textContent = `${key}: `;
                const span = document.createElement('span');
                // Append "Cr" to numeric values representing money
                const value = isNaN(ministry[key]) ? ministry[key] : ministry[key] + ' Cr';
                span.textContent = value;
                details.appendChild(strong);
                details.appendChild(span);
                details.appendChild(document.createElement('br'));
            });
            card.appendChild(details);
            budgetTable.appendChild(card);
        });
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error fetching or parsing CSV: ' + error.message;
        budgetTable.appendChild(errorMessage);
    }
}


function searchMinistry() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        // Split the title into individual words and check if any word matches the input
        const words = title.split(' ');
        const found = words.some((word) => word.includes(input));
        if (found) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

async function init() {
    await renderBudgetTable();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

init();
