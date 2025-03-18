const API_KEY = "5be51529f03042ccf34a99260c268f40";
const BASE_URL = "https://api.themoviedb.org/3"

export const GetPopularMovies = async() =>{
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results
}

export const SearchMovies = async(query) =>{
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results
}