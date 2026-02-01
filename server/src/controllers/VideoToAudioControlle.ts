import { VideoToAudioService } from "../services/VideoToAudioService.js";
import { Response, Request } from "express";
import fs from "fs";

export class VideoToAudioController {
  constructor(private readonly videoToAudioService: VideoToAudioService) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum video enviado" });
      }

      const videoPath = req.file.path;

      //headers de áudio
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", `inline; filename="audio.mp3"`);

      // ✅ Função única de limpeza (remove o vídeo)
      const cleanup = () => {
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
          console.log("🗑 Vídeo removido:", videoPath);
        }
      };

      // ✅ Se terminar normalmente → remove arquivo
      res.on("finish", cleanup);

      // ✅ Se o usuário cancelar no meio → remove também
      res.on("close", cleanup);

      // 🎵 Stream FFmpeg → Response
      await this.videoToAudioService.stream(videoPath, res);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro interno ao processar o video",
      });
    }
  }
}
