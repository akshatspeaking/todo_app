let clearBtn = document.createElement("button");
clearBtn.innerText = "Clear Completed";
let container = document.querySelector(".container")
let text = document.querySelector("input");
let list = document.querySelector("ul")


// CREATE NOTE ON ENTER PRESS
text.addEventListener("keyup", addToList);

function addToList (e) {
   
   if(e.keyCode === 13 && text.value.trim()) {


      // Adding new note to list
      let item = document.createElement("li");
      let check = document.createElement("input");
      let note = document.createElement("span");
      let cross = document.createElement("button");
    
      check.type = "checkbox";
      check.className = "checkbox"
      cross.innerText = "X";
      cross.className = "delete"
    
      note.innerText = text.value;
      
      item.append(check);
      item.append(note);
      item.append(cross);
      list.append(item);

                            //total number of LIs - number of selected LIs > push inside footer span
                            numOfItems();


      // DELETE BY X BUTTON
      cross.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      displayFooter();
      clearSelected();

               //total number of LIs - number of selected LIs > push inside footer span
               numOfItems();
                  
      })
      
      // STRIKETHROUGH IF RADIO CHECKED/UNCHECKED
      check.addEventListener("click", (e) => {

         if (e.target.checked == true) {
            let t = e.target.nextElementSibling.innerText;
            e.target.nextElementSibling.innerHTML = "<del> " + t + " </del>";
            e.target.classList.add("completed");


               //total number of LIs - number of selected LIs > push inside footer span
              
                  let numCompleted = document.querySelector("ul").childElementCount - document.querySelectorAll(".completed").length;
                  document.querySelector(".itemsLeft").innerText = String(numCompleted);

                  clearSelected();

         }
         if (e.target.checked == false) {
            let t = e.target.nextElementSibling.innerText;
            e.target.nextElementSibling.outerHTML = "<span>"+t+"</span>";
            e.target.classList.remove("completed");
        console.log("test");
                        //total number of LIs - number of selected LIs > push inside footer span
                        numOfItems();
                        clearSelected();
         }
      })

displayFooter();
clearSelected();

      text.value = ""
   }
}

//SELECT ALL ARROW
let i = false;
document.querySelector(".fas").addEventListener("click", () => {
  
   if(i == false){
      i = true;
      document.querySelector(".fas").style.color = "tomato";
      document.querySelectorAll("li").forEach(x => {

         if (x.children[0].checked == false) {

         x.children[0].classList.add("completed");
         x.children[0].checked = true;
         let t = x.children[1].innerText;
         x.children[1].innerHTML = "<del> " + t + " </del>"
         
         
         }
   
      })
   }
  else if(i == true){
   i = false;
   document.querySelector(".fas").style.color = "";
      document.querySelectorAll("li").forEach(x => {

         if (x.children[0].checked == true) {
       
         x.children[0].classList.remove("completed");
        x.children[0].checked = false;
        let t = x.children[1].innerText;
        x.children[1].outerHTML = "<span>"+t+"</span>";
        

      }

      })
    
   }


   numOfItems();
   clearSelected();
})



      // Footer event listeners
// ALL - defauly, display all LIs

document.querySelector(".all").addEventListener("click", () => {

   document.querySelectorAll("li").forEach(x => {x.style.display = "flex"});

});



// ACTIVe - display only unchecked LIs


document.querySelector(".actv").addEventListener("click", () => {

   document.querySelectorAll("li").forEach(x => {x.style.display = "flex"});

   document.querySelectorAll(".completed").forEach(x => {
      x.parentElement.style.display = "none";
   })
});



// COMPLETED - display only checked LIs

document.querySelector(".cmpltd").addEventListener("click", () => {

   document.querySelectorAll("li").forEach(x => {x.style.display = "none"});

   document.querySelectorAll(".completed").forEach(x => {
      x.parentElement.style.display = "flex";
   })
});


// CLEAR - remove li's with checked box

document.querySelector(".clr").addEventListener("click", () => {
   document.querySelectorAll(".completed").forEach(x => {
      x.parentElement.remove();
   })
});




      // if any checkbox is selected, display "Clear Selected" button, else display hidden

      let clearSelected = function () {

         if (document.querySelectorAll(".completed").length > 0) {
            document.querySelector(".clr").style.visibility = "visible";
         }
         else if (!document.querySelectorAll(".completed") == false) {
            document.querySelector(".clr").style.visibility = "hidden";
         }

      }


            // if length of ul > 0, display footer, else default display hidden. < Put this inside Enter key eventlistener AND inside X delete eventlistener

            let displayFooter = function () {

            if (document.querySelector("ul").childElementCount > 0) {
               document.querySelector(".footer").style.visibility = "visible";
            }
            else {
               document.querySelector(".footer").style.visibility = "hidden";
            }}


                                          //total number of LIs - number of selected LIs > push inside footer span

                                        let numOfItems = function () {
                                          if (!document.querySelector(".completed") == true) {
                                             document.querySelector(".itemsLeft").innerText = String(document.querySelector("ul").childElementCount);
                                          }
                                          else {
                                             let numCompleted = document.querySelector("ul").childElementCount - document.querySelectorAll(".completed").length;
                                             document.querySelector(".itemsLeft").innerText = String(numCompleted);}
                                            
                                        }
