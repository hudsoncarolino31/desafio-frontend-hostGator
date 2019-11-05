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
			
		
			const arrayPricesTriennially = createElementTagPricePriceTriennially(currentProductCyclesTriennially,currentProductName,currentProductId);
			createElementTemplate(currentProductName,arrayPricesTriennially.discount,arrayPricesTriennially.priceFinal,arrayPricesTriennially.recurringInstallment,currentProductCyclesTriennially,"triennially",currentProductId)

			const arrayPricesMonthly  = createElementTagPricePriceeMonthly(currentProductCycleMonthly,currentProductName,currentProductId);

			const arrayPricesAnnually = createElementTagPricePriceAnnually(currentProductCycleAnnually,currentProductName,currentProductId);
			
			$(".pg-home section.content-products-plans div.legend-products-plans form label").click(function(e){
			 	
			 	$(".pg-home section.content-products-plans div.legend-products-plans form label").removeClass("ativo");
	   			$(this).addClass("ativo");
			 	
			 	if ($(this).attr("for") == "three-years"){
			 		alterTemplate( $(this).attr("for"),arrayPricesTriennially,currentProductName,currentProductId,currentProductCycle);
			 	}else if($(this).attr("for") == "one-years"){
					alterTemplate( $(this).attr("for"),arrayPricesAnnually,currentProductName,currentProductId,currentProductCycle);
			 	}else if($(this).attr("for") == "one-month"){
					alterTemplate( $(this).attr("for"),arrayPricesMonthly,currentProductName,currentProductId,currentProductCycle);
			 	}
			
				
			});

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
			          breakpoint: 640,
			          settings: {
			            slidesToShow: 1,
			            draggable:true,
			           
			          }
			        },
			        {
			          breakpoint: 768,
			          settings: {
			            slidesToShow: 2,
			            draggable:true,
			           
			          }
			        },
			        {
			          breakpoint: 991,
			          settings: {
			            slidesToShow: 3,
			            draggable:true,
			          }
			        }
			      ]
			  });
	});




  	//CRIATE TAG PRICE ANNUALLY
  	function createElementTagPricePriceAnnually(currentProductCyclePrice,productName,currentProductId){
  		const productAttr                       = {};
		const discount                          = calculationPercentage(currentProductCyclePrice);
		const priceFinal                        = parseFloat(currentProductCyclePrice) - parseFloat(discount);
		productAttr.productName                 = productName;
		productAttr.currentProductCycle         = "annually";
		productAttr.currentProductId            = currentProductId;
		productAttr.discount                    = numberToReal(discount);
		productAttr.currentProductCyclePrice    = numberToReal(currentProductCyclePrice);
		productAttr.priceFinal                  = numberToReal(priceFinal);
		productAttr.recurringInstallment        = numberToReal(priceFinal/12);
		
		return productAttr;
	}
	
	//CRIATE TAG PRICE TRIENNIALLY
  	function createElementTagPricePriceTriennially(currentProductCyclePrice,productName,currentProductId){
  		const productAttr                           = {};
		const discount                              = calculationPercentage(currentProductCyclePrice);
		productAttr.productName                     = productName;
		productAttr.currentProductCycle             = "triennially";
		productAttr.currentProductId                = currentProductId;
		const priceFinal                            = parseFloat(currentProductCyclePrice) - parseFloat(discount);
		productAttr.discount                        = numberToReal(discount);
		productAttr.currentProductCyclePrice        = numberToReal(currentProductCyclePrice*3);
		productAttr.priceFinal                      = numberToReal(priceFinal);
		productAttr.recurringInstallment            = numberToReal(priceFinal/36);
		return productAttr;
	}

	//CRIATE TAG PRICE  MONSTHLY
  	function createElementTagPricePriceeMonthly(currentProductCyclePrice,productName,currentProductId){
  		const productAttr                           = {};
		const discount = calculationPercentage(currentProductCyclePrice);
		const priceFinal  = parseFloat(currentProductCyclePrice) - parseFloat(discount);
		
		productAttr.productName                     = productName;
		productAttr.currentProductCycle             = "monthly";
		productAttr.currentProductId                = currentProductId;
		productAttr.discount                        = numberToReal(discount);
		productAttr.currentProductCyclePrice        = numberToReal(currentProductCyclePrice);
		productAttr.priceFinal                      = numberToReal(priceFinal);
		productAttr.recurringInstallment            = 0;
		return productAttr;
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
  	function createElementTemplate(currentProductName,discount,priceFinal,recurringInstallment,price,cycle,currentProductId){
		const productContainer = document.querySelector('.content-carrossel-product-plans');
		const tagItem = document.createElement('div');
		price = numberToReal(price);

		

		tagItem.classList = 'item';
		tagItem.setAttribute("data-name", currentProductName);
		tagItem.innerHTML = '<div class="content-carrossel-product-header">'+
				'<figure>'+
				'	<img src="img/Grupo_29909.svg">'+
				'	<figcaption></figcaption>	'+	
				'</figure>'+
				'<h1>'+currentProductName+'</h1>'+
			'</div>'+
			'<div class="content-carrossel-product-price">'+
				'<div class="content-product-price-promotional">'+
				'	<span class="template-price"> '+price+'</span>'+
					'<span><strong class="template-final"> '+priceFinal+'</strong></span>'+
					'<span>equivalente a</span>'+
				'</div>'+
				'<div class="content-product-price">'+
					'<span></span>'+
					'<span>R$ <strong class="template-recurring">'+recurringInstallment+'</strong>/mes*</span>'+
					'<span></span>'+
				'</div>'+
				'<a href="?a=add&pid='+currentProductId+'&billingcycle='+cycle+'&promocode=PROMOHG40" class="content-link-product">Contrate Agora</a>'+
				'<div class="content-product-obs">'+
					'<strong class="before-strong-info">1 ano de Domínio Grátis</strong>'+
					'<span class="template-discount">economize '+discount+' <strong>40% off</strong></span>'+
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

	


	function alterTemplate(cycle,arrayPrices,plano,currentProductId,currentProductCycle){

		const element = document.querySelectorAll(".pg-home section.content-products-plans div.content-carrossel-product-plans div.item");
		console.log(currentProductCycle);
		for(var i = 0; i<element.length; i++){
			if (element[i].getAttribute("data-name") == arrayPrices.productName) {
				if (arrayPrices.recurringInstallment == 0) {
					arrayPrices.recurringInstallment =  arrayPrices.priceFinal;
				}
				element[i].querySelector(".template-price").innerHTML=arrayPrices.currentProductCyclePrice;
				element[i].querySelector(".template-final").innerHTML=arrayPrices.priceFinal;
				element[i].querySelector(".template-recurring").innerHTML=arrayPrices.recurringInstallment;
				element[i].querySelector(".template-discount").innerHTML='<span class="template-discount">economize '+arrayPrices.discount+'  <strong>40% off</strong></span>'
				element[i].querySelector(".content-link-product").setAttribute("href", "?a=add&pid="+arrayPrices.currentProductId+"&billingcycle="+arrayPrices.currentProductCycle+"&promocode=PROMOHG40")
			}
		}
	}







	
	
});