let softwareProducts = []; 

let currentSort = {
    field: "",
    direction: "asc"
};


let editModeName = null; 

const form = document.getElementById("softwareForm");
const formTitle = document.querySelector("h2"); 

const nameInput = document.getElementById("field1Input");
const versionInput = document.getElementById("field2Input");
const licenseSelect = document.getElementById("field3Select");
const seatsInput = document.getElementById("field4Text");
const commentInput = document.getElementById("field5Text");

const tableBody = document.getElementById("tableBody");
const submitBtn = document.querySelector("button[type='submit']");
const noticeEl = document.getElementById("notice");
const statusEl = document.getElementById("listStatus");

const API_URL = "http://localhost:3000/api/software";


async function getSoftwareList() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Не вдалося завантажити список");
    return await res.json();
}

async function createSoftware(dto) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || "Помилка при створенні");
    }
    return await res.json();
}


async function updateSoftware(name, dto) {
    const res = await fetch(`${API_URL}/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || "Помилка при оновленні");
    }
    return await res.json();
}

async function deleteSoftware(name) {
    const res = await fetch(`${API_URL}/${name}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || "Не вдалося видалити");
    }
    return await res.json();
}



async function loadSoftware() {
    statusEl.innerHTML = "Завантаження..."; 
    tableBody.innerHTML = "";
    
    try {
        const items = await getSoftwareList();
        
        if (!items || items.length === 0) {
            statusEl.innerHTML = "Поки що немає записів."; 
            softwareProducts = [];
            return;
        }
        
        statusEl.innerHTML = ""; 
        softwareProducts = items; 
        
        if (currentSort.field) {
            sortArray(currentSort.field);
        }
        
        render();
    } catch (err) {
        statusEl.innerHTML = `Помилка завантаження: ${err.message}`; 
    }
}

form.addEventListener("submit", async function(e){
    e.preventDefault();
    noticeEl.innerHTML = ""; 

    submitBtn.disabled = true;
    
    const dto = {
        name: nameInput.value.trim(),
        version: versionInput.value.trim(),
        licenseType: licenseSelect.value, 
        seats: Number(seatsInput.value),
        comment: commentInput.value.trim()
    };

    try {
        if (editModeName) {
            
            await updateSoftware(encodeURIComponent(editModeName), dto);
            
           
            editModeName = null;
            nameInput.disabled = false;
            formTitle.innerHTML = "Додати програму";
            submitBtn.innerHTML = "Додати";
        } else {
           
            await createSoftware(dto);
        }
        
        form.reset();
        await loadSoftware(); 
    } catch (err) {
        noticeEl.innerHTML = `Помилка: ${err.message}`;
    } finally {
        submitBtn.disabled = false;
        if (!editModeName) submitBtn.innerHTML = "Додати";
    }
});

function sortArray(field) {
    softwareProducts.sort((a, b) => {
        let valA = a[field] ?? "";
        let valB = b[field] ?? "";

        if (typeof valA === "number" && typeof valB === "number") {
            return currentSort.direction === "asc" ? valA - valB : valB - valA;
        }

        return currentSort.direction === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });
}

document.querySelector("thead").addEventListener("click", (e) => {
    const th = e.target.closest("th");
    if (!th) return;

    const field = th.dataset.sort;
    if (!field) return;

    if (currentSort.field === field) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
    } else {
        currentSort.field = field;
        currentSort.direction = "asc";
    }

    sortArray(field);
    render();
});


tableBody.addEventListener("click", async (e) => {
    
    if (e.target.classList.contains("delete-btn")) {
        const name = e.target.dataset.name;
        if (confirm(`Ви впевнені, що хочете видалити програму "${name}"?`)) {
            try {
                await deleteSoftware(encodeURIComponent(name));
                await loadSoftware(); 
            } catch (err) {
                alert(`Помилка видалення: ${err.message}`);
            }
        }
    }

    if (e.target.classList.contains("edit-btn")) {
        const name = e.target.dataset.name;
        const item = softwareProducts.find(p => p.name === name);
        
        if (item) {
            
            editModeName = item.name;
            nameInput.value = item.name;
            nameInput.disabled = true; 
            
            versionInput.value = item.version;
            licenseSelect.value = item.licenseType;
            seatsInput.value = item.seats;
            commentInput.value = item.comment;
            
            formTitle.innerHTML = `Редагувати програму "${item.name}"`;
            submitBtn.innerHTML = "Зберегти зміни";
            
            
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function render(){
    let rows = "";

    for(let item of softwareProducts){
        rows += `
        <tr>
            <td>${item.name || '-'}</td>
            <td>${item.version || '-'}</td>
            <td>${item.licenseType || '-'}</td>  
            <td>${item.seats || 0}</td>
            <td>${item.comment || '-'}</td>
            <td>
                <button class="edit-btn" data-name="${item.name}">Редагувати</button>
                <button class="delete-btn" data-name="${item.name}">Видалити</button>
            </td>
        </tr>
        `;
    }
    tableBody.innerHTML = rows;
}

loadSoftware();