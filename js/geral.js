'use strict';
(function (doc, win) {
	

	//REQUEST JASON
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

	//RESPONSE REQUEST JASON
	getProducts().then(response => {
   		const products = response.shared.products;

   		//FOREACH PRODUCTS
		Object.keys(products).forEach(key => {
			const currentProduct                   = products[key];
			const currentProductCycle         	   = currentProduct.cycle;
			const currentProductId                 = currentProduct.id;

			const currentProductCycleAnnually      = currentProductCycle.annually.priceOrder
			const currentProductCycleBiennially    = currentProductCycle.biennially.priceOrder
			const currentProductCycleMonthly       = currentProductCycle.monthly.priceOrder	
			const currentProductCycleQuarterly     = currentProductCycle.quarterly.priceOrder
			const currentProductCyclesSemiannually = currentProductCycle.semiannually.priceOrder
			const currentProductCyclesTriennially  = currentProductCycle.triennially.priceOrder
			


			

			// CRIATE TAG NAME
			//createElementTagName(currentProduct);
			
			//createElementTagPricePriceAnnually(currentProductCycleAnnually);
			//createElementTagPricePriceTriennially(currentProductCyclesTriennially);
			createElementTagPricePriceeMonthly(currentProductCycleMonthly);
		})

  	});


  	//CRIATE TAG PRICE ANNUALLY
  	function createElementTagPricePriceAnnually(currentProductCycleAnnually){
		const discount = calculationPercentage(currentProductCycleAnnually);
		const priceFinal  = parseFloat(currentProductCycleAnnually) - parseFloat(discount);
		
		console.log("40% "+discount);
		console.log("Preço Normal "+currentProductCycleAnnually);
		console.log("Preço final "+priceFinal);
		console.log("parcela "+priceFinal/12);
	}
	
	//CRIATE TAG PRICE TRIENNIALLY
  	function createElementTagPricePriceTriennially(currentProductCyclesTriennially){
		const discount = calculationPercentage(currentProductCyclesTriennially);
		const priceFinal  = parseFloat(currentProductCyclesTriennially) - parseFloat(discount);
		
		console.log("40% "+discount);
		console.log("Preço Normal "+currentProductCyclesTriennially*3);
		console.log("Preço final "+priceFinal);
		console.log("parcela "+priceFinal/36);
	}

	//CRIATE TAG PRICE  MONSTHLY
  	function createElementTagPricePriceeMonthly(currentProductCycleMonthly){
		const discount = calculationPercentage(currentProductCycleMonthly);
		const priceFinal  = parseFloat(currentProductCycleMonthly) - parseFloat(discount);
		
		console.log("40% "+ numberToReal(discount));
		console.log("Preço Normal "+numberToReal(currentProductCycleMonthly));
		console.log("Preço final "+numberToReal(priceFinal));
	}

	//CRIATE TAG NAME  PRODUCTS
  	function createElementTagName(currentProduct){
		const productContainer = document.querySelector('.content-carrossel-product-plans');
		const tagName = document.createElement('div');
		tagName.classList = 'content-carrossel-product-name';
		tagName.innerHTML = currentProduct.name;
		productContainer.appendChild(tagName);
	}

	//CALCULARION PERCENTAGE
  	function  calculationPercentage(price){
		const discount = parseFloat(price*(40/100));
		return discount;
  	}

  	//FORMAT PRICE REAL
	function numberToReal(priceNumber) {
	    priceNumber    =  parseInt(priceNumber);
	   	priceNumber    =  priceNumber.toFixed(2).split('.');
	    priceNumber[0] = "R$ " + priceNumber[0].split(/(?=(?:...)*$)/).join('.');
	   return priceNumber.join(',');
	}





	



	


	






	

	
}(document, window))