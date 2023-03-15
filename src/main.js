let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, salename, name, sale, price, link,  desc, img , cart} = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
      <div class="card" style="width: 25rem;">
      <img class="sale" src="${salename}" alt="">
      <a href="${link}"><img src="${img}" class="card-img-top" alt="..."></a>
      <div class="card-body">
        <h3 class="card-title"> ${name}</h3>
        <h2 class="card-title">Price : <strike>${sale}  $</strike>  ${price} $</h4>
      <div class="addcart">
      <a class="btn btn-secondary buy" <i onclick="increment(${id})"><h5 class="text-white">Buy Fan</h5></i></a>
      <br>
      <a class="btn btn-success add" href="${cart}"><h5 class="text-white">View Cart</h5></i></a>
      </div>
         <div class="buttons">
          <h3>Item :</h3>
              <div id=${id} class="quantity">
             ${search.item === undefined ? 0 : search.item}
              </div>
            </div>
      </div>
    </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
