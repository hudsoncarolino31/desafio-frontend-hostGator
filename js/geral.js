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
			const currentProductName               = currentProduct.name;

			const currentProductCycleAnnually      = currentProductCycle.annually.priceOrder
			const currentProductCycleBiennially    = currentProductCycle.biennially.priceOrder
			const currentProductCycleMonthly       = currentProductCycle.monthly.priceOrder	
			const currentProductCycleQuarterly     = currentProductCycle.quarterly.priceOrder
			const currentProductCyclesSemiannually = currentProductCycle.semiannually.priceOrder
			const currentProductCyclesTriennially  = currentProductCycle.triennially.priceOrder
			
			const valueTemplate = 3;

			// CRIATE TAG NAME
			
			if (valueTemplate == 1){
				const arrayPrices = createElementTagPricePriceAnnually(currentProductCycleAnnually);
				
				//createElementTagPricePriceTriennially(currentProductCyclesTriennially);
				//createElementTagPricePriceeMonthly(currentProductCycleMonthly);
				createElementTemplate(currentProductName,arrayPrices.discount,arrayPrices.priceFinal,arrayPrices.recurringInstallment,currentProductCycleAnnually)
			
			}else if(valueTemplate == 2){
				
				const arrayPricesTriennially = createElementTagPricePriceTriennially(currentProductCyclesTriennially);
				createElementTemplate(currentProductName,arrayPricesTriennially.discount,arrayPricesTriennially.priceFinal,arrayPricesTriennially.recurringInstallment,currentProductCyclesTriennially)
			
			}else if(valueTemplate == 3){
				
				const arrayPricesMonthly = createElementTagPricePriceeMonthly(currentProductCycleMonthly);
				createElementTemplate(currentProductName,arrayPricesMonthly.discount,arrayPricesMonthly.priceFinal,arrayPricesMonthly.recurringInstallment,currentProductCycleMonthly)
			}
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




  	//CRIATE TAG PRICE ANNUALLY
  	function createElementTagPricePriceAnnually(currentProductCycleAnnually){
  		const productAttr                       = {};
		const discount                          = calculationPercentage(currentProductCycleAnnually);
		const priceFinal                        = parseFloat(currentProductCycleAnnually) - parseFloat(discount);
		productAttr.discount                    = numberToReal(discount);
		productAttr.currentProductCycleAnnually = numberToReal(currentProductCycleAnnually);
		productAttr.priceFinal                  = numberToReal(priceFinal);
		productAttr.recurringInstallment        = numberToReal(priceFinal/12);
		return productAttr;
	}
	
	//CRIATE TAG PRICE TRIENNIALLY
  	function createElementTagPricePriceTriennially(currentProductCyclesTriennially){
  		const productAtt                           = {};
		const discount                             = calculationPercentage(currentProductCyclesTriennially);
		const priceFinal                           = parseFloat(currentProductCyclesTriennially) - parseFloat(discount);
		productAtt.discount                        = numberToReal(discount);
		productAtt.currentProductCyclesTriennially = numberToReal(currentProductCyclesTriennially*3);
		productAtt.priceFinal                      = numberToReal(priceFinal);
		productAtt.recurringInstallment            = numberToReal(priceFinal/36);
		return productAtt;
	}

	//CRIATE TAG PRICE  MONSTHLY
  	function createElementTagPricePriceeMonthly(currentProductCycleMonthly){
  		const productAtt                           = {};
		const discount = calculationPercentage(currentProductCycleMonthly);
		const priceFinal  = parseFloat(currentProductCycleMonthly) - parseFloat(discount);
		
		productAtt.discount                        = numberToReal(discount);
		productAtt.currentProductCyclesTriennially = numberToReal(currentProductCycleMonthly);
		productAtt.priceFinal                      = numberToReal(priceFinal);
		productAtt.recurringInstallment            = 0;
		return productAtt;
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

	//CRIATE TAG NAME  PRODUCTS
  	function createElementTemplate(currentProductName,discount,priceFinal,recurringInstallment,price){
		const productContainer = document.querySelector('.content-carrossel-product-plans');
		const tagItem = document.createElement('div');
		price = numberToReal(price);

		if (recurringInstallment == 0) {
			recurringInstallment = price;
			hideElemente(document.querySelectorAll(".content-product-price-promotional"));


		}


		tagItem.classList = 'item';
		tagItem.innerHTML = '<div class="content-carrossel-product-header">'+
				'<figure>'+
				'	<img src="img/Grupo_29909.svg">'+
				'	<figcaption></figcaption>	'+	
				'</figure>'+
				'<h1>'+currentProductName+'</h1>'+
			'</div>'+
			'<div class="content-carrossel-product-price">'+
				'<div class="content-product-price-promotional">'+
				'	<span>'+price+'</span>'+
					'<span><strong>'+priceFinal+'</strong></span>'+
					'<span>equivalente a</span>'+
				'</div>'+
				'<div class="content-product-price">'+
					'<span></span>'+
					'<span>R$ <strong>'+recurringInstallment+'</strong>/mes*</span>'+
					'<span></span>'+
				'</div>'+
				'<a href="#" class="content-link-product">Contrate Agora</a>'+
				'<div class="content-product-obs">'+
					'<strong class="before-strong-info">1 ano de Domínio Grátis</strong>'+
					'<span>economize'+discount+'<strong>40% off</strong></span>'+
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
			'</div>	'

		productContainer.appendChild(tagItem);
	}

	function hideElemente(hideElemente){
		for(var i = 0; i< hideElemente.length;i++){
			hideElemente[i].style.display = "none";
		}

	}

	$('.pg-home section.content-products-plans div.legend-products-plans form label').click(function(e){
	   $(".pg-home section.content-products-plans div.legend-products-plans form label").removeClass("ativo");
	   $(this).addClass("ativo");
	});

});