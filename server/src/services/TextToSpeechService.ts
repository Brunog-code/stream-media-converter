export class TextToSpeechService {
  async execute(text: string, gender: string) {
    if (text.length > 250) {
      throw new Error("Tamanho excedido.");
    }

    if (text.length < 25) {
      throw new Error("Tamanho minimo 25 letras.");
    }

    if (gender !== "female" && gender !== "male") {
      throw new Error("Genero inválido.");
    }

    //fazer req api
    const url = "https://api.sws.speechify.com/v1/audio/stream";
    const options = {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        Authorization: `Bearer ${process.env.SPEECHIFY_TOKEN_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        voice_id: `${gender == "male" ? "danilo" : "estela"}`,
        model: "simba-multilingual",
      }),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Erro na API Speechify: ${response.status} ${response.statusText}`,
      );
    }

    //Garante que há body
    if (!response.body) {
      throw new Error("Não foi possível receber o stream de áudio.");
    }

    console.log(response.body);
    return response.body;
  }
}
