'use strict';
$(document).ready(function(){
	
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
			//createElementTemplate(currentProduct);
			
			//createElementTagPricePriceAnnually(currentProductCycleAnnually);
			//createElementTagPricePriceTriennially(currentProductCyclesTriennially);
			createElementTagPricePriceeMonthly(currentProductCycleMonthly);
		})


		$('.content-carrossel-product-plans').slick({
		    slidesToShow: 3,
		    slidesToScroll: 1,
		    speed: 450,
		    arrows: false,
		    draggable:false,
		    infinite: false,
		    responsive: [
		        {
		        	breakpoint: 800,
		        	settings: {
		        		arrows: true,
		        		slidesToShow: 2,
		                slidesToScroll: 1,
		                centerMode: true,
		        	}
		        },
		        {
		            breakpoint: 400,
		            settings: {
		                arrows: false,
		                slidesToShow: 1,
		                slidesToScroll: 1,
		            }
		        },
		    ]
		  });
		});

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
  	function createElementTemplate(currentProduct){
		const productContainer = document.querySelector('.content-carrossel-product-plans .slick-track');
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


	$('.pg-home section.content-products-plans div.legend-products-plans form label').click(function(e){
	   $(".pg-home section.content-products-plans div.legend-products-plans form label").removeClass("ativo");
	   $(this).addClass("ativo");
	});