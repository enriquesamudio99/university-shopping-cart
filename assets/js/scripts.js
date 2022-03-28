const addBtns = document.querySelectorAll('.course__add-btn');
const cart = document.querySelector('#cart');

const items = JSON.parse(localStorage.getItem("items"));

let shoppingCart = items || [];

document.addEventListener("DOMContentLoaded", () => {

    addBtns.forEach(addBtn => {
        addBtn.addEventListener("click", addCourse);
    });

    updateCartList();

});

function addCourse(e) {

    e.preventDefault();

    const courseSelected = e.target.parentElement.parentElement;

    const courseData = {
        imgPath: courseSelected.querySelector(".course__img").src,
        name: courseSelected.querySelector(".course__title").textContent,
        instructor: courseSelected.querySelector(".course__instructor").textContent,
        price: courseSelected.querySelector(".course__price").textContent
    }

    const alreadyAdded = shoppingCart.some(item => item.name === courseData.name);

    if(!alreadyAdded) {
        shoppingCart = [courseData, ...shoppingCart]; 
        updateCartList();
        localStorage.setItem("items", JSON.stringify(shoppingCart));
    }

}

function updateCartList() {

    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }

    updateBadget();

    if(shoppingCart.length !== 0) {
        
        const cartListEl = document.createElement('UL');
        cartListEl.classList.add("cart__list");

        shoppingCart.forEach(item => {
            const cartItemEl = document.createElement('LI');
            cartItemEl.classList.add("cart__item");

            // Cart Image
            const cartImgContainerEl = document.createElement('DIV');
            cartImgContainerEl.classList.add("cart__img-container");
            const cartImgEl = document.createElement('IMG');
            cartImgEl.classList.add("cart__img");
            cartImgEl.src = item.imgPath;
            cartImgEl.setAttribute("alt", `${item.name} Image`);
            cartImgContainerEl.appendChild(cartImgEl);

            // Cart Data
            const cartDataEl = document.createElement('DIV');
            cartDataEl.classList.add("cart__data");
            const cartTitleEl = document.createElement('H3');
            cartTitleEl.classList.add("cart__title");
            cartTitleEl.textContent = item.name;
            const cartInstructorEl = document.createElement('P');
            cartInstructorEl.classList.add("cart__instructor");
            cartInstructorEl.textContent = item.instructor;
            const cartPriceEl = document.createElement('P');
            cartPriceEl.classList.add("cart__price");
            cartPriceEl.textContent = item.price;
            cartDataEl.appendChild(cartTitleEl);
            cartDataEl.appendChild(cartInstructorEl);
            cartDataEl.appendChild(cartPriceEl);

            cartItemEl.appendChild(cartImgContainerEl);
            cartItemEl.appendChild(cartDataEl);

            cartListEl.appendChild(cartItemEl);

        });

        const total = shoppingCart.reduce((total, item) => total + +item.price.substring(0, item.price.length - 4), 0);

        const cartResumeEl = document.createElement('DIV');
        cartResumeEl.classList.add("cart__resume");
        const cartTotalEl = document.createElement('P');
        cartTotalEl.classList.add("cart__total");
        cartTotalEl.textContent = `Total: ${total} US$`;
        const cartRemoveEl = document.createElement('A');
        cartRemoveEl.setAttribute("href", "#");
        cartRemoveEl.classList.add("cart__remove-btn");
        cartRemoveEl.textContent = "Empty cart";
        cartRemoveEl.onclick = removeAllItems;

        cartResumeEl.appendChild(cartTotalEl);
        cartResumeEl.appendChild(cartRemoveEl);

        cart.appendChild(cartListEl);
        cart.appendChild(cartResumeEl);

    } else {

        const divEmptyCart = document.createElement('DIV');
        divEmptyCart.classList.add("cart__empty");
        const divEmptyCartText = document.createElement('P');
        divEmptyCartText.classList.add("cart__empty-text");
        divEmptyCartText.textContent = "Your cart is empty";

        divEmptyCart.appendChild(divEmptyCartText);

        cart.appendChild(divEmptyCart);
    } 

}

function updateBadget() {

    // Remove badget
    const badget = document.querySelector('.nav__link-badge');
    if (badget) {
        badget.remove();
    }

    if (shoppingCart.length !== 0) {
        const badgetEl = document.createElement('SPAN');
        badgetEl.classList.add("nav__link-badge");
        badgetEl.textContent = shoppingCart.length;

        const navLinkCart = document.querySelector('.nav__link--cart');
        navLinkCart.appendChild(badgetEl);
    }

}

function removeAllItems(e) {

    e.preventDefault();

    shoppingCart = [];
    localStorage.setItem("items", JSON.stringify([]));

    updateCartList();

}