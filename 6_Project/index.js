const inputVal = document.querySelectorAll(".form-control");
const submitBtn = document.querySelector(".btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const vegname = inputVal[0].value;
  const vegprice = inputVal[1].value;
  let vegquantity = Number(inputVal[2].value);

  const vegList = document.querySelector(".list-unstyled");

  const li = document.createElement("li");
  li.className =
    "veg-item d-flex justify-content-between align-items-center";

  li.innerHTML = `
    <div class="veg-info d-flex gap-4 align-items-center">
        <p class="m-0">${vegname}</p>
        <p class="m-0">₹${vegprice}</p>
        <p class="m-0 quantity-text">${vegquantity} Kg</p>
    </div>
  `;

  // Buy input
  const buyInput = document.createElement("input");
  buyInput.type = "number";
  buyInput.placeholder = "Qty";
  buyInput.className = "form-control form-control-sm";
  buyInput.style.width = "80px";

  // Buy button
  const buyBtn = document.createElement("button");
  buyBtn.className = "btn btn-primary btn-sm";
  buyBtn.textContent = "Buy";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";

  // Button container
  const btnDiv = document.createElement("div");
  btnDiv.className = "d-flex gap-2 align-items-center";

  btnDiv.appendChild(buyInput);
  btnDiv.appendChild(buyBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(btnDiv);

  vegList.appendChild(li);

  // Delete
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Buy logic
  buyBtn.addEventListener("click", () => {
    const buyQty = Number(buyInput.value);

    if (buyQty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    if (buyQty > vegquantity) {
      alert("Not enough stock!");
      return;
    }

    vegquantity -= buyQty;

    li.querySelector(
      ".quantity-text"
    ).textContent = `${vegquantity} Kg`;

    buyInput.value = "";
  });

  // Clear main inputs
  inputVal[0].value = "";
  inputVal[1].value = "";
  inputVal[2].value = "";
});