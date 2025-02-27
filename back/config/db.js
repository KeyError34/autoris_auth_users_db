import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
// import configData from "./config.json" assert { type: "json" };
const configPath = path.resolve('./config/config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const env = process.env.NODE_ENV || 'development';

const config = configData[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

export default sequelize;
