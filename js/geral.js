'use strict';
(function (doc, win) {

	function getProducts() {
		const url = 'https://7ac2b8ab-f3e5-4534-863d-90dd424a6405.mock.pstmn.io/prices'
		return fetch(url)
			.then( response => {
	      return response.json()
	    })
	    .catch(e => {
	      return false
	    })
	}

	getProducts().then(response => {
   		const products = response.shared.products;
		Object.keys(products).forEach(key => {
			const produtoAtual = products[key]
			console.log(produtoAtual)
		})
  	});

	
}(document, window))