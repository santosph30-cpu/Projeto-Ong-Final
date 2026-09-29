// router.js - troca o conteúdo da página quando o endereço (hash) muda

// Pega da página os elementos que vamos mudar
const app = document.getElementById("app");
const tituloPagina = document.getElementById("page-title");
const subtituloPagina = document.getElementById("page-subtitle");

function mostrarPagina() {
  // O hash é a parte do endereço depois do "#". Ex: "#/projetos"
  let hash = location.hash;
  if (hash === "") {
    hash = "#/";
  }

  // "#/projetos/doacoes" vira ["#", "projetos", "doacoes"]
  const partes = hash.split("/");
  const rota = "/" + partes[1];
  const ancora = partes[2];

  // Procura a página nos templates. Se não achar, mostra a inicial.
  let pagina = TEMPLATES[rota];
  if (pagina === undefined) {
    pagina = TEMPLATES["/"];
  }

  // Limpa a div principal e coloca o conteúdo novo
  app.innerHTML = "";
  app.innerHTML = pagina.html();

  // Troca o título e o subtítulo lá de cima
  tituloPagina.textContent = pagina.titulo;
  subtituloPagina.textContent = pagina.subtitulo;
  document.title = "ONG - " + pagina.titulo;

  marcarLinkAtivo(rota);

  // Os campos do formulário acabaram de ser criados, então aplicamos as máscaras agora
  aplicarMascaras();

  // Se o link tinha uma âncora (ex: doacoes), rola até ela. Senão, vai pro topo.
  if (ancora !== undefined && document.getElementById(ancora) !== null) {
    document.getElementById(ancora).scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

// Deixa em destaque o link da página atual
function marcarLinkAtivo(rota) {
  const links = document.querySelectorAll("nav a[data-rota]");

  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.rota === rota) {
      links[i].classList.add("ativo");
      links[i].setAttribute("aria-current", "page"); // avisa o leitor de tela qual é a página atual
    } else {
      links[i].classList.remove("ativo");
      links[i].removeAttribute("aria-current");
    }
  }
}

// Quando o hash muda, mostra a página nova
window.addEventListener("hashchange", mostrarPagina);

// Quando o site abre pela primeira vez, mostra a página certa
window.addEventListener("DOMContentLoaded", mostrarPagina);
