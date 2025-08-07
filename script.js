fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQIkQKdVnLm-MQbJVymtqlV7IGWoFQNxYtagebaNkC_ygx7A6SDJqdixjqwQEDWoCEu4jDCAd22zHKl/pub?gid=0&single=true&output=csv')
  .then(res => res.text())
  .then(csvText => {
    // Transformar CSV em array (simples)
    const linhas = csvText.trim().split('\n');
    const dados = linhas.slice(1).map(linha => linha.split(',')); // pulando cabeçalho
    
    // filtra só produtos ativos (coluna 4 = 'sim')
    const produtos = dados.filter(p => p[4]?.toLowerCase() === 'sim');

    // pega categorias únicas da coluna 3
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
