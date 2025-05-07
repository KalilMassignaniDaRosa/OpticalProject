**Read in**: [English](README.md) | [Portuguese](README.pt.md)

# OpticalProject
# 🚀 How to Run the Project

## Prerequisites
- Node.js 18.x or higher
- NPM 9.x
- Access to device's camera

## Step by Step

1. **Clone the repository**
   ```bash
   git clone https://github.com/KalilMassignaniDaRosa/OpticalProject.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**  
   Create a .env file at project root with:
   ```ini
   VITE_CAMERAKIT_API_TOKEN=your_token_here
   VITE_CAMERAKIT_LENS_GROUP_ID=your_group_id
   VITE_CAMERAKIT_LENS_ID=your_lens_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔒 Important
- Never commit the `.env` file
