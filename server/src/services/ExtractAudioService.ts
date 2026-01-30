import { spawn } from "child_process";
import { Response } from "express";

export class ExtractAudioService {
  pipe(videoPath: string, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("🎵 Extraindo áudio via stream com FFmpeg...");

      const ffmpeg = spawn("ffmpeg", [
        "-i",
        videoPath,

        "-vn", //remove vídeo
        "-acodec",
        "libmp3lame",

        "-q:a",
        "2",

        "-f",
        "mp3",

        "pipe:1", //aída no stdout
      ]);

      // logs
      ffmpeg.stderr.on("data", (data) => {
        console.log("FFmpeg:", data.toString());
      });

      //stdout → response
      ffmpeg.stdout.pipe(res);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Stream finalizado com sucesso");
          resolve();
        } else {
          reject(new Error("❌ Erro ao extrair áudio do vídeo"));
        }
      });

      ffmpeg.on("error", (err) => {
        reject(err);
      });

      //se cliente cancelar request
      res.on("close", () => {
        ffmpeg.kill("SIGKILL");
      });
    });
  }
}
