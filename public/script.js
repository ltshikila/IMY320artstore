let products = [
    {
        name: "14 Short Flat Daler Rowney Georgian Brush",
        type: "Paint brush",
        price: 345.00,
        image:"https://myartshop.co.za/wp-content/smush-webp/2023/01/G36Size14-rotated-1.jpg.webp",
        wishlist: false,
        description:[
            "Oil painting calls for resilient, durable and sturdy hog bristle brushes that have good color retention and are easy to use.",
            "Daler-Rowney Georgian Brushes feature extra-fine quality Chungking bristles, with a high percentage of natural flags for maximum colour holding and smooth flexible strokes.",
            "They are handmade using traditional interlocked construction for durability and control.",
            "They have been engineered to offer the best selection of oil paint brushes in the market for art students and professionals.",
            "The Short Flat Daler Rowney Georgian Brushes are the perfect choice for applying thick paint for strong stroke definition, heavy impasto work and short strokes.",
            "Traditional interlocked construction for durability and control.",
            "Natural hair.",
            "Ideal for oil.",
        ]
    },
    {
        name: "12″ Pro Art Manikin Female",
        type: "Mannequin",
        price: 130.00,
        image:"https://myartshop.co.za/wp-content/uploads/2023/09/12-pro-art-manikin-female-01.webp",
        wishlist: false,
        description:[
            "The 12″ Pro Art Manikin Male is a fully adjustable manikin with a sturdy base and functioning, rotating joints.",
            "These manikins are an indispensable aid for drawing and sculpting because, without years of practice, depicting the human figure accurately can be extremely challenging. This manikin will help artists learn about posing, proportions, and light in terms of the human form.",
            "Available in Male and Female forms",
            "12″ in height."
        ]
    },
    {
        name: "12’s Oil Prime Art Paint Set",
        type: "Paint set",
        price: 155.00,
        image:"https://myartshop.co.za/wp-content/smush-webp/2023/01/Oil12b.jpg.webp",
        wishlist: false,
        description:[
            "Prime Art colour sets offer convenient, high quality artist colour in value for money assorted box sets",
            "Highly pigmented colours available in a 12ml tubes",
            "Available in sets of 12’s and 18’s",
        ]
    },
    {
        name: "Dala Glow in the Dark Paint 100ml",
        type: "Paint sets",
        price: 135.00,
        image:"https://myartshop.co.za/wp-content/uploads/2024/01/dala-glow-in-the-dark-apint-100ml.webp",
        wishlist: false,
        description:[
            "Dala Glow in the Dark paint has a creamy consistency, is water soluble and non toxic.",
            "It has fantastic light emission in the dark and will also glow brightly under UV light.",
            "100ml bottle.",
        ]
    },
    {
        name: "Chestnut Brown Pinty Plus Chalk Spray Paint",
        type: "Spray paint",
        price: 175.00,
        image:"https://myartshop.co.za/wp-content/smush-webp/2023/01/Chestnut.jpg.webp",
        wishlist: false,
        description:[
            "Ever wondered how to get that lovely chalky finish on your furniture and other interior decorative items?",
            "It provides an ultra-matt finish with a velvety appearance to give you the softened, vintage touch you desire",
            "This fast drying, water-based formulation is environmentally respectful and offers maximum coverage on many surfaces",
            "Perfect for any surface including expanded polystyrene",
            "It can be washed with soap and water within the first 15 minutes",
            "Maximum coverage and fast drying.",
        ]
    },
    {
        name: "Prime Art Compact Wooden Table Easel – H Frame",
        type: "Easel",
        price: 599.00,
        image:"https://myartshop.co.za/wp-content/uploads/2023/01/Prime-Art-Compact-Wooden-Table-Easel-H-Frame-01.webp",
        wishlist: false,
        description:[
            "The Prime Art Compact Wooden Table Easel – H Frame is a medium sized adjustable H-frame wooden table easel for small to medium sized canvas.",
            "It is made of Oiled Beechwood with Brass-plated hardware for long-lasting durability.",
            "The adjustable height supports canvases up to 53cm /  20inches in height.",
            "The Prime Art Compact Wooden Table Easel – H Frame is able to tilt both forward and backward. Tilt it forward to help reduce glare and remove excess dust or pastel from your artwork and backward for better perspective, control and comfort.",
            "It measures 28cm x 32cm x 74cm.",
            "The extended easel height is 96cm.",
            "Durable, stable and portable",
            "Comes flat packed",
        ]
    },
    {
        name: "4″ x 4″ Artboard Professional Box Canvas",
        type: "Canvas",
        price: 40.00,
        image:"https://myartshop.co.za/wp-content/uploads/2024/08/4-x-4-artboard-professional-box-canvas.webp",
        wishlist: false,
        description:[
            "Artboard Professional Box Canvases are 380gsm, 100% cotton thick stretched canvas that are triple primed with acrylic gesso.",
            "These canvases offer you a true archival quality surface for your Oil or Acrylic paintings.",
            "Measurements are in inches.",
            "Highest standard pine frame, offering excellent rigidity and support.",
            "Medium Grain Canvas.",
            "Artboard Professional Box Canvases are available in a variety of different sizes.",
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-icon");
    
    function fuzzySearch(term) {
      const lowerCaseTerm = term.toLowerCase();
  
      return products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseTerm) ||
        product.type.toLowerCase().includes(lowerCaseTerm)
      );
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

        productlist.appendChild(productElement);
        });

        
    }

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        const filteredProducts = fuzzySearch(searchTerm);
        renderProducts(filteredProducts);
    }

    // Set up the search functionality
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
        handleSearch();
        }
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
  
  