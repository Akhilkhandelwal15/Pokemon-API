import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = ()=>{

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    
    const API = "https://pokeapi.co/api/v2/pokemon";

    const fetchPokemons = async()=>{
        setLoading(true);
        try{
            const res = await fetch(API);
            const data = await res.json();

            const detailedPokemonData = data.results.map(async(item)=>{
                try{
                    const res = await fetch(item.url);
                    const data = await res.json();
                    return data;
                }
                catch(error){
                    console.log("error", error);
                    return null;
                }
            });

            const allPokeonsData = await Promise.all(detailedPokemonData);
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
        fetchPokemons();
    }, []);

     useEffect(()=>{
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            console.log("hereee");
        }, 500);

        return ()=> clearTimeout();
    }, [search]);

    const filteredData = pokemons.filter((item)=> item.name.toLowerCase().includes(debouncedSearch.toLowerCase().trim()));

    return (
        <div className="main-container">
            <h2>Explore your favourite pokemons</h2>
            <input type="text" placeholder="Search..." value={search} onChange={(event)=>setSearch(event.target.value)}/>
            {loading? <p>Loading...</p> : error ? <p>Error while fetching data {error} </p> : (
                <div className="cards">
                        {filteredData.map((pokemon)=>(
                            <PokemonCards key={pokemon.id} pokemon={pokemon} />
                        ))}
                </div>
            )}
            {!loading && !error && filteredData.length===0 && <h1>No Results Found</h1>}
        </div>
    );
}