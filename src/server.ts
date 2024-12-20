import { app } from "./app";
import { AppDataSource } from "./data-source";

(async () => {
    console.log('Se conectando na base')
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  const PORT = process.env.PORT || 3333;
  app.listen(3333, () => console.log(`App is running on port ${PORT}`));
})();
