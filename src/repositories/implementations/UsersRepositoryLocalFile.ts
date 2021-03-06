import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'
import fs, { promises as fsPromise } from 'fs'

import dotenv from 'dotenv'
dotenv.config()

/**
 * Create, save and update data from file
 */
class UsersRepositoryLocalFile implements IUsersRepository {
    private users: User[] = []

    constructor () {
      this.createOrLoadFile()
    }

    public async updateFunds (user: User, newFunds: number): Promise<void> {
      user.funds = newFunds
      await this.saveFile()
    }

    public findById (id: string): User | undefined {
      const findUser = this.users.find(x => x.id === id)
      return findUser
    }

    public login (email: string, password: string): User | undefined {
      const findUser = this.users.find(x => x.email === email && x.password === password)
      return findUser
    }

    public findByEmail (email: string): User | undefined {
      const findUser = this.users.find(x => x.email === email)
      return findUser
    }

    public async save (user: User): Promise<void> {
      this.users.push(user)
      await this.saveFile()
    }

    /**
     * Create if file not exists or load if exists
     */
    private async createOrLoadFile () {
      console.log(process.env.USER_FILE)
      if (!process.env.USER_FILE) {
        throw new Error('Invalid user file path')
      }

      const checkIfExistsFile = fs.existsSync(process.env.USER_FILE)
      if (checkIfExistsFile) {
        const loadFileData = await fsPromise.readFile(process.env.USER_FILE)
        const usersLoaded: any[] = JSON.parse(loadFileData.toString())
        this.users = usersLoaded.map(x => (new User({ email: x.email, password: x.password, funds: x.funds }, x.id)))
      } else {
        await fsPromise.writeFile(process.env.USER_FILE, '[]')
      }
    }

    /**
     * Save file with users
     */
    private async saveFile () {
      if (!process.env.USER_FILE) {
        throw new Error('Invalid user file path')
      }

      await fsPromise.writeFile(process.env.USER_FILE, JSON.stringify(this.users))
    }
}

const usersRepositoryLocalFile = new UsersRepositoryLocalFile()

export { usersRepositoryLocalFile }
