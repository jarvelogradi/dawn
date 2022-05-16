function handleChange(src) {
    let data = JSON.parse(src.value);
    let labelPrice = document.getElementById("price" + data.featured_image.product_id);
    let inputData = document.querySelector("#inputData" + data.featured_image.product_id);

    inputData.value = JSON.stringify(data);

    labelPrice.innerHTML = moneyWithCurrency(data.price);
    console.log(data);
}

function moneyWithCurrency(value){
    let int = parseInt(value);

    let refactorValue = parseFloat(int/100).toFixed(2);

    let finalValue = `$${refactorValue} USD`;

    return finalValue;
}

function handleOnclick(productId, rooturl = "http://127.0.0.1:9292/") {

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
            return response.json();
        })
        .catch((error) => {
            console.error("Error", error);
        });

}
