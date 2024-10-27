import { products } from '/js/products.js';
import { artPrompts } from '/js/art_prompts.js';
import { insertSearchBar } from '/js/search_bar.js';

$(document).ready(function() {
    insertSearchBar('.search-bar');

    const logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        // Propagate local storage back to the index page
        window.location.href = "/index.html";
    });

    const selectedProduct = localStorage.getItem("product");
    const currentProduct = JSON.parse(selectedProduct);
    var totalPrice = 0;

    // <div class="name">${currentProduct.name}</div>
    $(`.page-heading`).text(currentProduct.name);

    const productCard = $(`
        <div class="product-card">
            <img class="product-img" src="${currentProduct.image}" alt="${currentProduct.name}" />
            <div class="product-info-container">
                <div class="description">${formatDescription(currentProduct.description)}</div>
                <div class="price important-text">R${currentProduct.price.toFixed(2)}</div>
            </div>
        </div>
    `);

    // Add the product card to the page
    $('.product-info').append(productCard);

    const currentProductType = currentProduct.type;

    console.log("Product information from storejs:", currentProductType);

    // Find all products of the same type
    const similarProducts = products.filter(product => product.type === currentProductType && product.name !== currentProduct.name);
    console.log("Similar products", similarProducts);

    // Render similar products
    const similarProductsSection = $('.sp-content');
    similarProductsSection.empty(); // Clear existing similar products

    similarProducts.forEach(simProduct => {
        const trimmedDescription = trimDescription(simProduct.description, 20);
        const productCard = $(`
            <div class="product-card">
                <img class="product-img" src="${simProduct.image}" alt="${simProduct.name}" />
                <div class="name">${simProduct.name}</div>
                <div class="description">${trimmedDescription}</div>
                <div class="price-wishlist">
                    <div class="price important-text">R${simProduct.price.toFixed(2)}</div>
                    <div class="wishlist">
                        <img class="wishlist-icon" src="${simProduct.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png'}" alt="Add to wishlist" />
                    </div>
                </div>
            </div>
        `);

        // Add event listener to toggle wishlist status and icon
        productCard.find('.wishlist').on('click', function(event) {
            event.stopPropagation(); // Prevent triggering the product card click event
            simProduct.wishlist = !simProduct.wishlist; // Toggle wishlist status
            const wishlistIcon = $(this).find('.wishlist-icon');
            wishlistIcon.attr('src', simProduct.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png');
        });

        // Add event listener to go to product page
        productCard.on('click', function() {
            localStorage.setItem('product', JSON.stringify(simProduct));
            window.location.href = 'product.html';
        });

        similarProductsSection.append(productCard);
    });

    // Add the cart UI
    const cartUI = $(`
        <div class="price-wishlist">
            <div class="actions-container">
                <div class="total-price">R${totalPrice}</div>
                <button class="add-to-cart">Add to Cart</button>
                <div class="item-counter">${getItemCount(currentProduct.itemID) || 0}</div>
                <div class="remove-item"></div>
            </div>
        </div>
        <div class="cart-contents">
            It's empty in here
        </div>
        <div class="cart-actions">
            <button class="checkout">Checkout</button>
            <button class="empty-cart">Empty Cart</button>
        </div>
    `);

    $('.cart').append(cartUI);

    // Get item count from local storage
    function getItemCount(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.itemID === productId);
        return item ? item.itemCounter : 0;
    }

    // Update item count in local storage
    function updateItemCount(productId, count) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.itemID === productId);
        if (itemIndex > -1) {
            if (count > 0) {
                cart[itemIndex].itemCounter = count;
            } else {
                cart.splice(itemIndex, 1); // Remove item if count is 0
            }
        } else if (count > 0) {
            cart.push({ itemID: productId, itemCounter: count });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update the total price
    function updateTotalPrice() {
        let tp = 0;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(cartItem => {
            const product = products.find(p => p.itemID === cartItem.itemID);
            if (product) {
                tp += product.price * cartItem.itemCounter;
            }
        });
        console.log("Total price", tp);
        totalPrice = tp;
        $('.total-price').text(`R${totalPrice.toFixed(2)}`);
    }

    // Add to Cart button click event
    $('.add-to-cart').on('click', function() {
        let itemCount = getItemCount(currentProduct.itemID) + 1;
        $('.item-counter').text(itemCount);
        updateItemCount(currentProduct.itemID, itemCount);
        updateTotalPrice();
        toggleRemoveButton();
        renderCartContents();
    });

    // Remove Item button click event
    $('.remove-item').on('click', function() {
        let itemCount = getItemCount(currentProduct.itemID);
        if (itemCount > 0) {
            itemCount -= 1;
            $('.item-counter').text(itemCount);
            updateItemCount(currentProduct.itemID, itemCount);
            updateTotalPrice();
            toggleRemoveButton();
            renderCartContents();
        }
    });

    // Empty Cart button click event
    $('.empty-cart').on('click', function() {
        localStorage.setItem('cart', JSON.stringify([]));
        updateTotalPrice();
        renderCartContents();
        toggleRemoveButton();
    });

    // Toggle the visibility of the Remove Item button
    function toggleRemoveButton() {
        if (getItemCount(currentProduct.itemID) > 0) {
            $('.remove-item').html('<button class="remove-from-cart">-</button>');
        } else {
            $('.remove-item').empty();
        }
    }

    // Render cart contents
    function renderCartContents() {
        const cartContents = $('.cart-contents');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContents.empty(); // Clear existing cart contents

        if (cart.length === 0) {
            cartContents.text("It's empty in here");
            return;
        }

        cart.forEach(cartItem => {
            const product = products.find(p => p.itemID === cartItem.itemID);
            if (product && cartItem.itemCounter > 0) {
                const itemTotalPrice = product.price * cartItem.itemCounter;
                const cartItemUI = $(`
                    <div class="selected-item">
                        <img src="${product.image}" />
                        <div class="name-and-price">
                            <div>
                                ${product.name}
                            </div>
                            <div>
                                ${cartItem.itemCounter} x R${product.price.toFixed(2)} = R${itemTotalPrice.toFixed(2)}
                            </div>
                        </div>
                        <img src="media/icons/cross.svg" class="remove-item-cross" data-id="${product.itemID}" />
                    </div>
                `);

                // Add event listener to remove item from cart
                cartItemUI.find('.remove-item-cross').on('click', function() {
                    let itemCount = getItemCount(product.itemID);
                    if (itemCount > 0) {
                        itemCount -= 1;
                        updateItemCount(product.itemID, itemCount);
                        renderCartContents();
                        updateTotalPrice();
                        $('.item-counter').text(getItemCount(currentProduct.itemID));
                        toggleRemoveButton();
                    }
                });

                cartContents.append(cartItemUI);
            }
        });
    }

    // Initial setup
    updateTotalPrice();
    toggleRemoveButton();
    renderCartContents();

    function formatDescription(description) {
        if (Array.isArray(description)) {
            return description.map(item => `<p>• ${item}</p>`).join('');
        }
        return description;
    }

    function trimDescription(description, wordLimit) {
        const words = String(description).split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    }
});