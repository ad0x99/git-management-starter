const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { models } = require("./db");
const { logger } = require("./helpers/logger");

const main = async () => {
  const app = express();

  // Dotenv config
  dotenv.config();

  // App Config
  app.use(cors());
  app.use(express.json());

  // APIs Routes
  // app.use('/api/v1');

  // Server & Database
  app.listen(process.env.NODE_PORT, async () => {
    const uploadPath = "./uploads/";

    const isPathExists = fs.existsSync(path.resolve(uploadPath));
    if (!isPathExists) {
      console.log("Create uploads folder");
      fs.mkdirSync(uploadPath);
    }

    await models
      .$connect()
      .then(() => console.log("DB Connected"))
      .catch((e) => {
        logger.error(e);
        throw new Error(e.message);
      });

    console.log(
      `Server is running on http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/`,
    );
  });
};

main();
