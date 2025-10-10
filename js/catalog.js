//  каталог на главной (пока без классов)
document.addEventListener("DOMContentLoaded", async () => {
  const productsRaw = await getProducts();
  const products = productsRaw.map(p => new Product(p.id, p.title, p.price, p.rating.rate, p.description, p.image, p.category, p.quantity));
  
  await setupCategoryFilter();
  await renderProducts(products);

  // Отдельно, чтобы не перегружать сервер запросами
  await setupSearch(products);
  await setupPriceFilter(products);

  // FAQ кнопки
  const faqBlocks = document.querySelectorAll(".faq__question");

  faqBlocks.forEach(block => {
      // FAQ Блок -> div.faq__question-header -> button
      const button = block.querySelector(".faq__question-header button");
      button.addEventListener("click", () => {
          block.classList.toggle("faq__question--active");
      });
  });
});

// отрисовка товаров
async function renderProducts(products) {
  const wrapper = document.getElementById("catalogItemsWrapper");
  wrapper.innerHTML = "";

  products.forEach(p => {
    const card = p.renderCard();
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${p.id}`;
    });
    wrapper.appendChild(card);
  })
}

// фильтрация по категориям
async function setupCategoryFilter() {
  const categories = await getCategories();
  const filter = document.getElementById("categoryFilters");
  
  // Добавляем опцию "Все категории"
  const allCategoriesWrapper = document.createElement("div");
  allCategoriesWrapper.className = "filter-panel__category-item";
  
  const allRadio = document.createElement("input");
  allRadio.type = "radio";
  allRadio.name = "category";
  allRadio.id = "category-all";
  allRadio.value = "all";
  allRadio.checked = true;
  allRadio.className = "filter-panel__category-radio";
  
  const allLabel = document.createElement("label");
  allLabel.htmlFor = "category-all";
  allLabel.className = "filter-panel__category-label";
  allLabel.textContent = "Все категории";
  
  allCategoriesWrapper.appendChild(allRadio);
  allCategoriesWrapper.appendChild(allLabel);
  filter.appendChild(allCategoriesWrapper);
  
  // Добавляем остальные категории
  categories.forEach((category, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "filter-panel__category-item";
    
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "category";
    radio.id = `category-${index}`;
    radio.value = category;
    radio.className = "filter-panel__category-radio";
    radio.dataset.category = category;
    
    const label = document.createElement("label");
    label.htmlFor = `category-${index}`;
    label.className = "filter-panel__category-label";
    label.textContent = category;
    
    wrapper.appendChild(radio);
    wrapper.appendChild(label);
    filter.appendChild(wrapper);
  });
  
  // Обработчик изменения категории
  filter.addEventListener("change", async (e) => {
    if (e.target.name === "category") {
      const selectedValue = e.target.value;
      
      if (selectedValue === "all") {
        const allProductsRaw = await getProducts();
        const allProducts = allProductsRaw.map(p => new Product(p.id, p.title, p.price, p.rating.rate, p.description, p.image, p.category, p.quantity));
        await renderProducts(allProducts);
      } else {
        const filteredProductsRaw = await getProductsByCategory(selectedValue);
        const filteredProducts = filteredProductsRaw.map(p => new Product(p.id, p.title, p.price, p.rating.rate, p.description, p.image, p.category, p.quantity));
        await renderProducts(filteredProducts);
      }
    }
  });
};

async function setupSearch(allProducts) {
  const searchInput = document.getElementById("catalogSearchInput");

  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    await renderProducts(filteredProducts);
  });
}

async function setupPriceFilter(allProducts) {
  const priceRange = document.getElementById("priceRange");
  const priceRangeValue = document.getElementById("priceRangeValue");

  priceRange.addEventListener("input", async (e) => {
    const maxPrice = e.target.value;
    priceRangeValue.textContent = `$${maxPrice}`;

    const filteredProducts = allProducts.filter(p => p.price <= maxPrice);
    await renderProducts(filteredProducts);
  });
}