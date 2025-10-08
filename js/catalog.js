//  каталог на главной (пока без классов)
document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  const container = document.getElementById("catalog");

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price} $</p>
      <a href="product.html?id=${p.id}">Подробнее</a>
    `;
    container.appendChild(card);
  });
});
