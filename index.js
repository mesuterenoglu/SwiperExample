const link = '/Data/product-list.json';
const navCategories = document.getElementById("navCategories");
const productPanel = document.getElementById("productPanel");

const createBody = async () => {
    
    try{
        var categories = await getCategories(link);
        categories.forEach(element => {
            createNavLink(element,navCategories,"btn text-start");
        });
        let products = await getProducts(link,"Size Özel");
        productPanel.innerHTML="";
        products.forEach(product => {
            var div = createProductCard(product);
            productPanel.appendChild(div);
    
        });

    }
    catch(err){
        console.log(err);
    }
};
const writeProducts = async (e) => {
   
    let products = await getProducts(link,e.target.value);
    productPanel.innerHTML ="";
    products.forEach(product => {
        var div = createProductCard(product);
        productPanel.appendChild(div);

    }); 
};
const createProductCard = (product) => {
    
    let cardDiv = document.createElement("div");
    cardDiv.className = "swiper-slide card p-2";
    
    let productImg = document.createElement("img");
    productImg.className = "card-img-top img-fluid rounded-2";
    productImg.setAttribute("src",product.image);
    cardDiv.appendChild(productImg);

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardBodyDiv.innerHTML += `
    <div class="d-flex align-items-start flex-column justify-content-between h-100" >
    <h5 class="card-title">${product.name}</h5> 
    <h2 class="card-title">
        <strong>${product.priceText}</strong>
    </h2>
    <p class="card-text">Kargo Bilgisi</p>
    <button href="#" class="btn btn-primary d-inline-block cartbtn" type="button" onclick="showToast()" >Sepete Ekle</button>
    </div>
    `;
    cardDiv.appendChild(cardBodyDiv);
    return cardDiv;
};
const createNavLink = (category,parentDiv,className) => {
            
            let categoryName;
            if(category.includes(">")){
                let categories = category.split(">");
                categoryName = categories[categories.length - 1 ];
            }
            else{
                categoryName = category;
            }
            let button = createButton(className,categoryName,category,writeProducts,navCategories);

            parentDiv.appendChild(button);
};
const  getCategories = async (url) => {
    
    let result = await fetch(url);
    result = await result.json();
    result = result.responses[0][0].params.userCategories;
    return result;
};
const createButton =  (className,innerText,value,onclickFunction, parentDiv) => {
            
            let button = document.createElement("button");
            button.className = className;
            button.value = value;
            button.innerText = innerText.trim();
            button.onclick = onclickFunction;
            parentDiv.appendChild(button);
            return button;
};
const getProducts = async (url,categoryName) => {
    let result = await fetch(url);
    result = await result.json();
    result = result.responses[0][0].params.recommendedProducts[categoryName];
    return result;
};
const changeNavClass = async () => {  
    var x = document.getElementById('navCategoriesHorizontal');
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.Width;
    if(width <= 767) {
        try{
            var categories = await getCategories(link);
            x.innerHTML="";
            categories.forEach(element => {
                createNavLink(element,x,"btn swiper-slide text-start");
            });
    
        }
        catch(err){
            console.log(err);
        }
    } 
    else{
        x.innerHTML ="";
    }
};

//Toast
const toastLiveExample = document.getElementById('liveToast');

const showToast = () => {
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
};



