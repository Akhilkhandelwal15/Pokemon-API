export const PokemonCards = ({pokemon})=>{
    return (
        <>
            <div className="card">
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></img>
                <div className="type">{pokemon.types.map((item)=> item.type.name).join(", ")}</div>
                <div className="stats">
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Speed: {pokemon.stats[5].base_stat}</p>
                </div>
                <div className="stats">
                    <p>Experience: {pokemon.base_experience}</p>
                    <p>Attack: {pokemon.stats[1].base_stat}</p>
                    <p>Ability: {pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </>
    );
}