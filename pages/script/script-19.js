function consultarProdutos() {
    let settings = {
        "url": "https://lojadetestescarol.commercesuite.com.br/web_api/products",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };
    return jQuery.ajax(settings);
}

jQuery(document).ready(function () {
    let request = consultarProdutos();
    let products = document.querySelector("#products");

    request.done(function (response) {
        console.log("Resposta da API:", response);

        let produtos = response && Array.isArray(response.Products) ? response.Products : [];

        if (produtos.length === 0) {
            console.warn("Nenhum produto encontrado ou resposta inesperada.");
            return;
        }

        produtos.forEach(item => {
            if (item.Product.category_id === "19") {

                let produto = item.Product;
                let imagem = produto.ProductImage?.[0]?.https || 'https://cdn.awsli.com.br/production/static/img/produto-sem-imagem.gif';
                let card = document.createElement("div");
                card.className = "col-sm-6 col-md-4 col-lg-3 d-flex my-2";
                card.innerHTML = `

                    <div class="card w-100">
                      <img src="${imagem}" class="card-img-top"
                      style="height:250px; object-fit:cover;" alt="${produto.name}">
                      <div class="card-body d-flex justify-content-between flex-column">
                        <h5 class="card-title">${produto.name}</h5>
                        <p class="card-text">
                          <span class="fs-3 font-weight-normal">R$ ${produto.price}</span>
                        </p>
                        <p class="card-text text-dark-emphasis">
                          Ou <strong>${produto.payment_option_details[0].plots}x</strong> de <strong>R$ ${produto.payment_option_details[0].value}</strong> no ${produto.payment_option_details[0].display_name}
                        </p>
                        <button href="#" class="btn" target="_blank" style="max-height:40px;">Comprar</button>
                      </div>
                    </div>
                `;
                products.append(card);
            }
        });
    });
}); 