const cartData = () => {
  const cart = document.querySelector('.js-cart');//делегирование событий, вешаем обработчик на всю корзину
  const productsList = document.querySelector('.js-products-list');
  const cartList = document.querySelector('.js-cart-list');
  const cartOrder = document.querySelector('.js-cart-order-container');
  const cartEmpty = document.querySelector('.js-cart-empty-container');
  const productInfo = {};

  const updateCartItemCount = () => {
    cart.addEventListener('click', (e) => {
      let currentItems, minusBtn;

      if (e.target.matches('.js-minus') || e.target.matches('.js-plus')) {
        const counter  = e.target.closest('.js-counter');//ближайший родитель для элемента, по которому был клик
        currentItems = counter.querySelector('.js-current-items');//текущее значение счетчика, ищем именно внутри родителя, а не всего документа   
        minusBtn = counter.querySelector('.js-minus');     
      }

      if (e.target.matches('.js-plus')) {
        currentItems.textContent = ++currentItems.textContent;
        minusBtn.classList.remove('disabled');
      }

      if (e.target.matches('.js-minus')) {
        if (parseInt(currentItems.textContent) > 2) {
          currentItems.textContent = --currentItems.textContent;
        } else if (parseInt(currentItems.textContent) === 2) {//если 1, делаем кнопку не активной
          currentItems.textContent = --currentItems.textContent;
          minusBtn.classList.add('disabled');
        }        
      }
    });
  };
  updateCartItemCount();

  const addProductToCart = () => {
    productsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-buy-button')) {
        const product = e.target.closest('.js-product');
        const imageCart = product.querySelector('.js-image-card');//ищем не по всему документу, а именно в конкретном продукте
        const modelCart = product.querySelector('.js-title-card');
        const priceCart = product.querySelector('.js-price-card');
        const linkCart = product.querySelector('.js-link-card');

        productInfo.id = linkCart.getAttribute('id');
        productInfo.model = modelCart.textContent;
        productInfo.price = priceCart.textContent;
        productInfo.photo = imageCart.src;
        //console.log(productInfo);

        //чтобы одинаковые товары не добавлялись отдельной позицией, а плюсовались
        const productInCart = cartList.querySelector(`#${productInfo.id}`);
        if (productInCart) {
          const currentItemsProducts = document.querySelector('.js-current-items');
          const minusBtn = productInCart.querySelector('.js-minus');

          currentItemsProducts.textContent = parseInt(currentItemsProducts.textContent) + 1;
          minusBtn.classList.remove('disabled');
        } else {
          renderProductCart();
        }
        toggleCartStatus();      
      }
    });
  };
  addProductToCart();

  const renderProductCart = () => {//функция рендера добавления продукта в корзину
    const li = document.createElement('li');
    li.classList.add('.cart-item', '.column', '.js-cart-item');
    li.innerHTML = `
      <span class="close js-remove"></span>
      <div class="cartline row jcfs aic" id="${productInfo.id}">
        <div class="cart-image-container">
          <img src="${productInfo.photo}" alt="photo" class="cart-img">
        </div>
        <div class="column">
          <div class="cart-model row jcfs aic">${productInfo.model}</div>
          <div class="row jcsb aic">
            <div class="counter row jcc aic js-counter">
              <button type="button" class="minus control row jcc aic js-minus disabled">-</button>
              <div class="current-items row jcc aic js-current-items">1</div>
              <button type="button" class="plus control row jcc aic js-plus">+</button>
            </div>
            <div class="row jcc aic">
              <span class="cart-price  row jcfe js-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
              <span class="rouble">$</span>
            </div>
          </div>
        </div>
      </div>
    `;

    cartList.append(li);
  };

  const removeProductFromCart = () => {//удаление из корзины по клику на крестик
    cartList.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-remove')) {
        const cartItem = e.target.closest('.js-cart-item');
        cartItem.remove();
        toggleCartStatus();
      }
    });
  };
  removeProductFromCart();

  const toggleCartStatus = () => {//изменение вида корзины в зависимости, полная она или пустая
    if (cart.querySelector('.js-cart-item')) {
      cartOrder.classList.remove('hidden');
      cartEmpty.classList.add('hidden');
    } else {
      cartOrder.classList.add('hidden');
      cartEmpty.classList.remove('hidden');
    }
  };
  toggleCartStatus();
};

export {
  cartData
};
