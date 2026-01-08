document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementsByTagName("form")[0];
  const fruititems = document.querySelector(".fruits");
  const filter = document.getElementById("filter");

  // ===============================
  // TASK 1: ADD DESCRIPTION INPUT
  // ===============================
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "description";
  descriptionInput.placeholder = "Enter fruit description";

  const subBtn = form.querySelector("button");
  form.insertBefore(descriptionInput, subBtn);

  // ===============================
  // TASK 2: ADD FRUIT + DESCRIPTION
  // ===============================
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fruitNameInput = document.getElementById("fruit-to-add");
    const fruitDesc = descriptionInput.value;

    if (fruitDesc === "") {
      alert("Please enter a description.");
      return;
    }

    const li = document.createElement("li");
    li.className = "fruit";

    // fruit name
    const nameText = document.createTextNode(fruitNameInput.value);

    // description (italic, next line)
    const descPara = document.createElement("p");
    descPara.style.fontStyle = "italic";
    descPara.textContent = fruitDesc;

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "x";

    li.appendChild(nameText);
    li.appendChild(deleteBtn);
    li.appendChild(descPara);

    fruititems.appendChild(li);

    // clear inputs
    fruitNameInput.value = "";
    descriptionInput.value = "";
  });

  // ===============================
  // DELETE FUNCTIONALITY
  // ===============================
  fruititems.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.closest("li").remove();
    }
  });

  // ===============================
  // TASK 3: FILTER BY NAME OR DESCRIPTION
  // ===============================
  filter.addEventListener("keyup", (e) => {
    const searchText = e.target.value.toLowerCase();
    const fruits = document.getElementsByClassName("fruit");

    for (let i = 0; i < fruits.length; i++) {
      const fruitName = fruits[i].firstChild.textContent.toLowerCase();
      const fruitDesc = fruits[i].querySelector("p")
        ? fruits[i].querySelector("p").textContent.toLowerCase()
        : "";

      if (
        fruitName.includes(searchText) ||
        fruitDesc.includes(searchText)
      ) {
        fruits[i].style.display = "block";
      } else {
        fruits[i].style.display = "none";
      }
    }
  });

});
