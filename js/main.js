let title = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categrory = document.getElementById("categrory");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let thmes = document.getElementById("thmes");
let bod = document.getElementById("tt");
let searchTitle = document.getElementById("searchTitle");
let searchcategory = document.getElementById("searchcategory");
let dell = document.getElementById("DELETALLL");
let up = document.getElementById("updata");
let dele = document.getElementById("delete");
let mod = "dark";
let tot = document.getElementById("tot");
let mood = "create";
let index;

// console.log(
//   title,
//   price,
//   taxes,
//   ads,
//   discount,
//   total,
//   count,
//   categrory,
//   submit
// );

// get total
function getTotal() {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
function getmoney(){

  let m = 0 ;
  for (let i = 0; i < datapro.length; i++) {
  m+= +datapro[i].total;
  }
  tot.innerHTML=m+' $';
}
// create product

let datapro = [];
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
}
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    categrory: categrory.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    categrory.value != "" 
  ) { 

    if (ads.value=='' ) newpro.ads = '0';
    if (taxes.value == "") newpro.taxes = "0";
    if (discount.value == "") newpro.discount = "0";

          if (mood == "create") {
            if (newpro.count > 1) {
              for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
              }
            } else {
              datapro.push(newpro);
            }
          } else {
            datapro[index] = newpro;
            submit.innerHTML = "Create";
            mood = "create";
            count.style.display = "block";
          }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(datapro);
  
  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  categrory.value = "";
  total.innerHTML = "";
}

//read data
function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < datapro.length; i++) {
    table += `   
              <tr>           
              <td>${i+1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price} $</td>
              <td>${datapro[i].taxes} $</td>
              <td>${datapro[i].ads } $</td>
              <td>${datapro[i].discount} $</td>
              <td>${datapro[i].total} $</td>
              <td>${datapro[i].categrory}</td>
              <td><button onclick="updateData(${i})" id="updata">updata</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelet = document.getElementById("deletAll");
  if (datapro.length > 0) {
    btnDelet.innerHTML = `
    <button id="DELETALLL" onclick="deleteAll()">delete All (${datapro.length})</button>
    `;
    let dell = document.getElementById("DELETALLL");
  } else {
    btnDelet.innerHTML = "";
  }
  getmoney();
}
showData();
getmoney();

// delete
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  console.log(i);
  showData();
  getmoney();
}

// delete all
function deleteAll() {
  datapro.splice(0);
  localStorage.clear();
  showData();
  getmoney();
}
// save localstorig

function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  categrory.value = datapro[i].categrory;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getmoney();
}

//count

//update

//serch

let serchmood = 'titel';

function getserchmood (id){

  if(id=="searchTitle"){
    serchmood = "titel";
    search.placeholder = "Search by Title ";

  }
  else{
    serchmood = "category";
    search.placeholder = "Search by Category ";
  }
  search.focus();
  serch.value = '' ;
  showData();
}

function serch(value) {
  let table;
  if (serchmood == 'titel'){
  
    for(let i = 0 ;i<datapro.length;i++){

    if (datapro[i].title.includes(value.toLowerCase()))
    {
      table += `   
              <tr>           
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].categrory}</td>
              <td><button onclick="updateData(${i})" id="updata">updata</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
    }
    }





  }




  else{
  for (let i = 0; i < datapro.length; i++) {
    if (datapro[i].categrory.includes(value.toLowerCase())) {
      table += `   
              <tr>           
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].categrory}</td>
              <td><button onclick="updateData(${i})" id="updata">updata</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
    }
 }

  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data




thmes.onclick = function () {
  if (mod == "dark") {
    title.style.backgroundColor = "white";
    title.style.color = "black";
    title.style.border = " 2px solid black";

    price.style.backgroundColor = "white";
    price.style.color = "black";
    price.style.border = " 2px solid black";

    taxes.style.backgroundColor = "white";
    taxes.style.color = "black";
    taxes.style.border = " 2px solid black";

    ads.style.backgroundColor = "white";
    ads.style.color = "black";
    ads.style.border = " 2px solid black";

    discount.style.backgroundColor = "white";
    discount.style.color = "black";
    discount.style.border = " 2px solid black";

    count.style.backgroundColor = "white";
    count.style.color = "black";
    count.style.border = " 2px solid black";

    categrory.style.backgroundColor = "white";
    categrory.style.color = "black";
    categrory.style.border = " 2px solid black";

    total.style.backgroundColor = "white";
    total.style.color = "black";
    total.style.border = " 2px solid black";

    search.style.backgroundColor = "white";
    search.style.color = "black";
    search.style.border = " 2px solid black";

    submit.style.backgroundColor = "black";
    searchTitle.style.backgroundColor = "black";
    searchcategory.style.backgroundColor = "black";

  

    bod.style.backgroundColor = "white";
    bod.style.color = "#222";
    mod = "light";
    thmes.innerHTML = "light";
  } else {

    title.style.backgroundColor = "#222";
    title.style.border = " 2px solid white";
    title.style.color = "white";

    price.style.backgroundColor = "#222";
    price.style.border = " 2px solid white";
    price.style.color = "white";

    taxes.style.backgroundColor = "#222";
    taxes.style.border = " 2px solid white";
    taxes.style.color = "white";

    ads.style.backgroundColor = "#222";
    ads.style.border = " 2px solid white";
    ads.style.color = "white";

    discount.style.backgroundColor = "#222";
    discount.style.border = " 2px solid white";
    discount.style.color = "white";

    count.style.backgroundColor = "#222";
    count.style.border = " 2px solid white";
    count.style.color = "white";

    categrory.style.backgroundColor = "#222";
    categrory.style.border = " 2px solid white";
    categrory.style.color = "white";

    search.style.backgroundColor = "#222";
    search.style.border = " 2px solid white";
    search.style.color = "white";

    total.style.backgroundColor = "red";
    total.style.border = " 2px solid white";
    total.style.color = "white";

    submit.style.backgroundColor = "rgb(0, 0, 255)";
    searchTitle.style.backgroundColor = "rgb(0, 0, 255)";
    searchcategory.style.backgroundColor = "rgb(0, 0, 255)";


    bod.style.backgroundColor = "#222";
    bod.style.color = "white";
    mod = "dark";
    thmes.innerHTML = "dark";
  }
};
