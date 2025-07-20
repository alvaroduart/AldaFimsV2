import { useEffect, useState } from "react";
import { MoviesGrid, PageContainer } from "../HomePage/styles";
import { useMovie } from "../../hooks/useMovie";
import type { Movie } from "../../types";
import MovieCard from "../../components/MovieCard";

export function SearchMovies(){
    const query = new URLSearchParams(window.location.search).get('q') || '';
    const { searchMovies } = useMovie()
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        console.log(query)
        const fetchMovies = async () => {
            const result = await searchMovies(query);
            setMovies(result);
        }
        fetchMovies();
    }, [query]);

    return <PageContainer>
        <h1>Busca de Filmes: {query}</h1>
        <MoviesGrid>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    image={movie.image}
                    rating={movie.rating}
                    onClick={() => {}}
                />
            ))}
        </MoviesGrid>
        {movies.length === 0 && <p>Nenhum filme encontrado para a busca: {query}</p>}
        <p>Mostrando {movies.length} resultados para a busca: {query}</p>
    </PageContainer>;
}