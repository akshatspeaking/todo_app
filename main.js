
let sst = JSON.parse(localStorage.getItem("items")) || [];
updateUI(JSON.parse(localStorage.getItem("items")));
let input = document.querySelector("#textin");
let list = document.querySelector("ul");
input.addEventListener("keyup", addTodo);
document.querySelector(".all").addEventListener("click", showAll)
document.querySelector(".actv").addEventListener("click", showActive)
document.querySelector(".completed").addEventListener("click", showCompleted)
document.querySelector(".clr").addEventListener("click", clearCompleted)
document.querySelector(".fas").addEventListener("click", selectAll)

// ADD new note to SST
function addTodo(e) {
   let inputText = input.value.trim();
   if (e.keyCode == 13 && inputText !== "") {
      sst.push({note: input.value, isDone: false});
      localStorage.setItem("items", JSON.stringify(sst));
      input.value = "";
      updateUI(sst); 
   }
   
};

//FN - Display/Refresh SST items on UI
function updateUI(arr) {

   let input = document.querySelector("#textin");
   let list = document.querySelector("ul");

   localStorage.setItem("items", JSON.stringify(sst));

   list.innerHTML = "";
   
   arr.forEach((obj, i) => {

      // ADD new note to UL

      obj.id = i;
      let item = document.createElement("li");
      item.setAttribute("data-id", obj.id);
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("check")
      checkbox.classList.add("checkbox");
      checkbox.checked = obj.isDone;
      let noteText = document.createElement("p");
      noteText.classList.add("note")
      let cross = document.createElement("span");
      cross.innerText = `X`;
      cross.classList.add("span")
      cross.classList.add("delete")

      item.append(checkbox, noteText, cross);
      list.append(item);

      if (obj.isDone) {
         noteText.innerHTML = "<s>" + obj.note + "</s>";
      }
      else {noteText.innerHTML = obj.note;}   
   })

   //EVENT LISTENERS on List Items
   document.querySelectorAll(".check").forEach(x => {x.addEventListener("click", checkBoxClick)})
   document.querySelectorAll(".span").forEach(x => {x.addEventListener("click", crossClick)}) 
   document.querySelectorAll(".note").forEach(x => {x.addEventListener("dblclick", editNote)}) 

   // No of items left
   let noLeft = 0;
   sst.forEach((obj) => {
      if (!obj.isDone) {noLeft++;}
   });
   document.querySelector(".itemsLeft").innerText = noLeft;

   if (document.querySelectorAll("li").length > 0) {
      document.querySelector(".fas").style.visibility = "visible";
   }
   if (document.querySelectorAll("li").length == 0) {
      document.querySelector(".fas").style.visibility = "hidden";
   }


   
}
// FN - on checkbox Complete checked items
function checkBoxClick(e) {
   let id = e.target.parentElement.dataset.id;
   sst[id].isDone = !sst[id].isDone;
   updateUI(sst);
   if (document.querySelectorAll("li").length == sst.filter(x => (x.isDone)).length) {
      document.querySelector(".fas").click();
   }
   if (document.querySelectorAll("li").length == sst.filter(x => (!x.isDone)).length) {
      document.querySelector(".fas").click();
   }
}

//FN - DELETE X SPAN
function crossClick(e) {
   let id = e.target.parentElement.dataset.id;
   sst.splice(id, 1);
   updateUI(sst);
}

//footer part
// show All
function showAll() {
   updateUI(sst);
}

// show active
function showActive() {
   updateUI(sst.filter(x => !x.isDone));
}

//show completed
function showCompleted() {
   updateUI(sst.filter(x => x.isDone));
}

//Clear completed
function clearCompleted() {
   sst = sst.filter(obj => obj.isDone == false)
   updateUI(sst);
   document.querySelector(".fas").click();

}

// Select All button

var cnt = false;
function selectAll() {
   if(!cnt) {
      sst.forEach(x => {x.isDone = true});
      updateUI(sst);
      cnt = true;
      document.querySelector(".fas").style.color = "#737373";
   }
   else if(cnt) {
      sst.forEach(x => {x.isDone = false});
      updateUI(sst);
      cnt = false;
      document.querySelector(".fas").style.color = "#e6e6e6"
   }
}

// double click edit
function editNote(e) {
   let para = e.target;
   let tempId = e.target.parentElement.getAttribute("data-id");
   para.style.display = "none";
   let tempInput = document.createElement("input");
   tempInput.classList.add("tempInput")
   tempInput.value = para.innerText;
   let nextEl = e.target.parentElement.children[2];
   e.target.parentElement.insertBefore(tempInput, nextEl);
   tempInput.focus();
   tempInput.nextElementSibling.style.visibility = "hidden";
   tempInput.parentElement.children[0].style.visibility = "hidden";

   tempInput.onblur = () => {
      sst[tempId].note = tempInput.value;
      para.style.display = "inline-block";
      tempInput.style.display = "none";
      updateUI(sst);
   }

   tempInput.addEventListener("keyup", (event) => {
 
   if (event.keyCode == 13 && tempInput.value.trim() !== "") {
      sst[tempId].note = tempInput.value;
      para.style.display = "inline-block";
      tempInput.style.display = "none";
      updateUI(sst);
   }}) }