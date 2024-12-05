function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  menu.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
}

function toggleCart() {
  const cart = document.getElementById("cart_page");
  if (cart.classList.contains("hidden")) {
    cart.classList.remove("hidden");
    setTimeout(() => {
      cart.classList.remove("opacity-0");
      cart.classList.add("opacity-100");
    }, 20);
  } else {
    cart.classList.remove("opacity-100");
    cart.classList.add("opacity-0");
    setTimeout(() => {
      cart.classList.add("hidden");
    }, 300);
  }
}

function plusQuantity() {
  const quantity = document.getElementById("quantity");
  quantity.value = parseInt(quantity.value) + 1;
}

function lessQuantity() {
  const quantity = document.getElementById("quantity");
  if (parseInt(quantity.value) > 0) {
    quantity.value = parseInt(quantity.value) - 1;
  }
}

function addCart(e) {
  e.preventDefault();

  const quantity = parseInt(document.getElementById("quantity").value);
  const cart = document.getElementById("cart_page");
  const cartBadge = document.getElementById("cart-badge");

  // Ajoutez l'article au panier (logique existante)
  const cartMessage = cart.getElementsByTagName("p")[0];
  if (cartMessage && cartMessage.textContent === "Your cart is empty.") {
    cartMessage.remove();
  }

  if (quantity > 0) {
    const existingItem = cart.querySelector(".fall-limited-item");

    if (!existingItem) {
      const cartAdd = document.createElement("div");
      cartAdd.classList.add("fall-limited-item");

      cartAdd.innerHTML = `
          <div class="flex items-center text-gray-500 mb-4">
            <img src='/images/image-product-1.jpg' alt='' class='w-12 h-12 rounded'>
            <div class="flex flex-col px-4">
              <h3>Fall Limited Edition Sneakers</h3>
              <p class="quantite-cart">$125 x ${quantity} = <span class="font-extrabold text-black">$${
        125 * quantity
      }</span></p>
            </div>
            <button class="delete-btn" aria-label="Delete item">
              <img src='/images/icon-delete.svg' alt='' class='w-5 h-5 rounded'>
            </button>        
          </div>
        `;
      cart.appendChild(cartAdd);

      const deleteButton = cartAdd.querySelector(".delete-btn");
      deleteButton.addEventListener("click", deleteItem);
    } else {
      const quantityText = existingItem.querySelector(".quantite-cart");
      quantityText.innerHTML = `$125 x ${quantity} = <span class="font-extrabold text-black">$${
        125 * quantity
      }</span>`;
    }

    // Mettez à jour le badge
    cartBadge.textContent = quantity;

    // Affichez le badge et ajoutez l'animation
    cartBadge.classList.remove("hidden");
    cartBadge.classList.add("animate-ping");

    // Retirez l'animation après un moment
    setTimeout(() => {
      cartBadge.classList.remove("animate-ping");
    }, 500);
  }
}

function deleteItem(e) {
  const cart = document.getElementById("cart_page");
  const itemToRemove = e.target.closest(".fall-limited-item");

  cart.removeChild(itemToRemove);

  const emptyMessage = document.createElement("p");
  emptyMessage.textContent = "Your cart is empty.";
  cart.appendChild(emptyMessage);
}

function next() {
  const image = document.getElementById("image_principale");
  let thenum = image.src.match(/(\d+)(?!.*\d)/);
  let currentImageNumber = thenum ? parseInt(thenum[0]) : 1;

  if (currentImageNumber === 1) {
    image.src = "images/image-product-2.jpg";
  } else if (currentImageNumber === 2) {
    image.src = "images/image-product-3.jpg";
  } else if (currentImageNumber === 3) {
    image.src = "images/image-product-4.jpg";
  } else {
    image.src = "images/image-product-1.jpg";
  }
}

function previous() {
  const image = document.getElementById("image_principale");
  let thenum = image.src.match(/(\d+)(?!.*\d)/);
  let currentImageNumber = thenum ? parseInt(thenum[0]) : 1;

  if (currentImageNumber === 1) {
    image.src = "images/image-product-4.jpg";
  } else if (currentImageNumber === 2) {
    image.src = "images/image-product-1.jpg";
  } else if (currentImageNumber === 3) {
    image.src = "images/image-product-2.jpg";
  } else {
    image.src = "images/image-product-3.jpg";
  }
}

function selectThumbnail(thumbnail, imageUrl) {
  const mainImage = document.getElementById("image_principale");
  mainImage.src = imageUrl;

  const thumbnails = document.querySelectorAll(".product");
  console.log(thumbnails);
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("border-orange-500", "opacity-50");
    thumb.classList.add("border-transparent");
  });

  thumbnail.classList.remove("border-transparent");
  thumbnail.classList.add("border-orange-500", "opacity-50");
}
