document.addEventListener("DOMContentLoaded", () => {
  const fruitsList = document.querySelector(".fruits");
  const form = document.querySelector("form");


  const fruits = document.querySelectorAll(".fruit");
  fruits.forEach((fruit) => {
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    fruit.appendChild(editBtn);
  });

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fruitToAdd = document.getElementById("fruit-to-add");

    const newLi = document.createElement("li");
    newLi.className = "fruit";

    newLi.innerHTML =
      fruitToAdd.value + `<button class="delete-btn">x</button>`;

    // add edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    newLi.appendChild(editBtn);
    fruitsList.appendChild(newLi);

    fruitToAdd.value = "";
  });

  // DELETE FRUIT (EVENT DELEGATION)
  fruitsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest("li").remove();
    }
  });
});
