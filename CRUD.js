var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var mainBt = document.getElementById("mainBt");
var prodeuctContainer;

if (localStorage.getItem("prodeuctData") == null) {
  prodeuctContainer = [];
} else {
  prodeuctContainer = JSON.parse(localStorage.getItem("prodeuctData"));
  display();
}

function addProduct() {
  if (validateProductName()==true) {

    if (chechIn() == true) {
      var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
      };
      prodeuctContainer.push(product);
  
      localStorage.setItem("prodeuctData", JSON.stringify(prodeuctContainer));
      display();
      clearForm();
    } else {
      alert("Fields are Required ");
    }
  }else{
    alert("productName in-valid");
  }
  
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function chechIn() {
  if (
    productName.value != "" &&
    productPrice.value != "" &&
    productCategory.value != "" &&
    productDesc.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function display() {
  var cartoona = ``;

  for (let i = 0; i < prodeuctContainer.length; i++) {
    cartoona += `<tr><td>${i + 1}</td>
                      <td>${prodeuctContainer[i].name}</td>
                      <td>${prodeuctContainer[i].price}</td>
                      <td>${prodeuctContainer[i].category}</td>
                      <td>${prodeuctContainer[i].desc}</td> 
                      <td><button  onclick="checkFormForUpdete(${i})" class="btn btn-outline-warning">update</button></td>
                      <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">delete</button></td>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct(index) {
  prodeuctContainer.splice(index, 1);
  localStorage.setItem("prodeuctData", JSON.stringify(prodeuctContainer));

  display();
}

function searchProdect(searchTerm) {
  var cartoona = ``;

  for (let i = 0; i < prodeuctContainer.length; i++) {
    if (
      prodeuctContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      prodeuctContainer[i].category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      cartoona += `<tr><td>${i + 1}</td>
            <td>${prodeuctContainer[i].name}</td>
            <td>${prodeuctContainer[i].price}</td>
            <td>${prodeuctContainer[i].category}</td>
            <td>${prodeuctContainer[i].desc}</td> 
            <td><button onclick="checkFormForUpdete(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">delete</button></td>`;
    } else {
      console.log("NOT");
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function checkFormForUpdete(index) {
  productName.value = prodeuctContainer[index].name;
  productPrice.value = prodeuctContainer[index].price;
  productCategory.value = prodeuctContainer[index].category;
  productDesc.value = prodeuctContainer[index].desc;
  mainBt.innerHTML = "update";
}

function updete() {
}

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value)== true) {
    return true;
    
  }else{
    return false;
  }
  
}