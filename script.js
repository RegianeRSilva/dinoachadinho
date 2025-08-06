// Bloqueia clique direito e teclas de desenvolvedor
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
    e.preventDefault();
  }
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase()))) {
    e.preventDefault();
  }
});

// Filtro de categorias
const buttons = document.querySelectorAll('.filter-button');
const produtos = document.querySelectorAll('.produto-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const categoria = btn.dataset.category;
    produtos.forEach(prod => {
      prod.style.display = (categoria === 'todos' || prod.dataset.category === categoria) ? 'block' : 'none';
    });
  });
});
