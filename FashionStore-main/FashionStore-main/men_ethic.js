console.log('running');
let carts=document.querySelectorAll('.add-cart');

let products=[
	{
	name:"Blue Kurta",
	tag:"bluekurta",
	price:350,
	inCart:0,
	},
	{
	name:"Orange Kurta",
	tag:"orangekurta",
	price:599,
	inCart:0,
	},
	{
	name:"Maroon Kurta",
	tag:"maroonkurta",
	price:300,
	inCart:0,
	},
	
	{
	name:"Yellow Kurta",
	tag:"yellowkurta",
	price:699,
	inCart:0,
	},
	{
	name:"Black Kurta",
	tag:"blackurta",
	price:398,
	inCart:0,
	},
	{
	name:"Pink Kurta",
	tag:"pinkkurta",
	price:449,
	inCart:0,
	}
	
	
];

for(let i=0;i<carts.length;i++){
	
	carts[i].addEventListener('click',()=>{
		cartNumbers(products[i]);
		totalCost(products[i]);
		
	})
}

function onLoadCartNumbers(){
	let productNumbers=localStorage.getItem('cartNumbers');
	if(productNumbers){
			document.querySelector('.cart span').textContent=productNumbers;
	}
}

function cartNumbers(product){
	let productNumbers=localStorage.getItem('cartNumbers');
	
	productNumbers=parseInt(productNumbers);
	
	if(productNumbers){
		localStorage.setItem('cartNumbers',productNumbers + 1);
		
		document.querySelector('.cart span').textContent=productNumbers + 1;
		
	}else{
 		localStorage.setItem('cartNumbers',1);
		document.querySelector('.cart span').textContent=1;
	}
	
	setItems(product);
}

function setItems(product){
	let cartItems=localStorage.getItem('productsInCart');
	cartItems=JSON.parse(cartItems);
	
	if(cartItems!=null){
		if(cartItems[product.tag]== undefined){
			cartItems={
				...cartItems,
				[product.tag]:product
			}
		}
		cartItems[product.tag].inCart+=1;
	
	}else{
		product.inCart=1;
		cartItems={
			[product.tag]:product
		}
		
	}
	


	localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
	let cartCost=localStorage.getItem('totalCost');
	//console.log("my product price is:",product.price)
	//console.log("My cartCost is",cartCost);
	console.log(typeof cartCost);
	
	if(cartCost!= null){
		cartCost=parseInt(cartCost);
		localStorage.setItem("totalCost",cartCost + product.price);
	}else{
		localStorage.setItem("totalCost",product.price);
	
	}
	
}

function displayCart(){
	let cartItems=localStorage.getItem("productsInCart");
	cartItems=JSON.parse(cartItems);
	
	let productContainer=document.querySelector
	(".products");
	let cartCost=localStorage.getItem('totalCost');
	console.log(cartItems);
	
	if(cartItems && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item=> {
			productContainer.innerHTML+=`
			<div class="product">
				
				<img src="./image/${item.tag}.jpeg">
				<span>${item.name}</span>
			</div>
			<div class="price">${item.price}&#8377</div>
			<div class="quantity">
				
				<span>${item.inCart}</span>
			</div>
			<div class="total">
			${item.inCart * item.price}&#8377
			</div>
			`
		});
		
		
		productContainer.innerHTML += `
		<div class="basketTotalContainer">
		<h4 class="basketTotalTitle">Cart Total</h4>
		<h4 class="basketTotal">${cartCost}</h4>
		<div class="clear_cart">
		<button class="clear_btn" onclick="deleteItem()">Clear Cart</button>
		<button class="continue_btn" onclick="continue_shopping()">Continoue Shopping</button>
		</div>
		</div>
		`
	}
}


function deleteItem(){
	localStorage.clear('productsInCart')
}
function continue_shopping(){
	
        window.location.href = "index.html";
    
}
onLoadCartNumbers();
displayCart();