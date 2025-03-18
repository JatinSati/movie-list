import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react";
import { GetPopularMovies, SearchMovies } from "../services/Api";
import "../CSS/Home.css"

function Home (){

    const [ SearchQuery, setSearchQuery] = useState("");
    const [ Movies, setMovies] = useState([]);
    const [ Error, setError] = useState(null);
    const [ Loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async() => {
            try{
                const popularMovies = await GetPopularMovies()
                setMovies(popularMovies)
            }
            catch(err){
                console.log(err)
                setError("Failed to load movies.....")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async(e) => {
        e.preventDefault()
        if (!SearchQuery.trim()) return
        if (Loading) return

        setLoading(true)
        try{
            const searchResults = await SearchMovies(SearchQuery)
            setMovies(searchResults)
            setError(null)
        }
        catch(err){
            console.log(err)
            setError("Failed to load the movies...")
        }
        finally{
            setLoading(false)
        }
    };

    return <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
                   placeholder="search for movies..." 
                   className="search-input"
                   value={SearchQuery}
                   onChange={(e)=> setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {Error && <div className="error-message">{Error}</div> }
        {Loading ? 
          (<div className="loading">Loading......</div>) : 
          (<div className="movies-grid">
            {Movies.map((movie) => 
              movie.title.toLowerCase().startsWith(SearchQuery) && (<MovieCard movie= {movie} key={movie.id}/>) 
            )}
          </div>
        )}
        
    </div>
}

export default Home