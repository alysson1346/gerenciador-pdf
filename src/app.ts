import express from 'express';
import pdfRoutes from "./routes"

const app = express();
app.use("/api", pdfRoutes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
