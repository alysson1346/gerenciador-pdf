import express from 'express';
import pdfRoutes from "./routes"

const app = express();
app.use("/api", pdfRoutes);

app.use(express.json({ limit: '200mb' }))


// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
