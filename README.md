# 🎬 Stream Media Converter

👉 **[Acesse o projeto aqui](#)**

Aplicação de demonstração das capacidades avançadas de streaming do **Node.js**, processando e convertendo mídia (áudio/vídeo) em tempo real. O servidor processa arquivos **sob demanda** e envia os resultados diretamente ao cliente via **streams** e **pipeline**, sem armazenamento permanente.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **React** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) |
| **Node.js** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| **TypeScript** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |

---

## 🎯 Objetivo do Projeto

Demonstrar o uso eficiente de **Node.js Streams** e **Pipeline** para processamento de mídia em tempo real:

1. Cliente envia **áudio ou vídeo** para o servidor  
2. Servidor processa utilizando **streams nativos do Node.js**  
3. Resultado enviado **diretamente ao frontend** durante o processamento  
4. **Sem armazenamento permanente** — arquivos temporários são descartados após uso  

---

## ✨ Funcionalidades em Destaque

### 🔄 Processamento em Tempo Real

- **Streams Nativos:** Manipulação eficiente de grandes arquivos via Node.js streams  
- **Pipeline API:** Encadeamento seguro de operações de transformação  
- **Zero Armazenamento:** Arquivos processados e enviados sob demanda, sem salvamento permanente  

### 🎵 Conversões de Mídia

- **Vídeo → Áudio:** Extração de faixa de áudio de vídeos enviados  
- **Text-to-Speech:** Geração de áudio a partir de texto em tempo real  

### 🔐 Segurança e Performance

- **Rate Limiting:** Middleware configurado para limitar requisições e prevenir abuso  
- **Upload Temporário:** Multer gerencia arquivos temporários com cleanup automático  

---

## 🏗️ Arquitetura do Projeto

- **Frontend:** React + Vite + TypeScript consumindo streams do backend  
- **Backend:** Node.js + Express processando mídia via pipeline de streams  
- **Upload:** Multer para gerenciamento de arquivos temporários  
- **Streaming:** Envio progressivo de dados ao cliente sem buffering completo  

---
