  //Plus & Minus for Quantity product
  $(document).ready(function () {
    var quantity = 1;

    $('.quantity-right-plus').click(function (e) {
      e.preventDefault();
      var quantity = parseInt($('#quantity').val());
      $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function (e) {
      e.preventDefault();
      var quantity = parseInt($('#quantity').val());
      if (quantity > 1) {
        $('#quantity').val(quantity - 1);
      }
    });

  });

  // update menu to cart script 
  const cartItems = document.querySelector(".cart-items");
  const cartTotalPrice = document.querySelector(".cart-total-price");

  let menuRows = [];

  window.addEventListener("load", async () => {
    const menus = JSON.parse(sessionStorage.getItem("fo_menus"));
    if (menus && menus.length > 0) {
      const details = await fetch("/cart/orderDetails", //fetct ตัว path ที่ต้องการเรียก medthod POST
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ menus })
        }
      )
        .then((allDetails) => allDetails.json());

      for (let i = 0; i < details.menuStoreDetails.length; i++) {
        menuRows[i] = makeRow(details.menuStoreDetails[i]);
        cartItems.appendChild(menuRows[i]);
      }
    }

    updateTotalPrice();
  }
  );

  function makeRow(obj) {
    const rowDiv = createElement("div.cart-row", null, {
      "data-menu-price": obj.menuDetails.price
    });

    createElement("span.cart-item-title.cart-column", rowDiv, {
      innerText: obj.menuDetails.menuName,
    });

    createElement("span.cart-item-title.cart-column", rowDiv, {
      innerText: obj.storeDetails.name
    });

    createElement("span.cart-price.cart-column", rowDiv, {
      innerText: "₹" + obj.menuDetails.price
    });


    const div = createElement("div.cart-quantity.cart-column", rowDiv);

    createElement("input.cart-quantity-input", div, {
      type: "number",
      value: 1,
      min: 1
    }).addEventListener("change", updateTotalPrice);

    createElement("button.btn.btn-danger", div, {
      type: "submit",
      innerText: "Remove"
    }).addEventListener("click", () => {
      rowDiv.remove();

      menuRows = menuRows.filter(e => !rowDiv.isSameNode(e));
      updateTotalPrice();

      const currSessionStorage = JSON.parse(sessionStorage.getItem("fo_menus"));
      const newSessionStorage = currSessionStorage.filter(id => obj.menuDetails.id != id);
      sessionStorage.setItem("fo_menus", JSON.stringify(newSessionStorage));
    });

    return rowDiv;
  }


  function createElement(selector, parent, attributes = {}) {
    let classes = selector.split(".");

    let tagAndId = classes.shift();
    let [tag, id] = tagAndId.split("#");

    let element = document.createElement(tag);

    if (id)
      element.id = id;
    if (classes.length)
      element.classList.add(...classes);

    if (parent)
      parent.appendChild(element);

    for (let k in attributes)
      if (k in element)
        element[k] = attributes[k];
      else
        element.setAttribute(k, attributes[k]);

    return element;
  }


  function updateTotalPrice() {
    let totalPrice = 0;

    for (let i = 0; i < menuRows.length; i++)
      totalPrice += menuRows[i].dataset.menuPrice * menuRows[i].querySelector(".cart-quantity-input").value;

    cartTotalPrice.innerText = "₹" + totalPrice;
  }