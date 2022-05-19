const rooturl = "https://moises-gradi-store.myshopify.com/";
let cartStatus = false;

function handleChange(src) {
    let data = JSON.parse(src.value);
    let labelPrice = document.getElementById("price" + data.featured_image.product_id);
    let productImage = document.getElementById("productImage" + data.featured_image.product_id);
    let inputData = document.querySelector("#inputData" + data.featured_image.product_id);

    inputData.value = JSON.stringify(data);
    labelPrice.innerHTML = moneyWithCurrency(data.price);
    productImage.src = data.featured_media.preview_image.src;
}

function moneyWithCurrency(value) {
    let int = parseInt(value);

    let refactorValue = parseFloat(int / 100).toFixed(2);

    let finalValue = `$${refactorValue} USD`;

    return finalValue;
}

function handleOnclick(productId) {

    let data = JSON.parse(document.querySelector("#inputData" + productId).value);

    let formData = {
        items: [
            {
                id: data.id,
                quantity: 1,
            },
        ],
    };
    fetch(rooturl + "cart/add.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            console.log(response);
            handleAsideCart(cartStatus);
            renderSection(".shopify-section-cart-icon-bubble");
        })
        .catch((error) => {
            console.error("Error", error);
        });

}

function handleAsideCart(){
    let status = cartStatus;
    let customCartElement = document.getElementById("custom-aside-cart");
    if(!status){
        fetch(rooturl + "cart.js", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error("Error", error);
            });
        customCartElement.children[0].classList.add("show");
        cartStatus = true;
    }
    else{
        customCartElement.children[0].classList.remove("show");
        cartStatus = false;
    }
}

function renderSection() {
    fetch(rooturl + '?section_id=cart-icon-bubble')
        .then(response => response.text())
        .then(data => {
            let innerHTML = new DOMParser()
                .parseFromString(data, 'text/html')
                .getElementById('shopify-section-cart-icon-bubble').innerHTML;

            document.getElementById('cart-icon-bubble').innerHTML = innerHTML;
        });

    fetch(rooturl + '?section_id=custom-cart')
    .then(response => response.text())
    .then(data => {
        let innerHTML = new DOMParser()
            .parseFromString(data, 'text/html');
        
        document.getElementById('custom-cart-content').innerHTML = innerHTML.getElementById('custom-cart-content').innerHTML;
        document.getElementById('custom-cart-bottom').innerHTML = innerHTML.getElementById('custom-cart-bottom').innerHTML;
    });
}

function updateItemFromCart(itemId , value, type, price){
    let quantity = type == 'less' ? value-1 : value+1;
    let labelElement = document.getElementById("quantity-label");
    let itemTotalPrice = document.getElementById("itemTotalPrice");

    labelElement.children[0].innerHTML = quantity;
    itemTotalPrice.children[1].innerHTML = `<h5>${moneyWithCurrency(price * quantity)}</h5>`;

    let formData = {  
        updates: {
            [itemId]: quantity,
        }
    };

    fetch(rooturl + "cart/update.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            console.log(response);
            renderSection();
        })
        .catch((error) => {
            console.error("Error", error);
        });
}

function deleteItemFromCart(itemId){
    
    let formData = {  
        id: itemId,
        quantity: 0,   
    };

    fetch(rooturl + "cart/change.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            console.log(response);
            renderSection();
        })
        .catch((error) => {
            console.error("Error", error);
        });
}


