var texto = `<html><head><title>Gulliver Traveller - Roteiros</title></head><body><b>->1 - Roteiros para *São Paulo*</b><br>A Terra da Garoa!<br>Fundada em 25 de janeiro de 1554, a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil. Aqui vão três dicas de roteiros obrigatórios para aqueles que passam pela capital paulista<br>#Roteiro A | Região: Avenida Paulista<br>MASP; Parque Trianon; Rua Augusta<br>#Roteiro B | Região: Centro<br>Catedral da Sé; Pátio do Colégio; Rua Augusta<br>#Roteiro C | Região: Vila Madalena<br>Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila<br> <b>->2 - Roteiros para *Las Vegas*</b><br>Viva Las Vegas!<br>       A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905. É considerada oficialmente como uma cidade desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!<br>#Roteiro A | Região: Las Vegas Boulevard South<br>Fonte do Bellagio; Principais Cassinos; Madame Tussauds<br>#Roteiro B | Região: Downtown<br>; Fremont; Las Vegas Art Museum; Museu Nacional do Crime Organizado; <br>#Roteiro C | Região: Las Vegas Boulevard North<br>Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b><br>Privet!<br>A capital russa fica situada às margens do Rio Moscou e, apesar de ser a cidade mais cosmopolita da Rússia, grande parte de sua história está preservada<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin<br>#Roteiro B | Região: Centro<br>Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou<br>#Roteiro C | Região: Obras pela cidade<br>Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  <br>
</body>
</html>`

render();

//Acha todas as ocorrências de um elemento e retorna uma lista de posições desses elementos.
function achaIndices(elemento) {
    const indices = [];
    let index = texto.indexOf(elemento);
    while (index != -1) {
        indices.push(index);
        index = texto.indexOf(elemento, index + 1);
    }
    return indices;
}

//Encontra todos os roteiros e retorna uma lista com apenas os roteiros A de cada cidade.
function achaRoteiros() {
    const indicesRoteiros = achaIndices("#");
    const textoRoteiro = [];

    for(i = 0; i < indicesRoteiros.length; i++) {
        let roteiro = texto.slice(indicesRoteiros[i], indicesRoteiros[i + 1]);
        if (roteiro.startsWith("#Roteiro A")) {
            textoRoteiro.push(roteiro.replaceAll("#", ""));
        }
    }
    return textoRoteiro;
}

//Encontra todas as cidades e retorna uma lista de cidades.
function achaCidades() {
    const indicesCidades = achaIndices("*");
    const cidades = [];

    for (i = 0; i < indicesCidades.length; i = i + 2) {
        let cidade = texto.slice(indicesCidades[i] + 1, indicesCidades[i + 1])
        cidades.push(cidade);
    }
    return cidades;
}

//Encontra pontos turisticos a partir de uma substring.
function achaPontoTuristico(substr) {
    let position = texto.indexOf(substr);
    let position2 = texto.indexOf("#", position)
    let pontosTuristicos = texto.slice(position + substr.length, position2);
    
    return pontosTuristicos;
}

//Renderiza no documento HTML.
function render() {
    const listaCidades = achaCidades();
    const listaRoteiros = achaRoteiros();
    const listaPontosTuristicosCentro = achaPontoTuristico("Região: Centro").replaceAll("<br>", "").split(";");
    const listaPontosTuristicosDowntown = achaPontoTuristico("Região: Downtown").replaceAll("<br>", "").trim().split(";").filter(x => x);

    //Renderiza um elemento li para cada cidade na listaCidades.
    listaCidades.forEach((cidade) => {
        elemento = document.createElement("li")
        elemento.innerHTML = cidade;
        document.getElementById("cidades").appendChild(elemento);
    })

    //Renderiza um elemento li para cada roteiro na listaRoteiros.
    listaRoteiros.forEach(roteiro => {
        elemento = document.createElement("li");
        elemento.innerHTML = roteiro + `<strong> ${roteiro.split(";").length} locais citados nesse roteiro. </strong> <br><br>`;
        document.getElementById("roteiros").appendChild(elemento);
    })

    //Renderiza um elemento li para cada ponto turistico na listaPontosTuristicosCentro.
    listaPontosTuristicosCentro.forEach(item => {
        elemento = document.createElement("li");
        elemento.innerHTML = item;
        document.getElementById("pontosTuristicosCentroSP").appendChild(elemento);
    })

    //Renderiza um elemento li para cada ponto turistico na listaPontosTuristicosDowntown.
    listaPontosTuristicosDowntown.forEach(item => {
        elemento = document.createElement("li");
        elemento.innerHTML = item;
        document.getElementById("pontosTuristicosDowntownLV").appendChild(elemento);
    })
}





