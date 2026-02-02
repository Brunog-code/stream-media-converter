import { VideoToAudioService } from "../services/VideoToAudioService.js";
import { Response, Request } from "express";
import fs from "fs";

export class VideoToAudioController {
  constructor(private readonly videoToAudioService: VideoToAudioService) {}

  async handle(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum vídeo enviado" });
    }

    const videoPath = req.file.path;

    //Função de limpeza
    const cleanup = () => {
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
        console.log("🗑 Vídeo removido:", videoPath);
      }
    };

    // headers de áudio
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", `inline; filename="audio.mp3"`);

    try {
      // Pipe FFmpeg → response
      await this.videoToAudioService.stream(videoPath, res);
      cleanup(); // remove após finalizar normalmente
    } catch (error) {
      console.error("Erro ao processar vídeo:", error);
      cleanup(); // remove mesmo se der erro
      if (!res.headersSent) {
        res.status(500).json({ error: "Erro interno ao processar o vídeo" });
      } else {
        res.end();
      }
    }

    // se usuário cancelar a request, também remove
    res.on("close", cleanup);
  }
}
