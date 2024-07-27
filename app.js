document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
  
    function updateCartCount() {
      document.getElementById('cart-count').textContent = cart.length;
    }
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const plantId = this.getAttribute('data-id');
        if (cart.filter(id => id === plantId).length < 10) {
          cart.push(plantId);
          saveCart();
          updateCartCount();
          this.disabled = true;
        } else {
          alert("Maximum of 10 items allowed per plant.");
        }
      });
    });
  
    if (document.getElementById('cart-items')) {
      updateCartDisplay();
    }
  
    function updateCartDisplay() {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = '';
      const uniquePlants = [...new Set(cart)];
      uniquePlants.forEach(plantId => {
        const count = cart.filter(id => id === plantId).length;
        const plantElement = document.createElement('div');
        plantElement.innerHTML = `
          <img src="{plantId}.jpg" alt="Plant ${plantId}">
          <h4>Plant ${plantId}</h4>
          <p>$10.00</p>
          <p>Quantity: <span class="quantity">${count}</span></p>
          <button class="increase" data-id="${plantId}">+</button>
          <button class="decrease" data-id="${plantId}">-</button>
          <button class="delete" data-id="${plantId}">Delete</button>
        `;
        cartItemsContainer.appendChild(plantElement);
      });
  
      updateCartSummary();
      addCartEventListeners();
    }
  
    function updateCartSummary() {
      const totalItems = cart.length;
      const totalCost = totalItems * 10.00; // Adjust pricing logic as needed
      document.getElementById('total-items').textContent = totalItems;
      document.getElementById('total-cost').textContent = totalCost.toFixed(2);
    }
  
    function addCartEventListeners() {
      document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
          const plantId = this.getAttribute('data-id');
          if (cart.filter(id => id === plantId).length < 10) {
            cart.push(plantId);
            saveCart();
            updateCartDisplay();
          } else {
            alert("Maximum of 10 items allowed per plant.");
          }
        });
      });
  
      document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
          const plantId = this.getAttribute('data-id');
          const index = cart.indexOf(plantId);
          if (index > -1) {
            cart.splice(index, 1);
            saveCart();
            updateCartDisplay();
          }
        });
      });
  
      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function() {
          const plantId = this.getAttribute('data-id');
          while (cart.includes(plantId)) {
            const index = cart.indexOf(plantId);
            cart.splice(index, 1);
          }
          saveCart();
          updateCartDisplay();
        });
      });
    }
  });
  