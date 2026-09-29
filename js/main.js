// main.js - liga os eventos da tela às funções dos outros arquivos

const areaEventos = document.getElementById("app"); // a div onde as páginas aparecem

// Mostra uma mensagem em cima do formulário.
// tipo pode ser "success" ou "error" (usa as classes alert-success e alert-error do CSS)
function mostrarMensagem(tipo, texto) {
  document.getElementById("mensagem-form").innerHTML =
    `<div class="alert alert-${tipo}">${texto}</div>`;
}

// Pega o que foi digitado no formulário e monta um objeto.
// Não guardo o CPF, por ser dado pessoal.
function lerDadosDoFormulario() {
  return {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value,
    data: new Date().toLocaleString("pt-BR")
  };
}

// EVENTO 1: click no menu
// Quando clica em um link, o menu do celular fecha.
document.querySelector("nav").addEventListener("click", function (evento) {
  if (evento.target.tagName === "A") {
    document.getElementById("menu-toggle").checked = false;
  }
});

// O formulário é criado pelo JavaScript depois que a página abre,
// por isso os eventos abaixo ficam na div "app" (delegação de eventos).

// EVENTO 2: focusout (quando o usuário sai de um campo)
// Verifica o campo assim que a pessoa termina de preencher.
areaEventos.addEventListener("focusout", function (evento) {
  if (evento.target.tagName === "INPUT") {
    verificarCampo(evento.target);
  }
});

// EVENTO 3: input (a cada letra digitada)
areaEventos.addEventListener("input", function (evento) {
  const campo = evento.target;

  // No campo estado, deixa as letras maiúsculas enquanto digita
  if (campo.id === "estado") {
    campo.value = campo.value.toUpperCase();
  }

  // Se o campo já estava com erro, verifica de novo para o erro sumir assim que corrigir
  if (campo.classList.contains("campo-erro")) {
    verificarCampo(campo);
  }
});

// EVENTO 4: submit (envio do formulário)
areaEventos.addEventListener("submit", function (evento) {
  if (evento.target.tagName !== "FORM") {
    return;
  }

  evento.preventDefault(); // impede a página de recarregar

  // Verifica todos os campos, um por um
  const campos = evento.target.querySelectorAll("input");
  let tudoCerto = true;

  for (let i = 0; i < campos.length; i++) {
    if (verificarCampo(campos[i]) === false) {
      tudoCerto = false;
    }
  }

  if (tudoCerto === false) {
    mostrarMensagem("error", "Corrija os campos em vermelho antes de enviar.");
    return;
  }

  // Deu tudo certo: guarda os dados no localStorage
  salvarCadastro(lerDadosDoFormulario());

  // Mostra a página de novo (o formulário volta vazio e a lista já mostra o novo cadastro)
  mostrarPagina();
  mostrarMensagem("success", "Cadastro enviado com sucesso! Entraremos em contato.");
});

// EVENTO 5: click no botão "Limpar lista"
areaEventos.addEventListener("click", function (evento) {
  if (evento.target.id === "limpar-cadastros") {
    limparCadastros(); // função do storage.js
    mostrarPagina();
  }
});

// EVENTO 6: tecla Esc fecha um modal aberto (acessibilidade por teclado)
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    const modalAberto = document.querySelector(".modal-toggle-input:checked");
    if (modalAberto !== null) {
      modalAberto.checked = false;
    }
  }
});

// ---- Modo escuro ----
const botaoTema = document.getElementById("botao-tema");

function aplicarTema(escuro) {
  document.body.classList.toggle("modo-escuro", escuro);
  botaoTema.setAttribute("aria-pressed", escuro ? "true" : "false");
  botaoTema.textContent = escuro ? "☀️ Modo claro" : "🌙 Modo escuro";
}

// Ao abrir o site, usa o tema que a pessoa escolheu da última vez (se houver)
aplicarTema(lerTemaEscuro());

botaoTema.addEventListener("click", function () {
  const estaEscuroAgora = document.body.classList.contains("modo-escuro");
  aplicarTema(!estaEscuroAgora);
  salvarTema(!estaEscuroAgora);
});
