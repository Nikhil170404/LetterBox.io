document.addEventListener("DOMContentLoaded", function() {
    // Sample data for government work
    var governmentWorkData = [
        { title: "Road Construction Project", description: "Constructing new roads in rural areas", details: "Expected completion: 2026. Length of Roads: 500 km." },
        { title: "Education Reforms", description: "Upgrading school infrastructure and curriculum", details: "Initiative to include digital learning platforms. Budget Allocation: ₹2,000,000" },
        { title: "Clean Energy Initiative", description: "Promoting renewable energy sources", details: "Targeting 20% renewable energy by 2030. Solar Panels Installation in Public Buildings." },
        { title: "Public Transportation Expansion", description: "Improving bus and metro services", details: "Introducing new bus routes and metro lines. Expected ridership increase: 30%." },
        { title: "Water Conservation Program", description: "Implementing measures to conserve water resources", details: "Community awareness campaigns and rainwater harvesting. 50% reduction in water usage targeted." },
        { title: "Rural Employment Scheme", description: "Creating jobs in rural areas", details: "Skill training and entrepreneurship programs. Targeted employment: 10,000 people." },
        { title: "Healthcare Accessibility Project", description: "Enhancing healthcare facilities in remote areas", details: "Building new hospitals and mobile clinics. Access to healthcare services within 10 km radius." },
        { title: "Smart City Development", description: "Implementing smart solutions for urban development", details: "Focus on IoT, smart grids, and efficient waste management. Reduction of carbon footprint by 20%." },
        { title: "Agricultural Modernization", description: "Promoting modern farming techniques", details: "Subsidies for equipment and training programs. Increase in crop yield targeted: 30%." },
        { title: "Skill Development Program", description: "Providing training for youth to acquire new skills", details: "Collaboration with industries for job placements. 80% job placement rate targeted." }
    ];

    // Sample data for budget details in INR
    var budgetData = {
        totalBudget: "₹10,000,000",
        allocation: {
            infrastructure: "₹3,000,000",
            education: "₹2,000,000",
            energy: "₹1,500,000",
            transportation: "₹800,000",
            water: "₹700,000",
            employment: "₹600,000",
            healthcare: "₹1,200,000",
            urban: "₹900,000",
            agriculture: "₹1,100,000",
            skillDevelopment: "₹1,000,000"
        }
    };

    // Display government work
    var workList = document.getElementById("work-list");
    governmentWorkData.forEach(function(work) {
        var workItem = document.createElement("div");
        workItem.classList.add("work-item");
        workItem.innerHTML = "<h3>" + work.title + "</h3><p>" + work.description + "</p><button class='show-details'>Show Details</button><div class='details'>" + work.details + "</div>";
        workList.appendChild(workItem);
    });

    // Display budget details
    var budgetDetails = document.getElementById("budget-details");
    budgetDetails.innerHTML = "<p>Total Budget: " + budgetData.totalBudget + "</p>";
    budgetDetails.innerHTML += "<h4>Budget Allocation</h4>";
    for (var category in budgetData.allocation) {
        budgetDetails.innerHTML += "<div class='budget-item'><h4>" + category + "</h4><p>" + budgetData.allocation[category] + "</p><button class='show-details'>Show Details</button><div class='details'>" + budgetData.allocation[category] + "</div></div>";
    }

    // Event listener for show/hide details buttons
    var showDetailsButtons = document.querySelectorAll('.show-details');
    showDetailsButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var details = this.nextElementSibling;
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Show Details';
            } else {
                details.style.display = 'block';
                this.textContent = 'Hide Details';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Introduction Animation
    var introSection = document.getElementById('introduction');
    var introContent = document.querySelector('.intro-content');
    var sectionHeadings = document.querySelectorAll('.section-heading');

    introSection.style.opacity = '1';
    introSection.style.transform = 'translateY(0)';
    introContent.style.opacity = '1';

    setTimeout(function() {
        sectionHeadings.forEach(function(heading) {
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
        });
    }, 500);

    var workList = document.getElementById('work-list');
    var budgetDetails = document.getElementById('budget-details');

    workList.style.opacity = '1';
    workList.style.transform = 'translateY(0)';
    budgetDetails.style.opacity = '1';
    budgetDetails.style.transform = 'translateY(0)';
});
