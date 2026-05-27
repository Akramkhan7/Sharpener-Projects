const inputVal = document.querySelectorAll(".form-control");
const submitBtn = document.querySelector(".btn");

const baseURL =
  "https://crudcrud.com/api/a0a29e0bfb6f4741948187976ce1a125/vegetables";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const vegName = inputVal[0].value;
  const vegPrice = inputVal[1].value;
  let vegQnty = inputVal[2].value;

  const vegList = document.querySelector(".list-unstyled");

  const li = document.createElement("li");
  li.className = "veg-item d-flex justify-content-between align-items-center";

  li.innerHTML = `
    <div class="veg-info d-flex gap-4 align-items-center">
        <p class="m-0">${vegName}</p>
        <p class="m-0">₹${vegPrice}</p>
        <p class="m-0 quantity-text">${vegQnty} Kg</p>
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

  axios
    .post(baseURL, {
      name: vegName,
      price: vegPrice,
      quantity: vegQnty,
    })
    .then((res) => {
      console.log(res.data);
      li.dataset.id = res.data._id;
    })
    .catch((err) => console.log(err));

  // Delete
  deleteBtn.addEventListener("click", () => {
    axios.delete(`${baseURL}/${li.dataset.id}`).then((res) => li.remove());
  });

  // Buy logic
  buyBtn.addEventListener("click", () => {
    const buyQty = buyInput.value;

    if (buyQty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    if (buyQty > vegQnty) {
      alert("Not enough stock!");
      return;
    }

    vegQnty -= buyQty;

    li.querySelector(".quantity-text").textContent = `${vegQnty} Kg`;

    axios.put(`${baseURL}/${li.dataset.id}`, {
      id: li.dataset.id,
      name: vegName,
      price: vegPrice,
      quantity: vegQnty,
    });

    buyInput.value = "";
  });

  // Clear main inputs
  inputVal[0].value = "";
  inputVal[1].value = "";
  inputVal[2].value = "";
});
