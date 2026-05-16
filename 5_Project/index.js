const Amount = document.getElementById("inputAmnt");
const Description = document.getElementById("inputDes");
const Category = document.getElementById("inputCat");
const submit = document.getElementById("submit");
const list = document.getElementById("list");

let items = JSON.parse(localStorage.getItem("items")) || [];


items.forEach((element) => {
  showItem(element);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const curritem = {
    amount: Amount.value,
    description: Description.value,
    category: Category.value,
  };

  // Validation
  if (
    curritem.amount === "" ||
    curritem.description === "" ||
    curritem.category === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  items.push(curritem);

  localStorage.setItem("items", JSON.stringify(items));

  showItem(curritem);


  Amount.value = "";
  Description.value = "";
  Category.value = "";
});

function showItem(item) {
  const div = document.createElement("div");

  div.className = "border p-2 mb-2 rounded";

  div.innerHTML = `
    <p><strong>Amount:</strong> ${item.amount}</p>

    <p><strong>Description:</strong> ${item.description}</p>

    <p><strong>Category:</strong> ${item.category}</p>

    <button class="btn btn-danger btn-sm deleteBtn">
      Delete
    </button>

    <button class="btn btn-warning btn-sm editBtn">
      Edit
    </button>
  `;

  list.appendChild(div);

  // Delete
  const deleteBtn = div.querySelector(".deleteBtn");

  deleteBtn.addEventListener("click", () => {
    div.remove();

    items = items.filter((i) => {
      if (
        i.amount === item.amount &&
        i.description === item.description &&
        i.category === item.category
      ) {
        return false; // remove 
      }

      return true; // keep 
    });

    localStorage.setItem("items", JSON.stringify(items));
  });

  // Edit
  const editBtn = div.querySelector(".editBtn");

  editBtn.addEventListener("click", () => {
    Amount.value = item.amount;
    Description.value = item.description;
    Category.value = item.category;

    div.remove();

    items = items.filter((i) => {
      if (
        i.amount === item.amount &&
        i.description === item.description &&
        i.category === item.category
      ) {
        return false; // remove 
      }

      return true; // keep 
    });

    localStorage.setItem("items", JSON.stringify(items));
  });
}
