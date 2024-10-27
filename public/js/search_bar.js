import { products } from '/js/products.js';

export function insertSearchBar(container) {
    const searchBarHTML = `
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="Search for products" />
            <img src="/media/icons/search.svg" alt="Search" id="search-icon" class="search-icon" />
            <div id="search-results" class="search-results"></div>
        </div>
    `;
    $(container).html(searchBarHTML);

    const searchInput = $('#search-input');
    const searchButton = $('#search-icon');
    const searchResults = $('#search-results');
    const searchBar = $('.search-bar');

    function fuzzySearch(term) {
        const lowerCaseTerm = term.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseTerm) ||
            product.type.toLowerCase().includes(lowerCaseTerm)
        );
    }

    function displaySearchResults(filteredProducts) {
        searchResults.empty(); // Clear existing results

        if (filteredProducts.length === 0) {
            searchResults.hide();
            searchBar.removeClass('expanded');
            return;
        }

        filteredProducts.forEach((product) => {
            const resultItem = $(`
                <div class="search-result-item">
                    ${product.name}
                </div>
            `);

            // Add event listener to go to product page
            resultItem.on('click', function() {
                localStorage.setItem('product', JSON.stringify(product));
                window.location.href = 'product.html';
            });

            searchResults.append(resultItem);
        });

        searchResults.show();
        searchBar.addClass('expanded');
    }

    searchButton.on('click', function() {
        const searchTerm = searchInput.val().trim();
        const filteredProducts = fuzzySearch(searchTerm);
        displaySearchResults(filteredProducts);
    });

    searchInput.on('input', function() {
        const searchTerm = $(this).val().trim();
        if (searchTerm === '') {
            searchResults.hide();
            searchBar.removeClass('expanded');
        } else {
            const filteredProducts = fuzzySearch(searchTerm);
            displaySearchResults(filteredProducts);
        }
    });

    searchInput.on('keypress', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.val().trim();
            const filteredProducts = fuzzySearch(searchTerm);
            displaySearchResults(filteredProducts);
        }
    });

    // Hide search results when clicking outside the search bar
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-bar').length) {
            searchResults.hide();
            searchBar.removeClass('expanded');
        }
    });

    // Hide search results when pressing the Escape key
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
            searchResults.hide();
            searchBar.removeClass('expanded');
        }
    });
}