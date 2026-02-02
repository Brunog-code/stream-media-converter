import toast from "react-hot-toast";
import { Container } from "../../components/container";
import styles from "./styles.module.css";

import { useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { ModalMedia } from "../../components/modal-media";

export function Audio() {
  const [text, setText] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const maxChars = 250;
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<false | true>(false);
  const [isDisabled, setIsDisabled] = useState<false | true>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsDisabled(true);
      if (text.length < 25) {
        toast.error("Favor inserir ao menos 25 caracteres");
        setIsDisabled(false);
        return;
      }
      const response = await fetch(
        "https://speech-api.brunogcode.com.br/api/audio/stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, gender }),
        },
      );

      // Verifica se deu certo
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Erro desconhecido");
        setIsDisabled(false);
        return;
      }

      // Transforma o stream em blob(Binary Large Object)
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
      toast.success("Audio gerado com sucesso");
      setShowModal(true);
    } catch (error) {
      if (error instanceof TypeError) {
        // Fetch falhou (geralmente network error)
        toast.error("Não foi possível conectar ao servidor");
      } else if (error instanceof Error) {
        toast.error(error.message);
      }

      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Container>
      <section className={styles.container}>
        <h1 className={styles.title}>Transforme seu texto em áudio</h1>
        <p className={styles.description}>
          Escolha o gênero da voz, insira um texto entre 25 e 250 caracteres, e
          clique em gerar.
        </p>
        <div className={styles.genderButtons}>
          <button
            type="button"
            className={
              gender === "male"
                ? `${styles.genderButton} ${styles.selected}`
                : styles.genderButton
            }
            onClick={() => setGender("male")}
            aria-pressed={gender === "male"}
          >
            <FaMale size={20} /> Masculino
          </button>
          <button
            type="button"
            className={
              gender === "female"
                ? `${styles.genderButton} ${styles.selected}`
                : styles.genderButton
            }
            onClick={() => setGender("female")}
            aria-pressed={gender === "female"}
          >
            <FaFemale size={20} /> Feminino
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            maxLength={maxChars}
            value={text}
            onChange={handleChange}
            placeholder="Digite seu texto aqui..."
          />
          <div
            style={{
              alignSelf: "flex-end",
              color: "#2563eb",
              fontSize: "0.95rem",
            }}
          >
            {text.length} / {maxChars}
          </div>
          <button className={styles.button} type="submit" disabled={isDisabled}>
            {isDisabled ? "Gerando..." : "Gerar"}
          </button>
        </form>
        {audioUrl && showModal && (
          <ModalMedia audioUrl={audioUrl} setShowModal={setShowModal} />
        )}
      </section>
    </Container>
  );
}
