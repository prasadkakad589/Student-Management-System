let originalData = [...students];
let currentData = [...students];

const tableBody = document.querySelector("#table tbody");

function renderTable(data) {
    document.getElementById("table").style.display = "table";
    document.getElementById("genderTables").innerHTML = "";

    tableBody.innerHTML = "";

    data.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td class="name-cell">
                <img src="${student.img_src}" />
                ${student.first_name} ${student.last_name}
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "passing" : "failed"}</td>
            <td>${student.email}</td>
        `;

        tableBody.appendChild(row);
    });
}
renderTable(currentData);

document.getElementById("search").addEventListener("input", handleSearch);

function handleSearch() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = originalData.filter(s => {
        const fullName = (s.first_name + " " + s.last_name).toLowerCase();

        return (
            fullName.includes(value) ||
            s.email.toLowerCase().includes(value)
        );
    });

    renderTable(filtered);
}

function sortAZ() {
    currentData.sort((a, b) =>
        (a.first_name + " " + a.last_name)
        .localeCompare(b.first_name + " " + b.last_name)
    );
    renderTable(currentData);
}

function sortZA() {
    currentData.sort((a, b) =>
        (b.first_name + " " + b.last_name)
        .localeCompare(a.first_name + " " + a.last_name)
    );
    renderTable(currentData);
}

function sortMarks() {
    currentData.sort((a, b) => a.marks - b.marks);
    renderTable(currentData);
}

function filterPassing() {
    const passing = originalData.filter(s => s.passing);
    renderTable(passing);
}

function sortClass() {
    currentData.sort((a, b) => a.class - b.class);
    renderTable(currentData);
}

function sortGender() {
    document.getElementById("table").style.display = "none";

    const males = originalData.filter(s => s.gender === "Male");
    const females = originalData.filter(s => s.gender === "Female");

    const container = document.getElementById("genderTables");

    container.innerHTML = `
        <h2>Female Students</h2>
        ${generateTable(females)}
        <h2>Male Students</h2>
        ${generateTable(males)}
    `;
}

function generateTable(data) {
    let rows = data.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.first_name} ${s.last_name}</td>
            <td>${s.gender}</td>
            <td>${s.class}</td>
            <td>${s.marks}</td>
            <td>${s.passing ? "passing" : "failed"}</td>
            <td>${s.email}</td>
        </tr>
    `).join("");

    return `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function reset() {
    currentData = [...originalData];
    document.getElementById("search").value = "";
    renderTable(currentData);
}