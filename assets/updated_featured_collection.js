document.querySelectorAll(".product_modal_open").forEach((seeVariant) => {
    seeVariant.addEventListener("click", function () {
        document.querySelector(".product_popup_container").style.display = `block`;
        const productHandle = seeVariant.getAttribute('product-handle');
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
                    document.querySelector(".popup_compare__price").textContent = formatMoney(product.price, "{{ shop.money_format }}");
                    




                } catch (error) {
                    console.log("Error", error);
                }
            }

    });
});


document.querySelector(".popup_close_btn_wrapper").addEventListener("click", function () {
    document.querySelector(".product_popup_container").style.display = `none`;
    document.querySelector(".popup_display_img").src = ``;

});