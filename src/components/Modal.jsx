import { X } from "react-feather"
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function Modal({ movieId, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }


    useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            setLoading(true);
            const endpoint = `${API_BASE_URL}/movie/${movieId}`;
            const response = await fetch(endpoint, API_OPTIONS);
            const data = await response.json();
            console.log(data);
            setMovieDetails(data);

          } catch (error) {
            console.error("Failed to fetch movie details:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMovieDetails();
      }, [movieId]);


  return (
    <>
        <div
        onClick={onClose}
        className={`
            fixed inset-0 flex justify-center items-center transition-colors
            visible bg-black/20`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-black text-white border border-gray-700 rounded-xl shadow transition-all scale-100 opacity-100`}
            >


                {
                    loading ? ( <div className="flex justify-center"><Spinner /></div> ) :
                    movieDetails ? (  
                        <>
                            <button
                                onClick={onClose}
                                className=" z-1 absolute top-2 right-2 p-1 rounded-lg text-white hover:bg-gray-50 hover:text-gray-600"
                            >
                                <X />
                            </button>
                                             
                            <div className={`w-160 h-fit `}>
                                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt="poster" 
                                className="rounded-xl w-full h-[40%] object-cover" 
                                style={{mask: `linear-gradient(to bottom, rgba(0,0,0, 1) 0,   rgba(0,0,0, 1) 40%, 
                                        rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0) 100% 50% / 100% 100% repeat-x`}}
                                />
                                <div className="px-8">
                                    <span className="font-[Trebuchet_MS] font-bold text-3xl">{movieDetails.title}</span>
                                    <div className="my-2 flex gap-x-2 text-sm font-sans">
                                        {
                                            movieDetails.genres.map((genre) => 
                                                (<span key={genre.id} className="bg-zinc-700 p-1 rounded-sm">{genre.name}</span>))
                                        }
                                    </div>
                                    <span className="text-base">{movieDetails.overview}</span>
                                    <div className="mt-5 mb-10">
                                        <a href={movieDetails.homepage} target="_blank" 
                                            className="bg-red-700 rounded-md py-2 px-3 text-xl font-sans">Get Started <span className="text-2xl">&gt;</span></a>
                                    </div>
                                </div>
                            </div>
                        </> 
                            
                    ) : (<p>Failed to load details.</p>)
                }
                
            </div>
        </div>

    </>
  )}