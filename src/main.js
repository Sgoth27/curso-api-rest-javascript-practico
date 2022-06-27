//vamos a empzar a crear nuestra aplicacion

//despues de agregar axios desde script en el documento html aunque se podria desde npm
//hacemos una instancia de este en la variable api
//dentro de axios.create se quiere crear la configuracion por defecto con la que se pueda trabajar en el resto de las consultas
const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },

    //podemos crear queryparameters por defecto
    params: {
        'api_key': API_KEY,
    }
});


async function getTrendingMoviesPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);

    //como cualquier peticion a fetch hay que llamar a data
    const data = await res.json();

    const movies = data.results;
    
    //ahora vamos a iterar el array de movies para poder crear en el documento html en la etiqueta article con clase trendingPreview-movieList un div container por cada pelicular
    movies.forEach(movie => {
        //guardamos en una variable el elemento del documento html que tenga un id trendingPreview y que dentro de sus hijos aquel que tenga la clase trendingPreview-movieList
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        //para agregar un nuevo atributo a la etiqueta se usa setAttribute, con dos argumentos el segundo es para indicarle que mensaje debe tener en caso de que no cargue la imagen y le estamos enviando una de las propiedades del objeto movie
        movieImg.setAttribute('alt', movie.title);

        //en la documentacion de la api se tiene una url base + un tamaño para las imagenes /w300 o /w500 px + un path para obtener la imagen especifica de la pelicula
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        //ahora vamos a agregar el bloque al documento html
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });

    
}

//para ello creamos una funcion asincrona
async function getCategoriesPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);

    //como cualquier peticion a fetch hay que llamar a data
    const data = await res.json();

    const categories = data.genres;
    
    //ahora vamos a iterar el array de movies para poder crear en el documento html en la etiqueta article con clase trendingPreview-movieList un div container por cada pelicular
    categories.forEach(category => {
        
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        //para agregar un nuevo atributo a la etiqueta se usa setAttribute, con dos argumentos el segundo es para indicarle que mensaje debe tener en caso de que no cargue la imagen y le estamos enviando una de las propiedades del objeto movie
        categoryTitle.setAttribute('id', `id${category.id}`);

        const categoryTitleText = document.createTextNode(category.name);

        //ahora vamos a agregar el bloque al documento html
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
    });

    
}

getTrendingMoviesPreview();
getCategoriesPreview();
