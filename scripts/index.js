const API_KEY = '19c1825b964bd9efe8351f0414b5185a' // Chave de acesso da API
const API_LANGUAGE = 'pt-br' // Linguagem que vai ser exibido as informações

const MOVIE_IMAGE = {original: 'https://image.tmdb.org/t/p/original', small: 'https://image.tmdb.org/t/p/w500'}

const movieElementList = document.getElementById("movies") // Busca o HTML do Menu Lateral

const movies = [] // Array onde a função loadMovies() vai armazenar os filmes

function getMovie(movieId){return `https://api.themoviedb.org/3/movie/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`} // Faz a requisição da API https://www.themoviedb.org

function movieMain(movie){ // Adiciona as informações do filme principal na tela
        const app = document.querySelector('.app_background img') // Busca o HTML do Fundo

        const rating = document.querySelector(".featured-movie-rating strong") // Busca o HTML da avaliação
        const genres = document.querySelector(".featured-movie span") // Busca o HTML do gênero
    
        const title = document.querySelector(".featured-movie h1") // Busca o HTML do Titulo
        const description = document.querySelector(".featured-movie p") // Busca o HTML da descrição
        
        rating.innerHTML = movie.rating
        genres.innerHTML = movie.release + " - " + movie.genre + " - Filme"
        title.innerHTML = movie.title
        description.innerHTML = movie.description

        app.setAttribute('src', movie.image.original)
}

function createImageMovie(movieImage, movieTitle){
    const movieBackground = document.createElement('div')
    const movieBackgroundImage = document.createElement('img')

    movieBackground.classList.add('movie-background')

    movieBackgroundImage.setAttribute('src', movieImage)
    movieBackgroundImage.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    movieBackgroundImage.setAttribute('loading', 'lazy')

    movieBackground.appendChild(movieBackgroundImage)

    return movieBackground
}

function changeMainMovie(movieId){
    const movie = movies.find(movie => movie.id == movieId)
    movieMain(movie)
}

function addMovieInList(movie){ // Cria de forma dinamica através da lista os filmes no Menu Lateral
        const movieElement = document.createElement('li')
        movieElement.classList.add('movie')

        const movies_genres = `<span>${movie.genre}</span>`
        const movies_name = `<strong>${movie.title}</strong>`
        const movies_play = `<button type="button" onClick="changeMainMovie('${movie.id}')"><img src="./assets/icon-play-button.png" alt=""></button>`

        movieElement.innerHTML = movies_genres + movies_name + movies_play

        movieElementList.appendChild(movieElement)
        movieElement.appendChild(createImageMovie(movie.image.small, movie.title))
}

function changeMenu(){
    const buttonMenu = document.querySelector('.button_menu')
    const aside = document.querySelector('.navigation')

    buttonMenu.classList.toggle('active')
    aside.classList.toggle('active')

}

function loadMovies(){
    const LIST_MOVIES = ['758323', '603692', '447365', '298618', '447277', '136797', '667538'] // Lista de filmes para o Menu Lateral
    LIST_MOVIES.map((movie, index) => {
        fetch(getMovie(movie)).then(response => response.json()).then(data => {
            const movieData = {
                id: movie,
                title: data.title,
                description: data.overview,
                rating: data.vote_average.toFixed(1), // Define somente um número após o Rating
                release: data.release_date.split('-')[0], // Divide a data em uma Array em cada parte que tem "-",
                genre: data.genres[0].name,
                image: {
                    original: MOVIE_IMAGE.original.concat(data.backdrop_path),
                    small: MOVIE_IMAGE.small.concat(data.backdrop_path),
                }
            }
            
            movies.push(movieData) // Adiciona o filme na Array

            if(index == 0){ // O primeiro item da Array LIST_MOVIES, será o filme principal e remove ele do Menu Lateral
                movieMain(movieData)
            }else{
                addMovieInList(movieData)
            }
            
            
        })
    })
  
}

loadMovies() // Carrega o Map da lista de filmes