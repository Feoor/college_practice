//  каталог на главной (пока без классов)
document.addEventListener("DOMContentLoaded", async () => {
  const productsRaw = await getProducts();
  const products = productsRaw.map(p => new Product(p.id, p.title, p.price, p.rating.rate, p.description, p.image, p.category, p.quantity));
  
  await setupCategoryFilter();
  await renderProducts(products);
});

// отрисовка товаров
async function renderProducts(products) {
  const wrapper = document.getElementById("catalogItemsWrapper");
  wrapper.innerHTML = "";

  products.forEach(p => {
    const card = p.renderCard();
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${p.getId()}`;
    });
    wrapper.appendChild(card);
  })
}

// фильтрация по категориям
async function setupCategoryFilter() {
  const categories = await getCategories();
  const filter = document.getElementById("categoryFilters");
  
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "filter-panel__category-item btn";
    btn.textContent = category;
    btn.dataset.category = category;
    filter.appendChild(btn);
  });
}