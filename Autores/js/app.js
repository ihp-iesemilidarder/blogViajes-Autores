let jsonAuthors=JSON.parse(localStorage.getItem("authors"))||[];
const table = document.querySelector("table tbody");
const sendAuthor = document.querySelector("form input[type='submit']");
const form = document.querySelector("form");

const printAuthors=()=>{
    table.innerHTML="";
    jsonAuthors.forEach((el,index)=>{
        el.innerHTML+=`
        <tr>
            <td>${index+1}</td>
            <td>${el.nif}</td>
            <td>${el.name}</td>
            <td>${el.surname1} ${el.surname2}</td>
            <td>${el.data}</td>
            <td>${el.rol}</td>                        
        </tr>
        `;
    });
}

const validateForm=(data)=>{
    let nif = data.get("nif");
    let name = data.get("name");
    let surname1 = data.get("surname1");
    let surname2 = data.get("surname2");
    let date = data.get("data");
    let rol = data.get("rol");
    console.log(rol);
}

const addAuthor=(e)=>{
    e.preventDefault();
    let data = new FormData(form);
    validateForm(data);
    if(!validateForm) return false;

}

const init=()=>{
    printAuthors();
    sendAuthor.addEventListener("click",addAuthor);
}

init();