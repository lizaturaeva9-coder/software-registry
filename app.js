let softwareProducts = [];

const form = document.getElementById("softwareForm");

const nameInput = document.getElementById("field1Input");
const versionInput = document.getElementById("field2Input");
const licenseSelect = document.getElementById("field3Select");
const seatsInput = document.getElementById("field4Text");
const commentInput = document.getElementById("field5Text");

const table = document.querySelector("table");


form.addEventListener("submit", function(event){

event.preventDefault();
const dto = readForm();
const valid = validate(dto);

if(valid === false){
return;
}

addItem(dto);
render();
form.reset();
});

function readForm(){

return {

name: nameInput.value.trim(),

version: versionInput.value.trim(),

license: licenseSelect.value,

seats: Number(seatsInput.value),

comment: commentInput.value.trim()

};

}

function validate(dto){
let valid = true;
clearErrors();
if(dto.name === ""){

showError("field1Input","field1Error","Введіть Name");

valid = false;
}


if(dto.version === ""){

showError("field2Input","field2Error","Введіть Version");

valid = false;
}


if(dto.seats <= 0 || Number.isNaN(dto.seats)){
showError("field4Text","field4Error","Некоректні Seats");
valid = false;
}

return valid;
}

function addItem(dto){

softwareProducts.push(dto);
}



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


table.innerHTML = `

<tr>
<th>Name</th>
<th>Version</th>
<th>LicenseType</th>
<th>Seats</th>
<th>Comment</th>
</tr>

${rows}
`;
}

function showError(inputId,errorId,message){
document.getElementById(inputId)
.style.border="2px solid red";
document.getElementById(errorId)
.innerHTML=message;
}

function clearErrors(){
document.querySelectorAll(".error-text")
.forEach(function(el){
el.innerHTML="";
});


document.querySelectorAll("input,textarea")
.forEach(function(el){
el.style.border="";
});
}