import { products } from '/js/products.js';
import { artPrompts } from '/js/art_prompts.js';
import { insertSearchBar } from '/js/search_bar.js';

$(document).ready(function() {
    // Insert the search bar into the specified container
    insertSearchBar('.search-bar');

    const sortSelect = $('#sort-select');
    const productList = $('.product-listing');
    const potdSection = $('.product-otd');
    const inspoHeading = $('.inspo-heading');
    const inspoContent = $('.inspo-content');
    let lastPromptIndex = -1;

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const blurValue = Math.min(scrollTop / 20, 10); // Fully blurred at 200px
        const shadowValue = Math.min(scrollTop / 20, 10); // Strongest shadow at 200px
        const shadowOpacity = Math.min(scrollTop / 200, 0.2); // Opacity increases with scroll, max 0.2

        $('.the-blur').css({
            'backdrop-filter': `blur(${blurValue}px)`,
            'box-shadow': `0 4px ${shadowValue}px rgba(0, 0, 0, ${shadowOpacity})`,
            'background-color': `rgba(210, 210, 210, ${shadowOpacity})`
        });

        $('#search-results').css({
            'backdrop-filter': `blur(${blurValue}px)`,
            'box-shadow': `0 4px ${shadowValue}px rgba(0, 0, 0, ${shadowOpacity})`,
            'background-color': `rgba(210, 210, 210, ${shadowOpacity})`
        });
    });

    function fuzzySearch(term) {
        const lowerCaseTerm = term.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseTerm) ||
            product.type.toLowerCase().includes(lowerCaseTerm)
        );
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

    function trimDescription(description, wordLimit) {
        const words = String(description).split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    }

    function renderProducts(filteredProducts = products) {
        productList.empty(); // Clear existing products

        if (filteredProducts.length === 0) {
            // Display "No results found" message if no products match the search term
            const noResultsElement = $('<div>').addClass('no-results').text('No results found');
            productList.append(noResultsElement);
            return;
        }

        filteredProducts.forEach((product) => {
            const trimmedDescription = trimDescription(product.description, 20);
            const productCard = $(`
                <div class="product-card">
                    <img class="product-img" src="${product.image}" alt="${product.name}" />
                    <div class="product-info-container">
                        <div class="name">${product.name}</div>
                        <div class="description">${trimmedDescription}</div>
                        <div class="price-wishlist">
                            <div class="price important-text">R${product.price.toFixed(2)}</div>
                            <div class="wishlist">
                                <img class="wishlist-icon" src="${product.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png'}" alt="Add to wishlist" />
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Add event listener to toggle wishlist status and icon
            productCard.find('.wishlist').on('click', function(event) {
                event.stopPropagation(); // Prevent triggering the product card click event
                product.wishlist = !product.wishlist; // Toggle wishlist status
                const wishlistIcon = $(this).find('.wishlist-icon');
                wishlistIcon.attr('src', product.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png');
            });

            // Add event listener to go to product page
            productCard.on('click', function() {
                const scrollPos = productList.scrollTop();
                localStorage.setItem('scrollPos', scrollPos);
                localStorage.setItem('product', JSON.stringify(product));
                window.location.href = 'product.html';
            });

            productList.append(productCard);
        });

        setScrollPos();
    }

    function setScrollPos() {
        if (localStorage.length > 0) {
            const scrollPos = localStorage.getItem('scrollPos');
            if (scrollPos) {
                productList.scrollTop(scrollPos);
            }
            localStorage.clear();
        }
    }

    function handleSearch() {
        const searchTerm = $('#search-input').val().trim();
        const filteredProducts = fuzzySearch(searchTerm);
        const sortBy = sortSelect.val();
        const sortedProducts = sortProducts(filteredProducts, sortBy);
        renderProducts(sortedProducts);
    }

    // Attach the handleSearch function to the search button click event
    $('#search-icon').on('click', handleSearch);
     $('#search-input').on('keypress', function(e) {
        if (e.which === 13) { // 13 is the Enter key
            handleSearch();
        }
    });

    sortSelect.on('change', handleSearch);

    function renderProductOfTheDay() {
        const potdProduct = products[products.length - 1]; // Assuming the last product in the array is the "Product of the Day"
        const trimmedDescription = trimDescription(potdProduct.description, 20);

        const potdHtml = `
            <div class="product-card">
                <div class="potd">Product Of The day!</div>
                <img class="product-img" src="${potdProduct.image}" alt="${potdProduct.name}" />
                <div class="name">${potdProduct.name}</div>
                <div class="description">${trimmedDescription}</div>
                <div class="price-wishlist">
                    <div class="price important-text">R${potdProduct.price.toFixed(2)}</div>
                    <div class="wishlist">
                        <img class="wishlist-icon" src="${potdProduct.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png'}" alt="Add to wishlist" />
                    </div>
                </div>
            </div>
        `;

        potdSection.html(potdHtml);

        const potdWishlistButton = potdSection.find('.wishlist');
        const potdWishlistIcon = potdWishlistButton.find('.wishlist-icon');

        // Add event listener to toggle wishlist status and icon
        potdWishlistButton.on('click', function() {
            potdProduct.wishlist = !potdProduct.wishlist; // Toggle wishlist status
            potdWishlistIcon.attr('src', potdProduct.wishlist ? '/media/images/wishliston.png' : '/media/images/wishlistoff.png');
        });
    }

    function getRandomPrompt() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * artPrompts.length);
        } while (randomIndex === lastPromptIndex);
        lastPromptIndex = randomIndex;
        return artPrompts[randomIndex];
    }

    function setRandomPrompt() {
        const newPrompt = getRandomPrompt();
        inspoContent.text(newPrompt);
    }

    inspoHeading.on('click', function() {
        setRandomPrompt();
    });

    setRandomPrompt(); // Set initial random prompt

    renderProducts(); // Initial render of all products
    renderProductOfTheDay(); // Render the product of the day
});