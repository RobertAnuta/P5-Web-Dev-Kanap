const products = async () => {
    const response = await fetch('http://localhost:5500/back/models/Product.js');
    const parsedData = await response.json()
    console.log('parsedData', parsedData)

    parsedData.map(el => {
        const product = document.createElement('a')
        product.innerHTML = `<a href='./product.html?id=${el._id}'>
            <article>
                <img src="../../back/images/${el.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1" />
                <h3 class="productName">${el.name}</h3>
                <p class="productDescription">${el.description}</p>
            </article>
        </a>`
        document.getElementById('items').appendChild(product)

    })
};

products();

