import { VideoToAudioService } from "../services/VideoToTextService.js";
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

      //stream direto FFmpeg → response
      await this.videoToAudioService.stream(videoPath, res);

      //remove vídeo depois
      fs.unlinkSync(videoPath);

      //remove vídeo depois que terminar
      res.on("finish", () => {
        fs.unlinkSync(videoPath);
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro interno ao processar o video",
      });
    }
  }
}
