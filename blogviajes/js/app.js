let placesJSON=[];
let favoritesPlaces=JSON.parse(localStorage.getItem("favourites"))||[];
const articlesContainer=document.querySelector("body main");
const favoritesContainer=document.querySelector("body #entradas-favoritas > div");

const star=(obj)=>{
    if(favoritesPlaces.some(el=>el.title==obj.title)){
        return "favorite-on-icon.png";
    }else{
        return "favorite-off-icon-2.png";
    }
}

const printArticles=()=>{
    articlesContainer.innerHTML="";
    placesJSON.forEach((article,index)=>{
        articlesContainer.innerHTML+=`
            <article class="entrada" data-id="${index}">
                <h2><img id="post-1" class="favorite" src="img/${star(article)}" alt="marcar como favorita" />${article.title}</h2>
                <img src="img/${article.img}" alt="Imagen ${article.title}">
                <p>${article.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur augue at nibh mollis interdum ac vel orci. In quis condimentum diam. Morbi in sapien vestibulum, feugiat mauris ut, commodo nisl. Quisque sodales tellus pulvinar, sagittis lorem non, facilisis magna. Etiam imperdiet quam quam. Vestibulum rutrum arcu id tristique posuere. Fusce tortor massa, scelerisque ut condimentum vel, tempor a velit. Vivamus blandit orci quis ante vehicula cursus. Sed vel dui ornare, blandit erat at, tincidunt ex. Nam mauris tortor, suscipit non diam eu, ullamcorper tempus massa. Nunc vitae nulla eu diam consequat aliquam id sed orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tempor placerat nunc, sed ultrices turpis auctor et. Vestibulum auctor turpis metus, quis viverra ex dignissim eget. Phasellus pharetra mauris at libero pulvinar scelerisque.</p>
                <a href="#" class="boton">Leer Más</a>
            </article>
        `;
    });
}
const printFavourites=()=>{
    favoritesContainer.innerHTML="";
    favoritesPlaces.forEach((article)=>{
        favoritesContainer.innerHTML+=`
        <div class="favorite">
          <h3>${article.title}</h3>
          <p>${article.description}<p>
        </div>
        `;
    });
}

const getJSON=async()=>{
    let res = await fetch("../data/data.json");
    placesJSON=await res.json();
}

const addFavourites=e=>{
    let dom = e.target;
    if(dom.classList.contains("favorite")){
        let artId = dom.parentNode.parentNode.dataset.id;
        let image = String(dom.src).split("/");
        image=image[image.length-1];
        let obj = placesJSON.find((el,index)=>index==artId);
        if(image.match(/off/)!=null){
            dom.src="img/favorite-on-icon.png";
            favoritesPlaces.push(obj);
        }else{
            dom.src="img/favorite-off-icon-2.png";
            favoritesPlaces=favoritesPlaces.filter(el=>el.title!=obj.title);
        }
    }
    localStorage.setItem("favourites",JSON.stringify(favoritesPlaces));
    printFavourites();
}

const init=async()=>{
    await getJSON();
    printArticles();
    printFavourites();
    articlesContainer.addEventListener("click",addFavourites);
}
init();