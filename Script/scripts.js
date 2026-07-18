  // Sua função original idêntica, sem alterações
function showSection(id){
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Lógica de controle do Menu Hambúrguer / Gaveta
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Abre e fecha a gaveta ao clicar no botão
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Fecha a gaveta automaticamente quando qualquer link do menu for clicado no mobile
const menuLinks = document.querySelectorAll('nav a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});













// 1. NAVEGAÇÃO DOS PROJETOS (SEM COMPORTAMENTO DE CARROSSEL VISUAL)
const blocosProjetos = document.querySelectorAll('.projeto-bloco');
let posicaoAtual = 0;

function mudarFocoProjeto(novaPosicao) {
  blocosProjetos[posicaoAtual].classList.remove('ativo');

  if (novaPosicao < 0) {
    posicaoAtual = blocosProjetos.length - 1;
  } else if (novaPosicao >= blocosProjetos.length) {
    posicaoAtual = 0;
  } else {
    posicaoAtual = novaPosicao;
  }

  blocosProjetos[posicaoAtual].classList.add('ativo');
}

// Escuta cliques nas setas de forma global e segura
document.addEventListener('click', function(e) {
  if (e.target.closest('.btn-anterior')) {
    mudarFocoProjeto(posicaoAtual - 1);
  } else if (e.target.closest('.btn-proximo')) {
    mudarFocoProjeto(posicaoAtual + 1);
  }
});


// 2. BANCO DE DADOS EXPANDIDO DOS DETALHES E FOTOS
const informacoesProjetos = {
  roupas: {
    titulo: "Sistema de Venda de Roupas",
    descricao: "Este sistema é uma plataforma completa de comércio eletrónico focada no retalho de moda. Possui controlo total de stocks de tamanhos/cores, carrinho de compras interativo via JavaScript e uma sofisticada barra de filtragem assíncrona baseada na biblioteca MixItUp, que permite alternar categorias sem recarregar a página.",
    fotos: ["../images/Golden\ Closet1.png", "../images/Golden\ Closet2.png", "../images/Golden\ Closet3.png"]
  },
  restaurante: {
    titulo: "Sistema de Gestão de Restaurante",
    descricao: "Desenvolvido para automatizar as operações do salão e da cozinha. Permite a abertura de mesas, lançamento de pedidos em tempo real por colaboradores e cálculo automatizado de contas. Toda a comunicação de status do pedido para o painel da cozinha é feita de forma assíncrona com Ajax.",
    fotos: ["../images/Banquetedourado1.png", "../images/Banquetedourado2.png"]
  },
  inventario: {
    titulo: "Gestão de Inventário de Máquinas",
    descricao: "Sistema corporativo projetado para monitorizar o parque tecnológico. Realiza auditorias de hardware e regista especificações técnicas de computadores e periféricos através de uma interface Swing elegante. O sistema comunica com uma API web para sincronização e armazenamento centralizado dos dados das máquinas.",
    fotos: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=500", "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500"]
  },
  webmessage: {
    titulo: "WebMessage",
    descricao: "Um software focado em mensajaria instantânea e comunicação leve via navegador. Utiliza Python no servidor para manipulação ágil das rotas e SQLite para persistir as conversas de forma rápida com consumo mínimo de recursos de infraestrutura.",
    fotos: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500"]
  },
  livros: {
    titulo: "Sistema de Gestão de Livros",
    descricao: "Aplicação desktop nativa robusta focada na gestão de acervos de bibliotecas e livrarias. Realiza pesquisas complexas por autor, género ou editora e gere empréstimos e devoluções, alertando sobre prazos ultrapassados.",
    fotos: ["../images/livros.png", "../images/livros1.png"]
  },
  landing: {
    titulo: "Página de Venda de Produtos(JumpStarts)",
    descricao: "Landing Page de alta conversão estruturada com semântica moderna. Possui secções de prova social, tabelas de preços apelativas, animações de scroll puras em JavaScript e foco total na otimização de carregamento (SEO).",
    fotos: [ "../images/jumpstart1.png", "../images/jumpstart2.png", "../images/jumpstart3.png"]
  },
  crud: {
    titulo: "CRUD Estudantes",
    descricao: "Projeto focado na aplicação estrita de padrões de arquitetura (DAO) para persistência segura de registos escolares. Realiza validações de campos e operações diretas na base de dados relacional MySQL através de JDBC.",
    fotos: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500"]
  }
};

const modal = document.getElementById('detalhesModal');
const mTitulo = document.getElementById('modalTitulo');
const mDescricao = document.getElementById('modalDescricaoCompleta');
const mGrid = document.getElementById('modalGridImagens');
const btnFechar = document.querySelector('.fechar-modal-btn');

document.addEventListener('click', function(e) {
  const botaoTrigger = e.target.closest('.btn-detalhes-trigger');
  if (botaoTrigger) {
    const chave = botaoTrigger.getAttribute('data-projeto');
    const dados = informacoesProjetos[chave];

    if (dados) {
      mTitulo.innerText = dados.titulo;
      mDescricao.innerText = dados.descricao;
      mGrid.innerHTML = ''; // Limpa fotos anteriores

      // Injeta todas as fotos mapeadas no array
      dados.fotos.forEach(srcUrl => {
        const img = document.createElement('img');
        img.src = srcUrl;
        img.alt = dados.titulo;
        mGrid.appendChild(img);
      });

      modal.classList.add('open');
    }
  }
});

btnFechar.addEventListener('click', () => modal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
 
