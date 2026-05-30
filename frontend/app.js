let softwareProducts = [];

let currentSort = {
    field: "",
    direction: "asc"
};

const form = document.getElementById("softwareForm");

const nameInput = document.getElementById("field1Input");
const versionInput = document.getElementById("field2Input");
const licenseSelect = document.getElementById("field3Select");
const seatsInput = document.getElementById("field4Text");
const commentInput = document.getElementById("field5Text");

const tableBody = document.getElementById("tableBody");



form.addEventListener("submit", function(e){
    e.preventDefault();

    const dto = {
        name: nameInput.value.trim(),
        version: versionInput.value.trim(),
        license: licenseSelect.value,
        seats: Number(seatsInput.value),
        comment: commentInput.value.trim()
    };

    if(dto.name === "" || dto.version === "" || dto.seats <= 0){
        return;
    }

    softwareProducts.push(dto);

    render();
    form.reset();
});



document.querySelector("thead").addEventListener("click", (e) => {

    const th = e.target.closest("th");
    if (!th) return;

    const field = th.dataset.sort;
    if (!field) return;

    if (currentSort.field === field) {
        currentSort.direction =
            currentSort.direction === "asc" ? "desc" : "asc";
    } else {
        currentSort.field = field;
        currentSort.direction = "asc";
    }

    softwareProducts.sort((a, b) => {

        let valA = a[field] ?? "";
        let valB = b[field] ?? "";

        if (typeof valA === "number" && typeof valB === "number") {
            return currentSort.direction === "asc"
                ? valA - valB
                : valB - valA;
        }

        return currentSort.direction === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    render();
});



function render(){

    let rows = "";

    for(let item of softwareProducts){
        rows += `
        <tr>
            <td>${item.name}</td>
            <td>${item.version}</td>
            <td>${item.license}</td>
            <td>${item.seats}</td>
            <td>${item.comment}</td>
        </tr>
        `;
    }

    tableBody.innerHTML = rows;
}