document.addEventListener("DOMContentLoaded", () => {

    const logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {
        window.location.href = "/index.html";
    });

    const storedProduct = localStorage.getItem("product");

    if (storedProduct) {
        // Parse the JSON string to get the product object
        const product = JSON.parse(storedProduct);

        // Log the product information to the console
        console.log("Product information from storejs:", product);

        // Update the product name
        document.querySelector(".product_name").textContent = product.name;

        // Update the product image
        const productImage = document.querySelector(".product_image_price img");
        productImage.src = product.image;
        productImage.alt = product.name;

        // Update the product price
        document.querySelector(".product_price").textContent = `Price: R${product.price}`;

        // Update the product description
        const productDetailsContainer = document.querySelector(".product_details");
        productDetailsContainer.innerHTML = ""; // Clear any existing content
        product.description.forEach(detail => {
            const detailElement = document.createElement("li");
            detailElement.className = "product_detail";
            detailElement.textContent = detail;
            productDetailsContainer.appendChild(detailElement);
        });

        // Add to cart functionality
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

            document.querySelector(".add_to_cart_button").addEventListener("click", () => {
                itemCount++;
                updateCartDisplay();
            });

            if (itemCount > 0) {
                document.querySelector(".decrement_button").addEventListener("click", () => {
                    if (itemCount > 0) {
                        itemCount--;
                        updateCartDisplay();
                    }
                });
            }
        }
    } else {
        console.log("No product information found in localStorage.");
    }
});