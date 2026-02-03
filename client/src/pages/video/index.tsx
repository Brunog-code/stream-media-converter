import toast from "react-hot-toast";
import { Container } from "../../components/container";
import styles from "./styles.module.css";

import ImgVideo from "../../assets/audio-video.webp";

import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ModalMedia } from "../../components/modal-media";

export function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<false | true>(false);

  const MAX_SIZE = 30 * 1024 * 1024; // 30MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_SIZE) {
        toast.error("Arquivo muito grande! O limite é de 30MB.");
        setVideoFile(null); // Adicione esta linha
        e.target.value = "";
        e.target.files = null; // Adicione esta linha para navegadores modernos

        return;
      }

      const allowedTypes = ["video/mp4", "video/webm"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Formato inválido! Envie apenas vídeos MP4 ou WebM.");
        setVideoFile(null); // Adicione esta linha
        e.target.value = "";
        e.target.files = null; // Adicione esta linha
        return;
      }
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Selecione um vídeo.");
      return;
    }

    if (videoFile.size > MAX_SIZE) {
      toast.error("Arquivo muito grande! O limite é de 30MB.");
      // e.target.value = ""; // Limpa o input
      return;
    }

    const allowedTypes = ["video/mp4", "video/webm"];
    if (!allowedTypes.includes(videoFile.type)) {
      toast.error("Formato inválido! Envie apenas vídeos MP4 ou WebM.");
      // e.target.value = ""; // Limpa o input
      return;
    }

    try {
      setIsDisabled(true);
      const formData = new FormData();
      formData.append("video", videoFile);

      const response = await fetch(
        "https://speech-api.brunogcode.com.br/api/video/stream",
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        toast.error("Erro ao extrair o audio");
        setIsDisabled(false);
        return;
      }

      //recebe áudio como blob (mp3)
      const blob = await response.blob();

      //cria URL temporária
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
      toast.success("Audio gerado com sucesso");
      setShowModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao extrair o audio");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Container>
      <section className={styles.container}>
        <div className={styles.content_container}>
          <h1 className={styles.title}>Extraia o áudio do seu video</h1>
          <p className={styles.description}>
            Envie um video de até<strong> 30mb</strong>, e extraia o áudio.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.videoInputWrapper}>
              <input
                type="file"
                accept="video/*"
                className={styles.inputFile}
                onChange={handleFileChange}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FaCloudUploadAlt className={styles.videoInputIcon} />
                <span className={styles.videoInputText}>
                  {videoFile
                    ? videoFile.name
                    : "Clique ou arraste para enviar o vídeo"}
                </span>
              </div>
            </label>
            <button
              className={styles.button}
              type="submit"
              disabled={isDisabled}
            >
              {isDisabled ? "Extraindo..." : "Extrair"}
            </button>
          </form>

          {audioUrl && showModal && (
            <ModalMedia audioUrl={audioUrl} setShowModal={setShowModal} />
          )}
        </div>
        <div className={styles.img_container}>
          <img src={ImgVideo} alt="Imagem representando video e microfone" />
        </div>
      </section>
    </Container>
  );
}
