// mascaras.js - máscaras de digitação (usa a biblioteca IMask do CDN)

// Usa a biblioteca IMask (carregada pelo CDN no index.html)
// para colocar pontos, traços e parênteses automaticamente enquanto a pessoa digita.
function aplicarMascaras() {
  // Se a biblioteca não carregou (ex: sem internet), o site continua funcionando sem máscara
  if (typeof IMask === "undefined") {
    return;
  }

  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  // Esses campos só existem na página de cadastro, então testamos antes
  if (cpf !== null) {
    IMask(cpf, { mask: "000.000.000-00" }); // 0 = aceita só um número
  }
  if (telefone !== null) {
    IMask(telefone, { mask: "(00) 00000-0000" });
  }
  if (cep !== null) {
    IMask(cep, { mask: "00000-000" });
  }
}
