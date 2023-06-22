export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

const conditionals = (categoryId, query) => {
  const category = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const item = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const both = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;

  if (categoryId && query) return both;
  return query ? item : category;
};

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = conditionals(categoryId, query);
  const data = await fetch(URL);

  return data.json();
}

export async function getProductById(id) {
  const URL = `https://api.mercadolibre.com/items/${id}`;
  const product = await fetch(URL);

  return product.json();
}
