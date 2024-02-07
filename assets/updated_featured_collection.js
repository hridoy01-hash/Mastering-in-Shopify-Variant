document.querySelectorAll(".product_modal_open").forEach((seeVariant) => {
    seeVariant.addEventListener("click", function () {
        document.querySelector(".product_popup_container").style.display = `block`;
        const productHandle = seeVariant.getAttribute('product-handle');
        const shopCurrency = seeVariant.getAttribute('shop-currency');
        console.log(("shopCurrency", shopCurrency));
        console.log("productHandle", productHandle);

        singleProduct(productHandle);
        async function singleProduct(item) {
            try {
                const response = await fetch(`/products/${item}.js`);
                const product = await response.json();
                console.log("product quick", product);

                // product image
                document.querySelector(".popup_display_img").src = `${product.featured_image}`;
                document.querySelector(".popup_product__name").textContent = `${product.title}`;
                document.querySelector(".popup_compare__price ").textContent = formatMoney(product.compare_at_price, shopCurrency);
                document.querySelector(".popup_discount__price ").textContent = formatMoney(product.price, shopCurrency);
                const liquidDescription = `${product.description}`;
                document.querySelector(".product__description ").textContent = liquidDescription.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '');

                // Function to calculate the discount percentage
                function calculateDiscountPercentage(originalPrice, discountedPrice) {
                    // Ensure that the prices are valid numbers
                    if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice <= 0 || discountedPrice <= 0) {
                        console.error("Invalid price values");
                        return null;
                    }

                    // Calculate the discount percentage
                    const discountAmount = originalPrice - discountedPrice;
                    const discountPercentage = (discountAmount / originalPrice) * 100;

                    return discountPercentage;
                }

                //  usage
                const originalPrice = Number(document.querySelector('.popup_compare__price').textContent.replace(/Tk/g, ''));
                const discountedPrice = Number(document.querySelector('.popup_discount__price').textContent.replace(/Tk/g, ''));
                const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);

                if (discountPercentage !== null) {
                    console.log(`Discount Percentage: ${discountPercentage.toFixed(2)}%`);
                    const discountFloor = Math.floor(discountPercentage)
                    document.querySelector('.price__saving').textContent = `-${discountFloor}%`;
                }

            } catch (error) {
                console.log("Error", error);
            }
        }

    });
});


if (document.querySelector(".product_popup_container")) {
    document.querySelector(".popup_close_btn_wrapper").addEventListener("click", function () {
        document.querySelector(".product_popup_container").style.display = `none`;
        document.querySelector(".popup_display_img").src = ``;
        document.querySelector(".popup_product__name").textContent = ``;
        document.querySelector(".popup_compare__price ").textContent = ``;
        document.querySelector(".popup_discount__price ").textContent = ``;
        document.querySelector(".product__description ").textContent = ``;
    });
}

