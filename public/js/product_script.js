import { products } from './products.js';

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const searchInput = document.querySelector(".search-input");
    const searchDropdown = document.querySelector(".search-dropdown");

    logo.addEventListener("click", () => {
        window.location.href = "/index.html";
    });

    const storedProduct = localStorage.getItem("product");

    if (storedProduct) {
        const product = JSON.parse(storedProduct);
        loadProductData(product);
    }

    searchInput.addEventListener("focus", () => {
        searchDropdown.style.display = "block";
        updateDropdown();
    });

    searchInput.addEventListener("input", updateDropdown);

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".searchbar")) {
            searchDropdown.style.display = "none";
        }
    });

    function updateDropdown() {
        const query = searchInput.value.toLowerCase();
        searchDropdown.innerHTML = "";
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query)
        ).slice(0, 4);
        filteredProducts.forEach(product => {
            const item = document.createElement("div");
            item.className = "search-dropdown-item";
            item.textContent = `${product.name} - R${product.price}`;
            item.addEventListener("click", () => {
                loadProductData(product);
                searchDropdown.style.display = "none";
            });
            searchDropdown.appendChild(item);
        });
    }

    function loadProductData(product) {
        
        console.log("Product information from storejs:", product);

        
        document.querySelector(".product_name").textContent = product.name;

        
        const productImage = document.querySelector(".product_image_price img");
        productImage.src = product.image;
        productImage.alt = product.name;

        
        document.querySelector(".product_price").textContent = `Price: R${product.price}`;

        
        const productDetailsContainer = document.querySelector(".product_details");
        productDetailsContainer.innerHTML = ""; 
        product.description.forEach(detail => {
            const detailElement = document.createElement("li");
            detailElement.className = "product_detail";
            detailElement.textContent = detail;
            productDetailsContainer.appendChild(detailElement);
        });

        
        const addToCartButton = document.querySelector(".add_to_cart_button");
        const addToCartContainer = document.querySelector(".add_to_cart");
        let itemCount = 0;

        addToCartButton.addEventListener("click", () => {
            itemCount++;
            updateCartDisplay();
        });

        function updateCartDisplay() {
            addToCartContainer.innerHTML = `
                <button class="add_to_cart_button">Add to Cart</button>
                <div class="number_of_items">${itemCount}</div>
            `;

            if (itemCount > 0) {
                addToCartContainer.innerHTML += `
                    <button class="decrement_button">-</button>
                `;
            }
        }
    }
});