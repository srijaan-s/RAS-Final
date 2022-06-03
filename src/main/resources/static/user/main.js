let carts = document.querySelectorAll('.add-cart');

let products =[
    {
        name: 'Protein Powder',
        tag: 'product1',
        price: 50,
        inCart: 0
    },
    {
        name: 'Protein Bar',
        tag: 'product2',
        price: 28,
        inCart: 0
    },
    {
        name: 'Shaker',
        tag: 'product3',
        price: 8,
        inCart: 0
    },
    {
        name: 'Protein Cookie',
        tag: 'product4',
        price: 26,
        inCart: 0
    }
]
for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.shopping span').textContent = productNumbers;
    }
}

function cartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shopping span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shopping span').textContent = 1;
    }
    setItems(product);

}

function setItems(){
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);


   if(cartItems != null) {

       if(cartItems[product.tag] == undefined){
           cartItems = {
               ...cartItems,
               [product.tag]: product
           }
       }

       cartItems[product.tag].inCart += 1;
   } else {
       product.inCart = 1;
       
      let cartItems = {
           [product.tag]: product
       }

   }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

    function totalCost(product){

        let cartCost = localStorage.getItem('totalCost');
        //cartCost = parseInt(cartCost);
      //  console.log("My cartCost is", cartCost);
        //console.log(typeof cartCost);

        if(cartCost != null){
            localStorage.setItem("totalCost", cartCost + product.price);
        } else {
            localStorage.setItem("totalCost", product.price);
        }

    function displayCart(){
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".products");

        if (cartItems && productContainer) {
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML +=
                    <div class="product">
                        <ion-icon name="close-circle"></ion-icon>
                        <img src="./user/$(item.tag).jpg">
                        <span>$(item.name)</span>
                        </img>
                    </div>
                    <div class="price">$${item.price},00</div>
                    <div class="quantity">
                    <ion-icon name="close-outline"/>
                        <span>${item.inCart}</span>
                        <ion-icon name="caret-forward-circle-outline"/>
                    </div>
                    <div class="total">
                        $${item.inCart * item.price},00
                    </div>

            });

            productContainer.innterHTML +=
                <div class="basketTotalContainer"></div>
                <h4 class ="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            ;
        }
    }

    }

onLoadCartNumbers();
displayCart();