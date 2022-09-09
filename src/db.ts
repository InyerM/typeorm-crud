import { DataSource } from 'typeorm' 
import { databaseConfig } from './config'
import { User } from './entities/User'

const { host, port, username, password, database } = databaseConfig

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  entities: [User],
  synchronize: true,
  logging: true
})