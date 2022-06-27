//se quiere tener toda la logica de navegacion en un archivo aparte
//se declara despues de main.js en el documento html para que pueda llamar a todas las funciones de main.js

//
searchFormBtn.addEventListener('click', () =>{
    searchFormInput.value;
    location.hash = '#search=' + searchFormInput.value;
});

//
trendingBtn.addEventListener('click', () =>{
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () =>{
    //funcion history sirve para que al dar click sobre la flecha no nos lleve directo al home sino a la busqueda o interacción que tuve anterior
    history.back();
   
   // location.hash = '#home';
});

//queremos hacer el llamado de navigator cuando cargue la aplicacion
window.addEventListener('DOMContentLoaded', navigator, false);

//para hacer el llamado de navigator cuando cambie el hash.. averiguar para que sirve el tercer elemento.
window.addEventListener('hashchange', navigator, false);


//esta funcion se va a llamar cuando cargue mi aplicacion y cuando cargue el hash
function navigator(){
    console.log({location});
    
    //se va a usar el metodo para strings startsWidth
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search=')){
        searchPage();
    }else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if (location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
        homePage();
    }
     
    //el app tiene un comportamiento de que cada vez que se cambia de hash o de pagina deja al usuario casi que en el footer y toca hacer scroll hasta el inicio
    //para suplir eso se deja el siguiente comando donde deja el scroll en la posicion 0px
    //en algunos navegadores toca usar documentElement
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage(){
    console.log("estamos en home!!");

    headerSection.classList.remove('header-container--long');
    //para que cada vez que estemos en el home no muestre una imagen de fondo de una pelicula por lo tanto se le da un estilo de bacgground vacio
    headerSection.style.background = '';
    //la flecha para retornar
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    //ahora se cambio de sitio el llamado a las funciones de main2 para que se cargen solamente cuando el hash sea el del home
    getTrendingMoviesPreview();
    getCategoriesPreview();

}


function categoriesPage(){
    console.log("estamos en la vista de categorias!!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,categoryData] = location.hash.split('='); //esto retornar un array con dos elementps [#category, id-name]
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);

}


function movieDetailsPage(){
    console.log("estamos en la seccion de detalles de una pelicula!!");
    
    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_,movieId] = location.hash.split('=');

    getMovieById(movieId);
}


function searchPage(){
    console.log("estamos en la vista de busqueda!!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log("estamos en 'trends!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
}