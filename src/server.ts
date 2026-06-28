import app from "./app.js";
import AppDataSource from "./config/db/DataSource.js";

try {
  await AppDataSource.initialize().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server online! listening on ${process.env.PORT}!`);
      console.log(`Check out our doc! http://localhost:${process.env.PORT}/api-docs`)
    });
  });
} catch (error) {
  console.error("An error occurred during initialization, see the log.", error);
}
