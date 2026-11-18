/* ==========================================================================
   PORTFÓLIO · ALEXANDRE MAOZE
   ========================================================================== */

/* 1. NAVEGAÇÃO ENTRE SECÇÕES ------------------------------------------------ */
const sections  = document.querySelectorAll('main > section');
const navLinks  = document.querySelectorAll('#navMenu a');
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');

function showSection(id) {
  if (!document.getElementById(id)) id = 'home';

  sections.forEach(sec => sec.classList.toggle('active', sec.id === id));
  navLinks.forEach(a => a.classList.toggle('current', a.dataset.section === id));

  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#' + id);
}

// Qualquer elemento com data-section navega para essa secção
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-section]');
  if (!link) return;
  e.preventDefault();
  showSection(link.dataset.section);
});

// Abre a secção indicada no endereço (#projetos, #contacto, ...)
showSection(location.hash.replace('#', '') || 'home');

/* 2. MENU MOBILE ------------------------------------------------------------ */
function closeMenu() {
  menuToggle.classList.remove('active');
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

/* 3. NAVEGAÇÃO DOS PROJETOS ------------------------------------------------- */
const blocos = document.querySelectorAll('.projeto');
let atual = 0;

function mostrarProjeto(pos) {
  blocos[atual].classList.remove('ativo');
  atual = (pos + blocos.length) % blocos.length;   // volta ao início / fim
  blocos[atual].classList.add('ativo');
}

// Contador "1 / 7" em cada projeto
blocos.forEach((bloco, i) => {
  const c = bloco.querySelector('.projeto-contador');
  if (c) c.textContent = `${i + 1} / ${blocos.length}`;
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-anterior')) mostrarProjeto(atual - 1);
  else if (e.target.closest('.btn-proximo')) mostrarProjeto(atual + 1);
});

/* 4. MODAL DE DETALHES ------------------------------------------------------ */
const informacoesProjetos = {
  roupas: {
    titulo: 'Sistema de Venda de Roupas',
    descricao: 'Plataforma completa de comércio eletrónico focada no retalho de moda. Tem controlo de stock por tamanhos e cores, carrinho de compras interativo em JavaScript e uma barra de filtragem baseada na biblioteca MixItUp, que permite alternar categorias sem recarregar a página.',
    fotos: ['images/Golden Closet1.png', 'images/Golden Closet2.png', 'images/Golden Closet3.png']
  },
  restaurante: {
    titulo: 'Sistema de Gestão de Restaurante',
    descricao: 'Desenvolvido para automatizar as operações da sala e da cozinha. Permite abrir mesas, lançar pedidos em tempo real e calcular contas automaticamente. O estado dos pedidos chega ao painel da cozinha de forma assíncrona com Ajax.',
    fotos: ['images/Banquetedourado1.png', 'images/Banquetedourado2.png']
  },
  inventario: {
    titulo: 'Gestão de Inventário de Máquinas',
    descricao: 'Sistema para monitorizar o parque tecnológico. Regista especificações de computadores e periféricos numa interface Swing e comunica com uma API web para sincronizar e guardar os dados das máquinas de forma centralizada.',
    fotos: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=500', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500']
  },
  webmessage: {
    titulo: 'WebMessage',
    descricao: 'Software de mensagens instantâneas leve, usado no navegador. Usa Python no servidor para tratar as rotas e SQLite para guardar as conversas com consumo mínimo de recursos.',
    fotos: ['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500']
  },
  livros: {
    titulo: 'Sistema de Gestão de Livros',
    descricao: 'Aplicação desktop para gestão de acervos de bibliotecas e livrarias. Pesquisa por autor, género ou editora e gere empréstimos e devoluções, alertando para prazos ultrapassados.',
    fotos: ['images/livros.png', 'images/livros1.png']
  },
  landing: {
    titulo: 'Página de Venda de Produtos (JumpStarts)',
    descricao: 'Landing page de alta conversão com HTML semântico. Inclui secções de prova social, tabela de preços, animações de scroll em JavaScript puro e otimização de carregamento para SEO.',
    fotos: ['images/jumpstart1.png', 'images/jumpstart2.png', 'images/jumpstart3.png']
  },
  crud: {
    titulo: 'CRUD Estudantes',
    descricao: 'Projeto focado no padrão DAO para guardar registos escolares com segurança. Valida os campos e executa operações na base de dados MySQL através de JDBC.',
    fotos: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500']
  }
};

const modal    = document.getElementById('detalhesModal');
const mTitulo  = document.getElementById('modalTitulo');
const mDesc    = document.getElementById('modalDescricao');
const mGaleria = document.getElementById('modalGaleria');

function abrirModal(chave) {
  const dados = informacoesProjetos[chave];
  if (!dados) return;

  mTitulo.textContent = dados.titulo;
  mDesc.textContent = dados.descricao;
  mGaleria.innerHTML = '';

  dados.fotos.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = dados.titulo;
    img.loading = 'lazy';
    img.onerror = () => img.remove();   // esconde imagens que não existam
    mGaleria.appendChild(img);
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.btn-detalhes');
  if (trigger) abrirModal(trigger.dataset.projeto);
  if (e.target === modal || e.target.closest('.modal-close')) fecharModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharModal();
});