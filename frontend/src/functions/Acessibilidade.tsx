function lerTextoEmVozAlto(texto: string): void {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(texto);

    utterance.lang = 'pt-BR'; 
    utterance.rate = 1;
    utterance.pitch = 1;

    synth.speak(utterance);
  } else {
    console.error('A API SpeechSynthesis não é suportada neste navegador.');
  }
}

export default lerTextoEmVozAlto;