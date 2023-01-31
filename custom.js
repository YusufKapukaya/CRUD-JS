const table=document.getElementById("userTable");
 

function getUserList(){
    fetch("https://reqres.in/api/users")
    .then(response=>response.json())
    .then(data=>{
        // console.log(data);
        for(user of data.data)
        {
            // console.log(user);
            table.innerHTML+=`<tr>
            <td><input type="text" class="form-control" id="first_name_${user.id}" value="${user.first_name}"></td>
            <td><input type="text" class="form-control" id="last_name_${user.id}" value="${user.last_name}"></td>
            <td><input type="text" class="form-control" id="email_${user.id}" value="${user.email}"></td>
            <td>
                <a href="" class="btn btn-warning" onclick="updateUser(${user.id})">Aktualisieren</a>
                <a href="" class="btn btn-danger" onclick="updateUser(${user.id})">Löschen</a>
            </td>
        </tr>`
        }
    })
}

getUserList();

function refreshData(){
    getUserList();

}

function createUser(){
    let data={
        first_name:document.getElementById("first_name").value || "Deger Yok",
        last_name:document.getElementById("last_name").value || "Deger Yok",
        email:document.getElementById("email").value || "Deger Yok",
    };
    fetch("https://reqres.in/api/users",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        table.innerHTML+=`<tr>
            <td><input type="text" class="form-control" id="" value="${data.first_name}"></td>
            <td><input type="text" class="form-control" id="" value="${data.last_name}"></td>
            <td><input type="text" class="form-control" id="" value="${data.email}"></td>
            <td>
                <a href="" class="btn btn-warning" onclick="updateUser(${data.id})">Aktualisieren</a>
                <a href="" class="btn btn-danger" onclick="deleteUser(${data.id})">Löschen</a>
            </td>
        </tr>`
    })
    .catch((error)=>{
        console.log("Hata:",error);
    })
}


function updateUser(id){
    let data={
        first_name:document.getElementById("first_name_"+id).value || "Gecersiz Deger",
        last_name:document.getElementById("last_name_"+id).value || "Gecersiz Deger",
        email:document.getElementById("email_"+id).value || "Gecersiz Deger",
    };
    fetch("https://reqres.in/api/users",{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(veri=>console.log("Kullanici Güncellendi",veri))
    .catch((error)=>console.log(error))

}


function deleteUser(id){
    fetch("https://reqres.in/api/users"+id,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(response=>console.log(response))
    .then(data=>{
        console.log("Benutzer ist gelöscht",data);
    })
    .catch((error)=>console.log(error));
}