const button = document.querySelectorAll(".get-data");
const menuCount = document.querySelector("#menu-count");

let menuCounter = 0

let menus = JSON.parse(sessionStorage.getItem("fo_menus"));
let menusLength = 0;
if (menus != null)
  menusLength = menus.length;
else
  menus = [];

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener
    (
      "click",
      () => {
        let menuId = button[i].value;
      
        if (button[i].innerText === "ADD TO CART") {
          menus.push(menuId);
          sessionStorage.setItem("fo_menus", JSON.stringify(menus));

          menuCounter++;
          menuCount.innerText = menuCounter;

          button[i].innerText = "ADDED";
        }
        else {
          menus = menus.filter(menu => menuId != menu);
          sessionStorage.setItem("fo_menus", JSON.stringify(menus));

          menuCounter--;
          menuCount.innerText = menuCounter;

          button[i].innerText = "ADD TO CART";
        }
      }
    );
}

window.addEventListener
  (
    "load",
    () => {
      const menusArr = JSON.parse(sessionStorage.getItem("fo_menus"));

      if (menusArr && menusArr.length > 0) {
        for (let i = 0; i < button.length; i++) {
          for (let j = 0; j < menusArr.length; j++) {
            if (menusArr[j] === button[i].value) {
              button[i].innerHTML = "ADDED";
              menuCounter++;
            }
          }
        }

        menuCount.innerText = menuCounter;
      }
    }
  );