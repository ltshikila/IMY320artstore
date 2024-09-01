import { products } from '/js/products.js';

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-icon");
    const sortSelect = document.querySelector("#sort-select");
    const productList = document.querySelector(".productlist");

    function fuzzySearch(term) {
      const lowerCaseTerm = term.toLowerCase();
  
      return products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseTerm) ||
        product.type.toLowerCase().includes(lowerCaseTerm)
      );
    }
    
    function setScrollPos (){
        if (localStorage.length > 0) {
            const scrollPos = localStorage.getItem("scrollPos");
            if (scrollPos) {
                productList.scrollTop = scrollPos;
            }
            localStorage.clear();
        }
    }

    function sortProducts(products, sortBy) {
        switch (sortBy) {
          case 'name-asc':
            return products.sort((a, b) => a.name.localeCompare(b.name));
          case 'name-desc':
            return products.sort((a, b) => b.name.localeCompare(a.name));
          case 'price-asc':
            return products.sort((a, b) => a.price - b.price);
          case 'price-desc':
            return products.sort((a, b) => b.price - a.price);
          default:
            return products;
        }
    }

    function renderProducts(filteredProducts = products) {
        const productlist = document.getElementById("productlist");
        productlist.innerHTML = ""; // Clear existing products
        
        if (filteredProducts.length === 0) {
            // Display "No results found" message if no products match the search term
            const noResultsElement = document.createElement("div");
            noResultsElement.classList.add("no-results");
            noResultsElement.textContent = "No results found";
            productlist.appendChild(noResultsElement);
            return;
          }

        filteredProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("item");

        // Determine initial wishlist icon based on the product's wishlist status
        const wishlistIconSrc = product.wishlist ? "./media/images/wishliston.png" : "./media/images/wishlistoff.png";

        productElement.innerHTML = `
            <div class="product-details">
            <img class="image" src="${product.image}" alt="${product.name}" />
            <div class="product-info">
                <div class="title">${product.name}</div>
                <div class="type">${product.type}</div>
                <div class="price">R${product.price.toFixed(2)}</div>
            </div>
            </div>
            <button class="wishlist">
            <img class="wishlisticon" src="${wishlistIconSrc}" alt="Wishlist" />
            </button>
        `;

        const wishlistButton = productElement.querySelector(".wishlist");

        // Add event listener to toggle wishlist status and icon
        wishlistButton.addEventListener("click", () => {
            product.wishlist = !product.wishlist; // Toggle wishlist status

            const wishlistIcon = wishlistButton.querySelector(".wishlisticon");
            wishlistIcon.src = product.wishlist ? "./media/images/wishliston.png" : "./media/images/wishlistoff.png";
        });

        //Add event listener to go to product page

        productElement.addEventListener("click", () => {
            const productPage = document.getElementById("productpage");
            //send the description through to the page. file name is product.html
            const scrollPos = productList.scrollTop;
            localStorage.setItem("scrollPos", scrollPos);
            localStorage.setItem("product", JSON.stringify(product));
            window.location.href = "product.html";
        });

        productlist.appendChild(productElement);
        });

        setScrollPos();
        
    }

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        const filteredProducts = fuzzySearch(searchTerm);
        const sortBy = sortSelect.value;
        const sortedProducts = sortProducts(filteredProducts, sortBy);
        renderProducts(sortedProducts);
    }

    // Set up the search functionality
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
        handleSearch();
        }
    });

    sortSelect.addEventListener("change", () => {
        const searchTerm = searchInput.value.trim();
        const filteredProducts = fuzzySearch(searchTerm);
        const sortBy = sortSelect.value;
        const sortedProducts = sortProducts(filteredProducts, sortBy);
        renderProducts(sortedProducts);
    });


    function renderProductOfTheDay() {
        const potdSection = document.querySelector(".potd");
        const potdProduct = products[products.length - 1]; // Assuming the last product in the array is the "Product of the Day"

        // Set POTD details
        potdSection.querySelector(".potd-image").src = potdProduct.image;
        potdSection.querySelector(".potd-image").alt = potdProduct.name;
        potdSection.querySelector(".potd-title").textContent = potdProduct.name;
        potdSection.querySelector(".potd-type").textContent = potdProduct.type;
        potdSection.querySelector(".potd-price").textContent = `R${potdProduct.price.toFixed(2)}`;

        const potdWishlistButton = potdSection.querySelector(".wishlist");
        const potdWishlistIcon = potdWishlistButton.querySelector(".wishlisticon");

        // Set initial icon based on the wishlist status
        potdWishlistIcon.src = potdProduct.wishlist ? "./media/images/wishliston.png" : "./media/images/wishlistoff.png";

        // Add event listener to toggle wishlist status and icon
        potdWishlistButton.addEventListener("click", () => {
        potdProduct.wishlist = !potdProduct.wishlist; // Toggle wishlist status

        if (potdProduct.wishlist) {
            potdWishlistIcon.src = "./media/images/wishliston.png"; // Set to wishlist active icon
        } else {
            potdWishlistIcon.src = "./media/images/wishlistoff.png"; // Set to wishlist inactive icon
        }
        });
    }

    renderProducts(); // Initial render of all products
    renderProductOfTheDay();
});
  
  