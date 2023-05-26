//Try code and catch errors 
try {
    //Fetch the products and convert in to a json format
    const products = async () => {
        const response = await fetch('http://localhost:5500/back/models/Product.js');
        const parsedData = await response.json()
        console.log('parsedData', parsedData)

        //Show every products from ./back/models in Home page 
        parsedData.map(el => {
            const product = document.createElement('a')
            product.innerHTML = `<a href='./product.html?id=${el._id}'>
                <article id="${el._id}">
                    <img src="../../back/images/${el.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1" />
                    <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                </article>
            </a>`
            document.getElementById('items').appendChild(product);

            // Add event listener to newly created <a> element
            // document.querySelector('a').addEventListener('click', function ($event) {
            //     const clickedEvent = $event.target.closest("a[href]");

            try {
                window.document.querySelectorAll('a[href]').forEach(function (el) {
                    el.addEventListener('click', ($event) => {
                        let clickedEvent = $event.target.getAttribute('data-info');

                        let storedData = localStorage.setItem('clickedData', clickedData);
                        let dataArray = storedData ? JSON.parse(storedData) : [];
                        dataArray.push(data);
                        localStorage.setItem('clickedData', JSON.stringify(dataArray));

                        // Store clickedData in local storage
                        // localStorage.setItem('clickedEvent', clickedEvent);
                    });

                });


            } catch (error) {
                console.error(`Importing localstorage Error Status: ${response.status} `);
            };
        });
    };

    products();
} catch (error) {
    console.error(`Importing products Error Status: ${response.status} `);
};

// //function to export the data created by every
// window.onload = function () {
//     // Redirect to the different page
//     window.location.href = './differentPage.html';
// };



// const articleElement = document.querySelector('a');

// articleElement.addEventListener('click', ($event) {
//     // Get the value entered by the user
//     let clickedArticle = $event.target.closest('article');
//     let articleId = clickedArticle.getAttribute('id');
//     let productArticle = articleId.value;

//     // Store the value in localStorage
//     localStorage.setItem('productArticle', productArticle);

// });