const SHEET_ID = '1MMdMCZP2jwb6VVaEbUs9DSXxjGphLFJsnIuM7gqR4Ho';
const SHEET_NAME = 'Página';
const RANGE = 'A2:E';
const API_KEY = 'AIzaSyCpZQWjoRaBA5b4s1EFuXi6vcNSWFSn5PQ';

const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const produtos = data.values.filter(p => p[4]?.toLowerCase() === 'sim');

    const categorias = [...new Set(produtos.map(p => p[3]))];
    renderizarFiltros(categorias);
    renderizarProdutos(produtos);

    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', () => {
        const categoria = button.dataset.categoria;
        const filtrados = categoria === 'todos' ? produtos : produtos.filter(p => p[3] === categoria);
        renderizarProdutos(filtrados);
      });
    });
  });

function renderizarFiltros(categorias) {
  const container = document.getElementById('filters');
  container.innerHTML = `<button class="filter-button" data-categoria="todos">Todos</button>`;
  categorias.forEach(cat => {
    container.innerHTML += `<button class="filter-button" data-categoria="${cat}">${cat}</button>`;
  });
}

function renderizarProdutos(produtos) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';

  produtos.forEach(produto => {
    const [imagem, descricao, link, categoria] = produto;
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
      <img src="${imagem}" alt="${descricao}" />
      <p>${descricao}</p>
      <a class="botao" href="${link}" target="_blank">Ver Oferta</a>
    `;
    container.appendChild(card);
  });
}
