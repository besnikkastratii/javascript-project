let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

// shtete dhe flamuj per mu shfaq  random ne homepage
const countries = [
  { name: "United States", flag: `https://www.worldometers.info/img/flags/small/tn_us-flag.gif`, price: null },
  { name: "Canada", flag: "https://www.worldometers.info/img/flags/small/tn_ca-flag.gif", price: null },
  { name: "United Kingdom", flag: "https://www.worldometers.info/img/flags/small/tn_uk-flag.gif", price: null },
  { name: "Switzerland", flag: "https://www.worldometers.info/img/flags/small/tn_sz-flag.gif", price: null },
  { name: "France", flag: "https://www.worldometers.info/img/flags/small/tn_fr-flag.gif", price: null },
  { name: "Germany", flag: "https://www.worldometers.info/img/flags/small/tn_gm-flag.gif", price: null },
  { name: "Italy", flag: "https://www.worldometers.info/img/flags/small/tn_it-flag.gif", price: null },
  { name: "Spain", flag: "https://www.worldometers.info/img/flags/small/tn_sp-flag.gif", price: null },
  { name: "China", flag: "https://www.worldometers.info/img/flags/small/tn_ch-flag.gif", price: null },
  { name: "Russia", flag: "https://www.worldometers.info/img/flags/small/tn_rs-flag.gif", price: null },
  { name: "South Korea", flag: "https://www.worldometers.info/img/flags/small/tn_kr-flag.gif", price: null },
  { name: "India", flag: "https://www.worldometers.info/img/flags/small/tn_in-flag.gif", price: null },
  { name: "Albania", flag: "https://www.worldometers.info/img/flags/small/tn_al-flag.gif", price: null },
  { name: "North Macedonia", flag: "https://www.worldometers.info/img/flags/small/tn_mk-flag.gif" , price: null },
  { name: "Kosovo", flag: "https://flagcdn.com/xk.svg" , price: null },
];
  // Shuffle the countries array
  shuffleArray(countries);
  ////////////////////////////////////////////////////////////////////////////////////


  // selekto countries-grid div
  const countriesGrid = document.getElementById("countries-grid");
  const  homebtn = document.getElementById("homebtn")
  homebtn.style.display= "none";
  addtocart.style.display="none";

  ////////////////////////////////////////////////////////////////////////////////////


  /////// qmim random = 2shifror p.sh => 8.32
  countries.forEach(country => {
    country.price = (Math.random() * (10 - 3) + 3).toFixed(2);
  });
////////////////////////////////////////////////////////////////////////////////////


  // Loop per 8 shtete random dhe krijo nje html 
  for (let i = 0; i < 8; i++) {
    const country = countries[i];
    const gridItem = document.createElement("div");
    gridItem.classList.add("country");
    gridItem.innerHTML = `
      <img class="flamuri "src="${country.flag}"  style:" width="120px;" height="80px;" alt="${country.name} flag">
      <div class="country-name"><b>${country.name}</b></div>
      <div class="country-price">$${country.price}</div>
      <a href="#" style="" class="myButton">Details</a>
      <a href="#" style="margin-top:10px" class="myButton1">Add to Cart</a>

    `;
    // per me shfaq qmimin : <div class="country-price">$${country.price}</div>
    countriesGrid.appendChild(gridItem);
  
    // kur klikon Details bohen Fetch tdhanat e ati buttoni te klikuar
    const detailsBtn = gridItem.querySelector(".myButton");
    detailsBtn.addEventListener("click", () => showCountryDetails(country));
  }

// shto ne karte secilin search
const addToCartBtn = document.querySelector("#addtocart" );
const resultDiv = document.querySelector("#result");

  addToCartBtn.addEventListener("click", () => {
  const countryName = resultDiv.querySelector("h2").textContent;
  const flagSrc = resultDiv.querySelector(".flag-img").src;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const price =  resultDiv.parentNode.querySelector(".country-price").textContent;
  const priceElement = document.querySelector('.sapare');
  const priceText = priceElement.innerHTML;
  const price1 = parseFloat(priceText); // convert to a number

  
  if (!cartItems.find(item => item.name === countryName)) {
    cartItems.push({
      name: countryName,
      flag: flagSrc,
        price: price,
        price: price1,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(` Flamuri i ${countryName}  u shtua ne kartele `);
  } else {
    alert(`Flamuri i ${countryName} eshte ne kartele`);
  }
});




/// buttoni add to cart (mybutton1) qe osht ne homepage///////////////
const addToCartButtons = document.querySelectorAll(".myButton1"); //emerto 
const resultDiv1 = document.getElementById("countries-grid"); // selekto elementin ne homepage
const cartItems = []; // cart ites e zbrazet

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const countryName = e.target.closest(".country").querySelector(".country-name").textContent;
    const flagUrl = e.target.closest(".country").querySelector(".flamuri").src;
    const price1 = e.target.closest(".country").querySelector(".country-price").textContent;
    const qmimipa$ = price1.replace(/\s*\$\s*/g, '');
    const price = parseFloat(qmimipa$);
    const itemIndex = cartItems.findIndex((item) => item.name === countryName);
    if (itemIndex > -1) {
      alert(`Flamuri i ${countryName} Ã«shtÃ« nÃ« kartelÃ«.`); 
    } else {
      // Add item to cart
      cartItems.push({ name: countryName, flag: flagUrl, price: price });
      // Save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`Flamuri i ${countryName} Ã«shtÃ« shtuar nÃ« kartelÃ«.`); 
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////



// funksioni per buttonin Details
function showCountryDetails(country) {
  let finalURL = `https://restcountries.com/v3.1/name/${country.name}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      countriesGrid.style.display = "none";
      homebtn.style.display = "block";
      addtocart.style.display="block";
      navi.style.display = "none";
      result.innerHTML = `
        <img src="${data[0].flags.svg}"class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Kryeqyteti:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Kontinenti:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Popullata:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Valuta:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
              <h4>Kufizohet:</h4>
              <span>${Object.values(data[0].borders)
                .toString()
                .split(",")
                .join(", ")}</span>
          </div>
      </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Gjuhet:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
        <div class="wrapper">
        <div class="data-wrapper">
            <h4>Qmimi:</h4>
            <span class="sapare">${country.price} $</span>
        </div>
    </div>
      `;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////

  // shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////


//kthev ne homepage
  const homeBtn = document.getElementById('homebtn');
  homeBtn.addEventListener('click', function() {
    window.location.href = '/';
  });
/////////////////////////////////////////////////////////////////////////////////////////

 

const element = document.querySelector(".countries-grid");
countryInp.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", (e) => {
  let countryName = countryInp.value;
  const price = (Math.random() * (10 - 3) + 3).toFixed(2);
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      countriesGrid.style.display = "none";
      homebtn.style.display= "block";
      addtocart.style.display="block";
      navi.style.display= "none";
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Kryeqyteti:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Kontinenti:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Popullata:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Valuta:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
        <div class="wrapper">
        <div class="data-wrapper">
            <h4>Kufizohet:</h4>
            <span>${Object.values(data[0].borders)
              .toString()
              .split(",")
              .join(", ")}</span>
        </div>
    </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Gjuhet:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
        <div class="wrapper">
        <div class="data-wrapper">
            <h4>Qmimi:</h4>
            <span class="sapare">${price} $</span>
        </div>
    </div>
    </div>
      `;

      // <a href="#" id='returnhome' >Return Home</a> #add-to-cart
      const container = document.querySelector('.container');

      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      container.style.boxShadow = `-19px 10px 66px 10px ${getRandomColor()}`;
    })
    .catch(() => {
      if (countryName.length == 0) {
        addtocart.style.display="none";
        result.innerHTML = `<h3>Rubrika nuk mund te jetÃ« e zbrazet</h3>`;
      } else {
        addtocart.style.display="none";
        result.innerHTML = `<h3>Vendos njÃ« Emer Shteti tÃ« SaktÃ«.p.sh.Kosovo.</h3>`;
      }
    });
  }  
);