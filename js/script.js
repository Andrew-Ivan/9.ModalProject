const products = [
  {
    path: "img/cake-1.jpeg",
    dataValue: "cakes",
  },
  {
    path: "img/cake-2.jpeg",
    dataValue: "cakes",
  },
  {
    path: "img/cake-3.jpeg",
    dataValue: "cakes",
  },
  {
    path: "img/cupcake-1.jpeg",
    dataValue: "cupcakes",
  },
  {
    path: "img/cupcake-2.jpeg",
    dataValue: "cupcakes",
  },
  {
    path: "img/cupcake-3.jpeg",
    dataValue: "cupcakes",
  },
  {
    path: "img/doughnut-1.jpeg",
    dataValue: "doughnuts",
  },
  {
    path: "img/doughnut-2.jpeg",
    dataValue: "doughnuts",
  },
  {
    path: "img/doughnut-3.jpeg",
    dataValue: "doughnuts",
  },
  {
    path: "img/sweets-1.jpeg",
    dataValue: "sweets",
  },
  {
    path: "img/sweets-2.jpeg",
    dataValue: "sweets",
  },
  {
    path: "img/sweets-3.jpeg",
    dataValue: "sweets",
  },
];

let store = document.querySelector(".products");
let counter = 0;
let productArray = [];

//add products
function clickHandler() {
  let res = this.dataset ? this.dataset.filter : "all";
  store.innerHTML = "";
  for (let i = 0; i <= products.length - 1; i++) {
    let result = res == products[i].dataValue || res == "all";
    let element = `
      <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item ${products[i].dataValue}" data-item=${products[i].dataValue}>
        <div class="card ">
          <div class="img-container">
            <img src=${products[i].path} class="card-img-top store-img" alt="" />
            <span class="store-item-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 id="store-item-name">${products[i].dataValue} item</h5>
              <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">10</strong></h5>
            </div>
          </div>
        </div>
      </div>
    `;

    result && render(element);
  }
  productArray = document.querySelectorAll(".store-item");
  modalOpen();
}
clickHandler();

//render products + modal window
function render(elem) {
  store.insertAdjacentHTML("afterbegin", elem);
}

// Modal Zone-----------------------------------------------------

//add modal window
function modalHandler(e) {
  let modalWindow = `      
		<div class="modal-body">
			<div>
				<div class="close-btn">
					<a href="#close" title="Закрыть" class="close">X</a>
				</div>
				<img src=${e.src} alt="productModal" />
				<div class="btns">
					<a href="#" class="btn prev">PREV</a>
					<a href="#" class="btn next">NEXT</a>
				</div>
			</div>
		</div>`;
  render(modalWindow);
  modalListener();
}

//listen clicks on next-prev buttons
function modalListener() {
  store.querySelectorAll(".modal-body a").forEach((button) => {
    button.addEventListener("click", nextSlide);
  });

  store.querySelector(".close").addEventListener("click", (e) => {
    store.removeChild(store.querySelector(".modal-body"));
  });
}

//render next slide
function nextSlide() {
  let i = this.classList.contains("next");
  if (i) {
    if (counter >= productArray.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
  } else {
    if (counter <= 0) {
      counter = productArray.length - 1;
    } else {
      counter--;
    }
  }
  document.querySelector(".modal-body img").src = productArray[
    counter
  ].querySelector("img").src;
}
//-----------------------------------------------------------------

//Listener on image click
function modalOpen() {
  store.querySelectorAll(".store-item").forEach((product) => {
    product.children[0].addEventListener("click", (e) => {
      e.preventDefault();
      modalHandler(e.target);
    });
  });
}

//Category buttons
document.querySelectorAll(".filter-buttons a").forEach((button) => {
  button.addEventListener("click", clickHandler);
});
