const API_URL = "http://127.0.0.1:3000/api/software";


const tableBody = document.getElementById("tableBody");
const form = document.getElementById("softwareForm");

let isEditing = false;
let editingName = "";


function render(items) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const tr = document.createElement("tr");
       tr.innerHTML = `
            <td>${escapeHTML(item.name)}</td>
            <td>${escapeHTML(item.version)}</td>
            <td>${escapeHTML(item.licenseType)}</td>
            <td>${escapeHTML(item.seats)}</td>
            <td>${escapeHTML(item.comment)}</td>
            <td>
                <button class="edit-btn" data-name="${item.name}">Редагувати</button>
                <button class="delete-btn" data-name="${item.name}">Видалити</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}
   function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}


async function loadSoftware() {
    try {
        const res = await fetch(API_URL, { headers: { "X-Demo-UserId": "1" } });
        const data = await res.json();
        render(data);
    } catch (e) { console.error(e); }
}


tableBody.addEventListener("click", (e) => {
    const name = e.target.dataset.name;
    if (e.target.classList.contains("delete-btn")) {
        fetch(`${API_URL}/${encodeURIComponent(name)}`, { method: "DELETE", headers: { "X-Demo-UserId": "1" } })
            .then(() => loadSoftware());
    } else if (e.target.classList.contains("edit-btn")) {
        const row = e.target.closest("tr");
        const cells = row.querySelectorAll("td");
        
        document.getElementById("field1Input").value = cells[0].innerText;
        document.getElementById("field2Input").value = cells[1].innerText;
        document.getElementById("field3Select").value = cells[2].innerText;
        document.getElementById("field4Text").value = cells[3].innerText;
        document.getElementById("field5Text").value = cells[4].innerText;
        
        isEditing = true;
        editingName = name;
       
        form.querySelector("button").textContent = "Зберегти зміни";
    }
});


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dto = {
        name: document.getElementById("field1Input").value,
        version: document.getElementById("field2Input").value,
        licenseType: document.getElementById("field3Select").value,
        seats: Number(document.getElementById("field4Text").value),
        comment: document.getElementById("field5Text").value
    };

    const url = isEditing ? `${API_URL}/${encodeURIComponent(editingName)}` : API_URL;
    const method = isEditing ? "PUT" : "POST";

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json", "X-Demo-UserId": "1" },
        body: JSON.stringify(dto)
    });

    isEditing = false;
    form.querySelector("button").textContent = "Додати";
    form.reset();
    loadSoftware();
});

loadSoftware();