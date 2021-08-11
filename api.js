let promises = [];
const form = document.getElementById('form');

const retrievePokemon = async(startingNumberofPokemon, numberOfPokemon) => {
    promises = [];
    for (let i = startingNumberofPokemon; i <= numberOfPokemon; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        promises.push(await response.json());
    }

    await Promise.all(promises).then(data => {
        console.log(data);
    });
}

const printPokemon = async(event) => {
    let gen = document.getElementById("gen");
    document.getElementById("container").innerHTML = '';

    event.preventDefault();
    if (gen.value === '') { alert('Select a generation!'); }
    if (gen.value === 'starter-test') { await retrievePokemon(1, 9); }
    if (gen.value === 'gen1') { await retrievePokemon(1, 151); }
    if (gen.value === 'gen2') { await retrievePokemon(152, 251); }
    if (gen.value === 'gen3') { await retrievePokemon(252, 386); }
    if (gen.value === 'gen4') { await retrievePokemon(387, 493); }
    if (gen.value === 'gen5') { await retrievePokemon(494, 649); }
    if (gen.value === 'gen6') { await retrievePokemon(650, 721); }
    if (gen.value === 'gen7') { await retrievePokemon(722, 809); }
    if (gen.value === 'gen8') { await retrievePokemon(810, 898); }

    for (let j = 0; j <= promises.length; j++) {
        document.getElementById("container").innerHTML += `
        <div class="pokemon">
            <div class="bio">
                <h1>#${promises[j].id}: <a class="pokemon-name" target="_blank" href='https://pokemon.fandom.com/wiki/${promises[j].forms[0].name}'>${promises[j].forms[0].name}</a></h1>
                <div class="images"> 
                    <img class="sprites" src=${promises[j].sprites.front_default}></img><img class="sprites" src=${promises[j].sprites.back_default}></img>
                </div>
                <div class="images">
                    <img class="sprites" src=${promises[j].sprites.front_shiny}></img><img class="sprites" src=${promises[j].sprites.back_shiny}></img>
                </div>
            </div>
        </div>`
    }
}

form.addEventListener("submit", printPokemon);