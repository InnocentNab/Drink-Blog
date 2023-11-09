var myHeaders = new Headers();
document.addEventListener("DOMContentLoaded", async function () {
    async function getProducts(params) {
        
        myHeaders.append("apikey", "C02Zpa23cQCGGsgrV52oLrRZB6KcZXpq");
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
            .then(response => {
                // console.log(response.text());
                return response.text()
            })
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log('error', error)
            });


        const products = await fetch('./products.json')
            .then((res) => res.json())
            .then((data) => data)
        insertProducts(products)
    } getProducts();

    // const selectChangeHandler = async() => {
    // }

})
const insertProducts = (products) => {
    var result = ``
    products.forEach((product) => {
        result += `
<div class="product">
    <img src="drinks-images/${product.productImage}" alt="">
        <div>
            <a href="">${product.productName}</a>
            <div>${product.price}</div>
            </div>
    </div>
    `
    })
    document.getElementById('products').innerHTML = result
}

async function selectChangeHandler(params) {
    const products = await fetch('./products.json')
        .then((res) => res.json())
        .then((data) => data)
    const e = document.getElementById('select')
    var filter = e.options[e.selectedIndex].text;
    if (filter !== "All") {
        const filtered = products.filter(product => product.type === filter)
        insertProducts(filtered)
    } else {
        insertProducts(products)
    }
    // console.log(filtered);
}

async function searchChangeHandler() {
    const products = await fetch('./products.json')
        .then((res) => res.json())
        .then((data) => data)
    const searchTearm = document.getElementById("search").value
    const filtered = products.filter(product => (product.productName).toLowerCase().startsWith(searchTearm.toLowerCase()))
    insertProducts(filtered)

}

