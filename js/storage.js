// storage.js - tudo que mexe com o localStorage fica aqui.
// Os outros arquivos não usam o localStorage direto, só chamam estas funções.

// Devolve o array de cadastros salvos (ou um array vazio se não tiver nada)
function lerCadastros() {
  const textoSalvo = localStorage.getItem("cadastros"); // texto (string) ou null

  if (textoSalvo === null) {
    return [];
  }

  return JSON.parse(textoSalvo); // texto -> array
}

// Adiciona um cadastro na lista e salva
function salvarCadastro(cadastro) {
  const lista = lerCadastros();
  lista.push(cadastro);

  // o localStorage só guarda texto, então transformamos o array em texto
  localStorage.setItem("cadastros", JSON.stringify(lista));
}

// Apaga todos os cadastros salvos
function limparCadastros() {
  localStorage.removeItem("cadastros");
}

// Lê se o usuário já tinha escolhido o modo escuro numa visita anterior
function lerTemaEscuro() {
  return localStorage.getItem("tema") === "escuro";
}

// Salva a escolha do tema
function salvarTema(escuro) {
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
}
