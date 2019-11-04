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
			createElementTemplate(currentProduct);
			
			//createElementTagPricePriceAnnually(currentProductCycleAnnually);
			//createElementTagPricePriceTriennially(currentProductCyclesTriennially);
			createElementTagPricePriceeMonthly(currentProductCycleMonthly);
		})


		setTimeout(function(){
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



	//CRIATE TAG NAME  PRODUCTS
  	function createElementTemplate(currentProduct){
		const productContainer = document.querySelector('.content-carrossel-product-plans');
		const tagName = document.createElement('div');
		tagName.classList = 'content-carrossel-product-name';
		tagName.innerHTML = currentProduct.name;
		


		const templateHtml = '<div class="item">'+
		    '<div class="content-carrossel-product-header">'+
				'<figure>'+
				'	<img src="img/Grupo_29909.svg">'+
				'	<figcaption></figcaption>	'+	
				'</figure>'+
				'<h1>Plano P</h1>'+
			'</div>'+
			'<div class="content-carrossel-product-price">'+
				'<div class="content-product-price-promotional">'+
				'	<span>R$ 431,64</span>'+
					'<span><strong>R$ 302,15</strong></span>'+
					'<span>equivalente a</span>'+
				'</div>'+
				'<div class="content-product-price">'+
					'<span></span>'+
					'<span>R$ <strong>8,39</strong>/mes*</span>'+
					'<span></span>'+
				'</div>'+
				'<a href="#" class="content-link-product">Contrate Agora</a>'+
				'<div class="content-product-obs">'+
					'<strong class="before-strong-info">1 ano de Domínio Grátis</strong>'+
					'<span>economize R$174,48 <strong>40% off</strong></span>'+
				'</div>'+
			'</div>		'+
			'<div class="content-carrossel-product-description">'+
				'<ul>'+
					'<li>Para 1 site</li>'+
					'<li><strong>100 GB</strong> de Armazenamento</li>'+
					'<li>Contas de E-mail <strong>Ilimitadas</strong></li>'+
					'<li>Criador de Sites <strong>Grátis</strong></li>'+
					'<li>Certificado SSL <strong>Grátis</strong>(https)</li>'+
				'</ul>'+
			'</div>	'+
	'</div>'

	productContainer.appendChild(templateHtml);
	}

