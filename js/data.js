
const developers = [
    { name: "Alex Morgan", age: 22, city: "Cairo", skill: "JavaScript" },
    { name: "Maya Hassan", age: 20, city: "Alexandria", skill: "HTML & CSS" },
    { name: "Omar Khaled", age: 25, city: "Giza", skill: "Python" },
    { name: "Lina Samir", age: 19, city: "Cairo", skill: "Flutter" },
    { name: "Adam Nabil", age: 23, city: "Mansoura", skill: "Java" },
    { name: "Nour Adel", age: 21, city: "Alexandria", skill: "React" },
    { name: "Youssef Tarek", age: 24, city: "Cairo", skill: "SQL" },
    { name: "Salma Fathy", age: 22, city: "Giza", skill: "Python" }
];

const tableBody = document.getElementById("developer-table-body");
const searchInput = document.getElementById("search-input");
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");

const sortNameButton = document.getElementById("sort-name");
const sortAgeButton = document.getElementById("sort-age");

let currentSort = "name";
let ascending = true;

function renderTable() {
    const query = searchInput.value.trim().toLowerCase();

    // Filter records using the search text.
    const filteredDevelopers = developers.filter(function(person) {
        const searchableText =
            `${person.name} ${person.age} ${person.city} ${person.skill}`
                .toLowerCase();

        return searchableText.includes(query);
    });

    // Sort the filtered records.
    filteredDevelopers.sort(function(a, b) {
        let comparison;

        if (currentSort === "age") {
            comparison = a.age - b.age;
        } else {
            comparison = a.name.localeCompare(b.name);
        }

        return ascending ? comparison : -comparison;
    });

    // Clear the old table rows.
    tableBody.replaceChildren();

    // Create a new row for each developer.
    filteredDevelopers.forEach(function(person) {
        const row = document.createElement("tr");

        const values = [
            person.name,
            person.age,
            person.city,
            person.skill
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    resultCount.textContent =
        `Showing ${filteredDevelopers.length} of ${developers.length} developers`;

    emptyState.hidden = filteredDevelopers.length > 0;
}

// Search automatically while typing.
searchInput.addEventListener("input", renderTable);

// Sort by name.
sortNameButton.addEventListener("click", function() {
    if (currentSort === "name") {
        ascending = !ascending;
    } else {
        currentSort = "name";
        ascending = true;
    }

    sortNameButton.textContent =
        `Sort by Name ${ascending ? "↑" : "↓"}`;

    sortAgeButton.textContent = "Sort by Age ↕";

    renderTable();
});

// Sort by age.
sortAgeButton.addEventListener("click", function() {
    if (currentSort === "age") {
        ascending = !ascending;
    } else {
        currentSort = "age";
        ascending = true;
    }

    sortAgeButton.textContent =
        `Sort by Age ${ascending ? "↑" : "↓"}`;

    sortNameButton.textContent = "Sort by Name ↕";

    renderTable();
});

// Display the initial data.
renderTable();
