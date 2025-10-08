const API_URL = "https://fakestoreapi.com";

async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
}

