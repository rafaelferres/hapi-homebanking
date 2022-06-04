import { User } from '@entities/User'

export interface IUsersRepository {
    login(email: string, password: string): User | undefined;
    findByEmail(email: string): User | undefined;
    findById(id : string) : User | undefined;
    save(user: User) : Promise<void>;
    updateFunds(user: User, newFunds: number): Promise<void>;
}
