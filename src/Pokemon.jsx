import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = ()=>{

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const API = "https://pokeapi.co/api/v2/pokemon";

    const fetchPokemons = async()=>{
        try{
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async(item)=>{
                // console.log(item.url);
                try{
                    const res = await fetch(item.url);
                    const data = await res.json();
                    // console.log(data);
                    return data;
                }
                catch(error){
                    console.log("error", error);
                    setLoading(false);
                    setError(error.message);
                }
            });
            // console.log(detailedPokemonData);

            const allPokeonsData = await Promise.all(detailedPokemonData);
            console.log('->>>',allPokeonsData);
            setPokemons(allPokeonsData);
            setLoading(false);
        }
        catch(error){
            console.log("error", error);
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(()=>{
        setLoading(true);
        fetchPokemons();
    }, []);

    return (
        <div className="main-container">
            <h2>Explore your favourite pokemons</h2>
            {loading? <p>Loading...</p> : error ? <p>Error while fetching data {error} </p> : (
                <div className="cards">
                        {pokemons.map((pokemon)=>(
                            <PokemonCards key={pokemon.id} pokemon={pokemon} />
                        ))}
                </div>
            )}
            
        </div>
    );
}