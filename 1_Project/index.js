const subHeading = document.createElement('h3');
subHeading.textContent = "Buy high quality organic fruits online";
subHeading.style.fontStyle = "italic";

const header = document.getElementById('header');


const totalFruit = document.createElement('p');
totalFruit.textContent = "Total fruits: 4";
totalFruit.id = "fruits-total";
header.appendChild(subHeading);


const secDiv = document.querySelector('div:nth-of-type(2)');
const ul = document.querySelector('ul');
secDiv.insertBefore(totalFruit, ul);
