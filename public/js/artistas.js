// =====================================================
// PÁGINA: ARTISTAS
// =====================================================
function paginaArtistas() {
  let cards = "";

  for (let i = 0; i < ARTISTAS.length; i++) {
    const artista = ARTISTAS[i];
    let imagem = "";

    if (artista.foto) {
      imagem = '<img src="' + artista.foto + '" alt="Foto de ' + escapar(artista.nome) + '">';
    } else {
      imagem = escapar(artista.nome[0]);
    }

    cards += `
      <div class="card">
        <div class="ph">${imagem}</div>
        <h3>${escapar(artista.nome)}</h3>
        <span class="tag">${escapar(artista.tipo)}</span>
        <p style="margin-top:8px">${escapar(artista.desc)}</p>
      </div>`;
  }

  return `
    <h2>Artistas</h2>
    <div class="grid">${cards}</div>`;
}