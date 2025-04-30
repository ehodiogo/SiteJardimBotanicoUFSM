function falarTexto(texto: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Desculpe, seu navegador não suporta síntese de voz.');
  }
}

export { falarTexto };