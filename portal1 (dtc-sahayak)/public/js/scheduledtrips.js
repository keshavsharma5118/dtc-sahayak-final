const tableBody = document.querySelector('.schedule-table tbody');

function addEmptyRow() {
    const row = document.createElement('tr');

    for (let i = 0; i < 8; i++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }

    const editCell = document.createElement('td');
    const submitCell = document.createElement('td');
    editCell.innerHTML = '<button class="btn btn-edit">Edit</button>';
    submitCell.innerHTML = '<button class="btn btn-submit">Submit</button>';
    
    row.appendChild(editCell);
    row.appendChild(submitCell);

    tableBody.appendChild(row);
}

// Example: Add 3 empty rows
for (let i = 0; i < 3; i++) {
    addEmptyRow();
}
