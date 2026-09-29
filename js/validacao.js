// validacao.js - regras de verificação e aviso visual dos campos do formulário

// ---- Regras de formato (RegEx) ----
// ^ = começo do texto, $ = fim do texto, [0-9] = um número, {3} = repete 3 vezes
const regexEmail = /^[^ @]+@[^ @]+\.[^ @]+$/;                 // texto@texto.texto
const regexCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;     // 000.000.000-00
const regexTelefone = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;      // (11) 99999-9999
const regexCep = /^[0-9]{5}-[0-9]{3}$/;                        // 00000-000

// Deixa o campo vermelho e escreve a mensagem de erro embaixo dele
function mostrarErro(campo, texto) {
  campo.classList.remove("campo-ok");
  campo.classList.add("campo-erro");

  let aviso = campo.parentElement.querySelector(".mensagem-erro");
  if (aviso === null) {
    aviso = document.createElement("small"); // cria a tag <small>
    aviso.className = "mensagem-erro";
    aviso.setAttribute("role", "alert"); // avisa o leitor de tela assim que o erro aparece
    campo.parentElement.appendChild(aviso); // coloca dentro da div do campo
  }
  aviso.textContent = texto;
}

// Deixa o campo verde e tira a mensagem de erro
function mostrarOk(campo) {
  campo.classList.remove("campo-erro");
  campo.classList.add("campo-ok");

  const aviso = campo.parentElement.querySelector(".mensagem-erro");
  if (aviso !== null) {
    aviso.remove();
  }
}

// Verifica UM campo. Devolve true se estiver certo e false se estiver errado.
function verificarCampo(campo) {
  const valor = campo.value.trim();
  let erro = "";

  if (valor === "") {
    erro = "Este campo é obrigatório.";
  } else if (campo.id === "nome" && valor.length < 3) {
    erro = "O nome precisa ter pelo menos 3 letras.";
  } else if (campo.id === "email" && !regexEmail.test(valor)) {
    erro = "E-mail inválido. Exemplo: nome@email.com";
  } else if (campo.id === "nascimento" && new Date(valor) > new Date()) {
    erro = "A data de nascimento não pode ser no futuro.";
  } else if (campo.id === "cpf" && !regexCpf.test(valor)) {
    erro = "CPF inválido. Use o formato 000.000.000-00";
  } else if (campo.id === "telefone" && !regexTelefone.test(valor)) {
    erro = "Telefone inválido. Use o formato (11) 99999-9999";
  } else if (campo.id === "cep" && !regexCep.test(valor)) {
    erro = "CEP inválido. Use o formato 00000-000";
  } else if (campo.id === "estado" && valor.length !== 2) {
    erro = "O estado precisa ter 2 letras. Exemplo: SP";
  }

  if (erro !== "") {
    mostrarErro(campo, erro);
    return false;
  }

  mostrarOk(campo);
  return true;
}

// Guarda o cadastro no localStorage.
// Salvo só o que precisa para a lista (não guardo CPF, por ser dado pessoal).
function salvarCadastro() {
  const cadastro = {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value,
    data: new Date().toLocaleString("pt-BR")
  };

  // 1) pega a lista que já existe (se não existir, começa com uma lista vazia)
  let lista = [];
  const textoSalvo = localStorage.getItem("cadastros");
  if (textoSalvo !== null) {
    lista = JSON.parse(textoSalvo); // texto -> array
  }

  // 2) adiciona o novo cadastro
  lista.push(cadastro);

  // 3) o localStorage só guarda texto, então transformamos o array em texto
  localStorage.setItem("cadastros", JSON.stringify(lista));
}
