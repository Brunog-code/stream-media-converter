import { Response } from "express";
import { ExtractAudioService } from "./ExtractAudioService.js";

export class VideoToAudioService {
  constructor(private readonly extractAudio: ExtractAudioService) {}

  async stream(videoPath: string, res: Response) {
    //apenas chama o pipe do FFmpeg
    return this.extractAudio.pipe(videoPath, res);
  }
}
