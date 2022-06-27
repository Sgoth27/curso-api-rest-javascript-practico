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

//getTrendingMoviesPreview y getMoviesByCategory estan repitiendo casi el mismo código por lo que se va a crear una funcion especifica para remplazarlo
//se envia el arrya de peliculas y el contenedor o donde se debe hacer la incercion o appendechild de la pelicula
function createMovies(movies, container){
    container.innerHTML= "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        movieContainer.addEventListener('click', () =>{
          location.hash = '#movie=' + movie.id;
        })
    
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
          'src',
          'https://image.tmdb.org/t/p/w300' + movie.poster_path,
        );
    
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
      });
}

function createCategories(categories, container){
    container.innerHTML="";

    //ahora vamos a iterar el array de movies para poder crear en el documento html en la etiqueta article con clase trendingPreview-movieList un div container por cada pelicular
    categories.forEach(category => {
        

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        //para agregar un nuevo atributo a la etiqueta se usa setAttribute, con dos argumentos el segundo es para indicarle que mensaje debe tener en caso de que no cargue la imagen y le estamos enviando una de las propiedades del objeto movie
        categoryTitle.setAttribute('id', `id${category.id}`);

        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${category.id}-${category.name}`;
        })

        const categoryTitleText = document.createTextNode(category.name);

        //ahora vamos a agregar el bloque al documento html
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}


async function getTrendingMoviesPreview(){

   
    const {data} = await api(`trending/movie/day`);

    //como cualquier peticion a fetch hay que llamar a data
    //const data = await res.json();

    const movies = data.results;
    console.log(movies);
    createMovies(movies,trendingMoviesPreviewList);
    
}

//para ello creamos una funcion asincrona
async function getCategoriesPreview(){

     //se remplaza fetch por la const api. 
    const {data} = await api(`genre/movie/list`);

    //como cualquier peticion a fetch hay que llamar a data
    //Recordar que axios devuelve una respuesta distinta y no es necesario res.jason para convertir a objetos de javascript
    //const data = await res.json();
    //se puede destructurar res y convertirlo a cons { status } o const { data }

    const categories = data.genres;
    
    createCategories(categories,categoriesPreviewList);
    

    
}


async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;
  
    createMovies(movies,genericSection);
    
  }

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
      params: {
        //query: query como es igual no es necesario escribirlo de esta forma
        query,
      },
    });
    const movies = data.results;
  
    createMovies(movies,genericSection);
    
  }

  async function getTrendingMovies(){

   
    const {data} = await api(`trending/movie/day`);

    //como cualquier peticion a fetch hay que llamar a data
    //const data = await res.json();

    const movies = data.results;
    createMovies(movies,genericSection);
       
}

async function getMovieById(id){

   
  const {data: movie} = await api(`movie/` + id);

  //se comenta la linea de abajo porque para esta estructura ya no es un array de peliculas de la propiedad results que tengamos que iterar sino que unicamente vamos a recibir tal cual ya el objeto con la info de la pelicula
  //const movies = data.results;
  //se renombrea data

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background =`
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(id);
     
}

async function getRelatedMoviesId(id){
  const {data} = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
};


//este llamado de funciones se pasan al archivo de navigation
// getTrendingMoviesPreview();
// getCategoriesPreview();
