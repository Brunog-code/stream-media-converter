import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: "tmp/videos",
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  }),

  limits: {
    fileSize: 20 * 1024 * 1024, //até 20mb
  },

  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["video/mp4", "video/webm"];

    const allowedExts = [".mp4", ".webm"];

    const ext = path.extname(file.originalname).toLowerCase();

    //valida MIME + extensão
    if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error("Formato inválido. Envie apenas vídeos MP4, MKV ou WebM."),
        false,
      );
    }
  },
};
