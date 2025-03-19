function lerTextoEmVozAlto(texto: string): void {
  // Verifica se o navegador suporta a API SpeechSynthesis
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    // Cria um novo objeto SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(texto);

    // Opcional: configurações de voz e idioma
    utterance.lang = 'pt-BR'; // Define o idioma como português brasileiro
    utterance.rate = 1; // A velocidade da fala (1 é normal)
    utterance.pitch = 1; // O tom da voz (1 é o tom normal)

    // Faz a leitura
    synth.speak(utterance);
  } else {
    console.error('A API SpeechSynthesis não é suportada neste navegador.');
  }
}

export default lerTextoEmVozAlto;