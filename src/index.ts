import "reflect-metadata"
import app from './app'
import { AppDataSource } from './db'

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('Database is connected')
  }
  catch (error) {
    console.log(error)
  }
  app.listen(3000, () => {
    console.log(`Server is running in http://localhost:3000`)
  })
}

main()