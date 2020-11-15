const cartItems = document.querySelector(".cart-items");
const cartTotalPrice = document.querySelector(".cart-total-price");

let menuRows = [];

window.addEventListener("load", async function onPlace_Order() {
	const menu = JSON.parse(sessionStorage.getItem("fo_menus"));

	if (menu && menu.length > 0) {
		const response = await fetch(
			//เปลี่ยนไอดีร้าน
			`/endpoints/dOro/menuDetails`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ menu }),
			}
		);

		const details = await response.json();
		//log Order Details
		console.log("detail", details);

		for (let i = 0; i < details.menuDetails.length; i++) {
			menuRows[i] = makeRow(details.menuDetails[i]);
			cartItems.appendChild(menuRows[i]);
		}
	}

	updateTotalPrice();
});

function makeRow(obj) {
	const rowDiv = createElement("div.cart-row", null, {
		"data-menu-id": obj.menuId,
		"data-menu-name": obj.menuName,
		"data-menu-price": obj.price,
	});

	createElement("span.cart-item-title.cart-column", rowDiv, {
		innerText: obj.menuName,
	});

	createElement("span.cart-item-title.cart-column", rowDiv, {
		innerText: obj.menuName,
	});

	createElement("span.cart-price.cart-column", rowDiv, {
		innerText: "฿" + obj.price,
	});

	const div = createElement("div.cart-quantity.cart-column", rowDiv);

	createElement("input.cart-quantity-input", div, {
		type: "number",
		value: 1,
		min: 1,
	}).addEventListener("change", updateTotalPrice);

	createElement("button.btn.btn-danger", div, {
		type: "submit",
		innerText: "Remove",
	}).addEventListener("click", () => {
		rowDiv.remove();

		menuRows = menuRows.filter((e) => !rowDiv.isSameNode(e));
		updateTotalPrice();

		const currSessionStorage = JSON.parse(sessionStorage.getItem("fo_menus"));
		const newSessionStorage = currSessionStorage.filter((id) => obj.id != id);
		sessionStorage.setItem("fo_menus", JSON.stringify(newSessionStorage));
	});

	return rowDiv;
}

function createElement(selector, parent, attributes = {}) {
	let classes = selector.split(".");

	let tagAndId = classes.shift();
	let [tag, id] = tagAndId.split("#");

	let element = document.createElement(tag);

	if (id) element.id = id;
	if (classes.length) element.classList.add(...classes);

	if (parent) parent.appendChild(element);

	for (let k in attributes)
		if (k in element) element[k] = attributes[k];
		else element.setAttribute(k, attributes[k]);

	return element;
}

function updateTotalPrice() {
	let totalPrice = 0;
	let serviceCharge = 10;

	for (let i = 0; i < menuRows.length; i++) {
		totalPrice +=
			menuRows[i].dataset.menuPrice * menuRows[i].querySelector(".cart-quantity-input").value;
		totalPriceandService = totalPrice + serviceCharge;
	}
	cartTotalPrice.innerText = "฿" + totalPriceandService;
}

async function onPlace_Order() {
	const cus_note = document.getElementById("noteToSender").value;
	const cus_phoneno = document.getElementById("phoneno").value;
	const location = document.getElementById("location");
	const locationText = location.options[location.selectedIndex].text;


	document.getElementById("hid-location").innerHTML = locationText;

	//menuArr
	let restMenu = [];

	for (let i = 0; i < menuRows.length; i++) {
		restMenu.push({
			id: menuRows[i].dataset.menuId,
			price: menuRows[i].dataset.menuPrice,
			qty: menuRows[i].querySelector(".cart-quantity-input").value || 1,
			totalPrice:
				menuRows[i].dataset.menuPrice * menuRows[i].querySelector(".cart-quantity-input").value,
		});
	}

	console.log("Location  ", locationText);
	console.log("restMenu  ", restMenu);
	console.log("cus_note  ", cus_note);
	console.log("phoneNo  ", cus_phoneno);

	const response = await fetch(
		//เปลี่ยนไอดีร้าน
		`/endpoints/dOro/order`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ restMenu, cus_note, cus_phoneno, locationText }),
		}
	);

	console.log("response :", response);
}
