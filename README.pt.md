**Leia em**: [Inglês](README.md) | [Português](README.pt.md)

# OpticalProject
# 🚀 Como Executar o Projeto

## Pré-requisitos
- Node.js 18.x ou superior
- NPM 9.x
- Acesso à câmera do dispositivo

## Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/KalilMassignaniDaRosa/OpticalProject.git
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**  
   Crie um arquivo `.env` na raiz do projeto com:
   ```ini
   VITE_CAMERAKIT_API_TOKEN=seu_token_aqui
   VITE_CAMERAKIT_LENS_GROUP_ID=seu_group_id
   VITE_CAMERAKIT_LENS_ID=seu_lens_id
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

## 🔒 Importante
- Nunca faça commit do arquivo `.env`