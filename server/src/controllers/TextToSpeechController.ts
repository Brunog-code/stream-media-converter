import { Response, Request } from "express";
import { TextToSpeechService } from "../services/TextToSpeechService.js";
import { Readable } from "stream";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export class TextToSpeechController {
  //injection
  constructor(private readonly textToSpeechService: TextToSpeechService) {}

  async handle(req: Request, res: Response) {
    try {
      const { text, gender } = req.body;

      //retorna um ReadableStream (Web)
      const webStream = await this.textToSpeechService.execute(text, gender);

      //define headers de áudio para o navegador
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", "inline; filename=audio.mp3");

      //converte Web ReadableStream para Node.js Readable
      const nodeStream = Readable.from(webStream as any);

      // pipeline cuida de erros e finalização - envia direto para o client
      await pipelineAsync(nodeStream, res);

      console.log("Stream enviado com sucesso");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error });
      }
      res.status(500).json({ error: "Erro interno ao processar audio" });
    }
  }
}
