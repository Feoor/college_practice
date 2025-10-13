document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        console.error("Product ID not found in URL");
        window.location.href = "index.html";
        return;
    }

    try {
        // Загрузка товара
        const container = document.querySelector("section.product-page .container-sm");
        const productRaw = await getProductById(productId);
        const product = new Product(productRaw);

        container.appendChild(product.renderProductPage());

    } catch (error) {
        console.error("Error loading product:", error);
        window.location.href = "index.html";
    }
});

