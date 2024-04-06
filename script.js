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
        const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
        const filteredData = data.filter(ministry => ministry['Ministries/Departments'].toLowerCase().includes(searchInput));

        // Shuffle the data randomly
        const shuffledData = shuffleArray(filteredData);

        budgetTable.innerHTML = ''; // Clear previous content

        // Display only the first 10 random budgets
        shuffledData.slice(0, 10).forEach((ministry) => {
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
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.className = 'button';
        showMoreButton.addEventListener('click', () => {
            window.location.href = 'budget.html';
        });
        budgetTable.appendChild(showMoreButton);
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent =
            'Error fetching or parsing CSV: ' + error.message;
        budgetTable.appendChild(errorMessage);
    }
}


// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

renderBudgetTable();

function searchMinistry() {
    renderBudgetTable();
}

// Get the navbar element
const navbar = document.querySelector('.navbar');

// Listen for scroll events
window.addEventListener('scroll', () => {
    // Check if the user has scrolled past a certain threshold (e.g., 50px)
    if (window.scrollY > 50) {
        // If scrolled down, add a class to hide the navbar
        navbar.classList.add('hidden');
    } else {
        // If at the top, remove the class to show the navbar
        navbar.classList.remove('hidden');
    }
});
 // JavaScript function to handle navbar link clicks
function handleNavLinkClick(event) {
    // Remove the "active" class from all navbar links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add the "active" class to the clicked link
    event.target.classList.add('active');
}
// Add event listeners to navbar links
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
});
