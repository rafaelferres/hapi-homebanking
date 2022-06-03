import { User } from '@entities/User'

export interface IUsersRepository {
    login(email: string, password: string): Promise<User>;
    findByEmail(email: string): User | undefined;
    save(user: User) : Promise<void>;
}
