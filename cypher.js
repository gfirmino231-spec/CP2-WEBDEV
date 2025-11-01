
/* -----------------------------
   PARTE 1 - CIFRA ATBASH
   ----------------------------- */

function cifrarAtbash(mensagem) {
  let resultado = "";

  for (let i = 0; i < mensagem.length; i++) {
    let letra = mensagem[i];
    let codigo = mensagem.charCodeAt(i);

    if (codigo >= 65 && codigo <= 90) { // A-Z
      resultado += String.fromCharCode(90 - (codigo - 65));
    } else if (codigo >= 97 && codigo <= 122) { // a-z
      resultado += String.fromCharCode(122 - (codigo - 97));
    } else {
      resultado += letra; 
    }
  }
  return resultado;
}

/* -----------------------------
   PARTE 2 - CIFRA DE CÉSAR
   ----------------------------- */

function cifrarCesar(mensagem, chave) {
  let resultado = "";

  for (let i = 0; i < mensagem.length; i++) {
    let letra = mensagem[i];
    let codigo = mensagem.charCodeAt(i);

    if (codigo >= 65 && codigo <= 90) {
      
      let novoCodigo = ((codigo - 65 + chave) % 26 + 26) % 26 + 65;
      resultado += String.fromCharCode(novoCodigo);
    } else if (codigo >= 97 && codigo <= 122) {
      
      let novoCodigo = ((codigo - 97 + chave) % 26 + 26) % 26 + 97;
      resultado += String.fromCharCode(novoCodigo);
    } else {
      resultado += letra;
    }
  }
  return resultado;
}

/* -----------------------------
   PARTE 3 - CIFRA DE VIGENÈRE
   ----------------------------- */

function cifrarVigenere(mensagem, chave, modo = "codificar") {
  let resultado = "";
  let j = 0; 

  for (let i = 0; i < mensagem.length; i++) {
    let letra = mensagem[i];
    let codigo = mensagem.charCodeAt(i);

    if ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122)) {
      let chaveLetra = chave[j % chave.length].toLowerCase();
      let deslocamento = chaveLetra.charCodeAt(0) - 97;

      if (modo === "decodificar") deslocamento = -deslocamento;

      if (codigo >= 65 && codigo <= 90) {
        let novoCodigo = ((codigo - 65 + deslocamento) % 26 + 26) % 26 + 65;
        resultado += String.fromCharCode(novoCodigo);
      } else {
        let novoCodigo = ((codigo - 97 + deslocamento) % 26 + 26) % 26 + 97;
        resultado += String.fromCharCode(novoCodigo);
      }

      j++;
    } else {
      resultado += letra;
    }
  }

  return resultado;
}

/* -----------------------------
   PARTE 4 - RSA DIDÁTICO 
   ----------------------------- */
function gerarChavesRSA_Didaticas(p, q) {
  const N = p * q;
  const phi = (p - 1) * (q - 1);

  let E = 3;
  while (E < phi) {
    if (phi % E !== 0) break;
    E++;
  }

  let D = 1;
  while ((D * E) % phi !== 1) {
    D++;
  }

  return {
    publica: { E, N },
    privada: { D, N },
  };
}


function cifrarRSA_Didatico(mensagem, E, N) {
  let resultado = [];
  for (let i = 0; i < mensagem.length; i++) {
    let codigo = mensagem.charCodeAt(i);
    let cifrado = 1;
    for (let j = 0; j < E; j++) {
      cifrado = (cifrado * codigo) % N;
    }
    resultado.push(cifrado);
  }
  return resultado;
}


function decifrarRSA_Didatico(mensagemCifrada, D, N) {
  let texto = "";
  for (let i = 0; i < mensagemCifrada.length; i++) {
    let c = mensagemCifrada[i];
    let decifrado = 1;
    for (let j = 0; j < D; j++) {
      decifrado = (decifrado * c) % N;
    }
    texto += String.fromCharCode(decifrado);
  }
  return texto;
}

/* -----------------------------
   TESTES
   ----------------------------- */
console.log("===== TESTES =====");

// Atbash
console.log("Atbash:", cifrarAtbash("OlaMundo"));

// César
console.log("César (chave 3):", cifrarCesar("criptografia", 3));
console.log("César (chave -3):", cifrarCesar("fulswrjudiia", -3));

// Vigenère
let chave = "CHAVE";
let cod = cifrarVigenere("Enigma!", chave, "codificar");
console.log("Vigenère cod:", cod);
console.log("Vigenère decod:", cifrarVigenere(cod, chave, "decodificar"));

// RSA
let p = 17, q = 19;
let chaves = gerarChavesRSA_Didaticas(p, q);
console.log("Chaves RSA:", chaves);
let texto = "OLA";
let cifrado = cifrarRSA_Didatico(texto, chaves.publica.E, chaves.publica.N);
console.log("RSA cifrado:", cifrado);
let decifrado = decifrarRSA_Didatico(cifrado, chaves.privada.D, chaves.privada.N);
console.log("RSA decifrado:", decifrado);

