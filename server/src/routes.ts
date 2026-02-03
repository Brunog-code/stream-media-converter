import { Router } from "express";
import { TextToSpeechController } from "./controllers/TextToSpeechController.js";
import { TextToSpeechService } from "./services/TextToSpeechService.js";
import { rateLimite } from "./middlewares/rateLimitMiddleware.js";
import { VideoToAudioService } from "./services/VideoToAudioService.js";
import { VideoToAudioController } from "./controllers/VideoToAudioControlle.js";
import uploadConfig from "./config/multer.js";
import multer from "multer";
import { ExtractAudioService } from "./services/ExtractAudioService.js";

const router = Router();
const upload = multer(uploadConfig);

//instancias
const textToSpeechService = new TextToSpeechService();
const textToSpeechController = new TextToSpeechController(textToSpeechService);

const extractAudio = new ExtractAudioService();
const videoToTextService = new VideoToAudioService(extractAudio);
const videoToAudioController = new VideoToAudioController(videoToTextService);

//endpoints
router.post("/api/audio/stream", rateLimite, (req, res) =>
  textToSpeechController.handle(req, res),
);

router.post(
  "/api/video/stream",
  upload.single("video"),
  rateLimite,

  (req, res) => videoToAudioController.handle(req, res),
);

export { router };
