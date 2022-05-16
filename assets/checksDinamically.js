const rooturl = "http://127.0.0.1:9292/"

function handleChange(src) {
    let data = JSON.parse(src.value);
    let labelPrice = document.getElementById("price" + data.featured_image.product_id);
    let productImage = document.getElementById("productImage" + data.featured_image.product_id);
    let inputData = document.querySelector("#inputData" + data.featured_image.product_id);

    inputData.value = JSON.stringify(data);
    labelPrice.innerHTML = moneyWithCurrency(data.price);
    productImage.src = data.featured_media.preview_image.src;
    console.log(data);
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
            renderSection(".shopify-section-cart-icon-bubble")
        })
        .catch((error) => {
            console.error("Error", error);
        });

}

function renderSection(elementId) {
    fetch(rooturl + '?section_id=cart-icon-bubble')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            let innerHTML = new DOMParser()
                .parseFromString(data, 'text/html')
                .getElementById('shopify-section-cart-icon-bubble').innerHTML;

            document.getElementById('cart-icon-bubble').innerHTML = innerHTML;
        });
}
