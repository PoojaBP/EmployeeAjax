const emplurl = "https://lwl-ems.herokuapp.com/api/ems";
let url="";
let edit = false;
let id = "";

getEmployees();

//to get all the details of employee
function getEmployees(){
    var op = document.querySelector('tbody');
op.innerHTML = "";  
     url = emplurl+"/all";
    let element = document.querySelector("#details");
        fetch(url).then(response => response.json()).then(result => {
            result.forEach(emp => {

                op.innerHTML += `
            <tr>   
            <th scope="row">${emp["id"]}</th>  
            <td>${emp.name}</td>                  
            <td>${emp.email}</td>                  
            <td>${emp.salary}</td>
            
            <td><button type="button" id="btndt" onclick="deleteEmp(this);" class="btn btn-primary">Delete</button></td>
            <td><button type="button" id="btnEdit" onclick="onEdit(this);" class="btn btn-primary">Edit</button></td>
            </tr>
    `;          
             });
                 element.innerHTML = op.innerHTML;
        });
}
//to set the form input data into db
function setEmployees() {
    alert("your form is submitted")
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let salary = document.querySelector("#salary").value;

    document.querySelector("#empData").reset();

    let data = {"name": name, "email": email, "salary": salary};

    url = `${emplurl}/`
    //if editing existing data
    if (!edit) {
            fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            getEmployees();
        })
    }
    //if adding new details of emplyee
    else {
        data = {"id": id, "name": name, "email": email, "salary": salary};

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            getEmployees();
        })
    }
    edit = false;
}

//to delele the emp data

function deleteEmp(td) {
    alert("Are you sure you want to delete?")
  
    let row = td.parentElement.parentElement;
    //to get the unique id in the first colume of table
     id = row.cells[0].innerHTML;
        row = td.parentElement.parentElement;
        document.getElementById("myTable").deleteRow(row.rowIndex);
        url = `${emplurl}/${id}`;
        fetch(url , {
            method  :   "DELETE"
        }).then(response => {
            console.log(response);
            getEmployees();
        })
    }

//for editing
function onEdit(td) {
    let row = td.parentElement.parentElement;
    id  = row.cells[0].innerHTML;
    document.getElementById("name").value = row.cells[1].innerHTML;
    document.getElementById("email").value = row.cells[2].innerHTML;
    document.getElementById("salary").value = row.cells[3].innerHTML;
    edit = true;

}