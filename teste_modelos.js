async function listarModelos() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("--- Modelos Disponíveis para sua Chave ---");
    const modelosEmbedding = data.models.filter(m => m.supportedGenerationMethods.includes("embedContent"));
    modelosEmbedding.forEach(m => console.log(`✅ ${m.name}`));
    
    if (modelosEmbedding.length === 0) console.log("❌ Nenhum modelo de embedding encontrado!");
  } catch (err) {
    console.error("❌ Erro ao listar:", err.message);
  }
}
listarModelos();