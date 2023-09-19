import { DataSource } from "typeorm";
import { getConfig } from "../config/database";

const datasource = new DataSource(getConfig())
datasource.initialize()

export default datasource