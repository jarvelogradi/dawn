var data = new Map();
data.set('orders', getOrdersFromShopify());
data.set('customers', getCustomersFromShopify());

(async function setData(){
    for (let [key, value] of data) {
        window[key+"Label"] = document.getElementById(key);
        window[key+"Label"].innerHTML = await value;
    }    
})();

async function getOrdersFromShopify() {
    //Get orders count from shopify
    let ordersResponse = await fetch("https://gradiweb-rest-shopify.herokuapp.com/orders", {
        method: "GET"
    });

    let ordersData = await ordersResponse.json()
    return ordersData.count;
}

async function getCustomersFromShopify() {
    //Get customers count from shopify
    let customersResponse = await fetch("https://gradiweb-rest-shopify.herokuapp.com/customers", {
        method: "GET"
    })
    let customersData = await customersResponse.json();
    return customersData.count;
}

