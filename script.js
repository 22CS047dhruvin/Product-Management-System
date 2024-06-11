const products = [
    { id: 1, name: 'Laptop', price: 65000, category: 'Electronics', stock: 10, image: 'laptop.jpg' },
    { id: 2, name: 'T-shirt', price: 2500, category: 'Fashion', stock: 50, image: 'tshirt.jpg' },
    { id: 3, name: 'Nike Retro 2', price: 15000, category: 'Shoes', stock: 25, image: 'shoes.jpg' },
    { id: 4, name: 'Tony-Mony', price: 45000, category: 'Television', stock: 45, image: 'tv.jpg' },
    { id: 5, name: 'Ramson', price: 9000, category: 'Mobile', stock: 22, image: 'mobile.jpg' },
    { id: 6, name: 'Beardo', price: 450, category: 'Perfume', stock: 7, image: 'perfume.jpg' },
  ];
  
  function displayProducts(productList) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    productList.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-list-item');
      productItem.innerHTML = `
        <div class="product-details">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <span class="product-name">${product.name}</span>
          <span class="product-price">Rs.${product.price.toFixed(2)}</span>
          <span class="product-category">${product.category}</span>
          <input type="number" class="product-stock" value="${product.stock}" min="0" data-id="${product.id}">
          <button class="update-stock" data-id="${product.id}">Update</button>
        </div>
      `;
      productContainer.appendChild(productItem);
    });
  }
  
  function updateStock(productId, newStock) {
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
      displayProducts(products);
    }
  }
  function searchProducts(query) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
  }
  function filterProducts(category, priceRange) {
    let filteredProducts = products;
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    filteredProducts = filteredProducts.filter(product => product.price <= priceRange);
    displayProducts(filteredProducts);
  }
  document.getElementById('search').addEventListener('input', (event) => {
    searchProducts(event.target.value);
  });
  document.getElementById('category-filter').addEventListener('change', (event) => {
    const priceRange = document.getElementById('price-range').value;
    filterProducts(event.target.value, priceRange);
  });
 
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('update-stock')) {
      const productId = parseInt(event.target.dataset.id);
      const newStock = parseInt(document.querySelector(`.product-stock[data-id="${productId}"]`).value);
      updateStock(productId, newStock);
    }
  });
  document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = products.length + 1;
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const stock = parseInt(document.getElementById('product-stock').value);
    const image = document.getElementById('product-image').files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const newProduct = { id, name, price, category, stock, image: e.target.result };
      products.push(newProduct);
      displayProducts(products);
      event.target.reset();
    }
    if (image) {
      reader.readAsDataURL(image);
    } else {
      const newProduct = { id, name, price, category, stock, image: 'default.jpg' };
      products.push(newProduct);
      displayProducts(products);
      event.target.reset();
    }
  });
  document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('product-form').reset();
  });
  displayProducts(products);
  