  //Plus & Minus for Quantity product
  // $(document).ready(function () {
  //   var quantity = 1;

  //   $('.quantity-right-plus').click(function (e) {
  //     e.preventDefault();
  //     var quantity = parseInt($('#quantity').val());
  //     $('#quantity').val(quantity + 1);
  //   });

  //   $('.quantity-left-minus').click(function (e) {
  //     e.preventDefault();
  //     var quantity = parseInt($('#quantity').val());
  //     if (quantity > 1) {
  //       $('#quantity').val(quantity - 1);
  //     }
  //   });

  // });

  // update menu to cart script 
  const cartItems = document.querySelector(".cart-items");
  const cartTotalPrice = document.querySelector(".cart-total-price");
  
  let menuRows = [];
  
  
  window.addEventListener
  (
    "load",
    async () =>
    {
      const dishes = JSON.parse(sessionStorage.getItem("fo_dishes"));
      if(dishes && dishes.length > 0){
        const details = await fetch
        (
          "/endpoints/dishRestDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ dishes })
          }
        )
        .then((allDetails) => allDetails.json());
  
        for(let i = 0; i < details.dishRestDetails.length; i++)
        {
          menuRows[i] = makeRow(details.dishRestDetails[i]);
          cartItems.appendChild(menuRows[i]);
        }
      }
      
      updateTotalPrice();
    }
  );
  
  
  /* <div class="cart-row" data-dish-price="dvnd">
    <span class="cart-item-title cart-column">pnr pasanda</span>
    <span class="cart-item-title cart-column">Hotel</span>
    <span class="cart-price cart-column">₹190</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Remove</button>
    </div>
  </div> */
  
  
  function makeRow(obj)
  {
    const rowDiv = createElement("div.cart-row", null, {
      "data-dish-price": obj.dishDetails.price
    });
  
    createElement("span.cart-item-title.cart-column", rowDiv, {
      innerText: obj.dishDetails.name
    });
    
    createElement("span.cart-item-title.cart-column", rowDiv, {
      innerText: obj.restDetails.name
    });
  
    createElement("span.cart-price.cart-column", rowDiv, {
      innerText: "บาท" + obj.dishDetails.price
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
      
      const currSessionStorage = JSON.parse(sessionStorage.getItem("fo_dishes"));
      const newSessionStorage = currSessionStorage.filter(id => obj.dishDetails.id != id);
      sessionStorage.setItem("fo_dishes", JSON.stringify(newSessionStorage));
    });
  
    return rowDiv;
  }
  
  
  function createElement(selector, parent, attributes = {})
  {
    let classes = selector.split(".");
  
    let tagAndId = classes.shift();
    let [tag, id] = tagAndId.split("#");
    
    let element = document.createElement(tag);
  
    if(id)
      element.id = id;
    if(classes.length)
      element.classList.add(...classes);
    
    if(parent)
      parent.appendChild(element);
    
    for(let k in attributes)
      if(k in element)
        element[k] = attributes[k];
      else
        element.setAttribute(k, attributes[k]);
  
    return element;
  }
  
  
  function updateTotalPrice()
  {
    let totalPrice = 0;
  
    for(let i = 0; i < menuRows.length; i++)
      totalPrice += menuRows[i].dataset.dishPrice * menuRows[i].querySelector(".cart-quantity-input").value;	
  
    cartTotalPrice.innerText = "บาท" + totalPrice;
  }
