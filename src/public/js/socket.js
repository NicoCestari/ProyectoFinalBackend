const socket = io();

socket.on("updateProducts", (updatedProducts) => {
    updateProductList(updatedProducts);
});


document.getElementById("addProductBtn").addEventListener("click", () => {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productId = id++
    if (productName.trim() !== "" && productPrice.trim() !== "") {
        socket.emit("addProduct", {
            id: productId,
            name: productName,
            price: productPrice,
        });

        
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
    } else {
        alert("Por favor, ingrese un nombre y un precio para el producto.");
    }
});


document.addEventListener("click", (event) => {
    console.log(event)
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.getAttribute("data-product-id");
        console.log(productId)
        socket.emit("deleteProduct", productId);
    }
});

function updateProductList(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.id} - ${product.name} - $${product.price}`;

        
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Eliminar";
        deleteButton.setAttribute("data-product-id", product.id);

        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    });
}