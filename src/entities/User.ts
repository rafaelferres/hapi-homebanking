import * as uuid from 'uuid'

export class User {
    public readonly id: string;
    public email: string;
    public password: string;

    /**
     * Construct user
     * @param props { email, password }
     * @param id user id is if an existing one
     */
    constructor (props: Omit<User, 'id'>, id?: string) {
      Object.assign(this, props)

      if (!id) {
        this.id = uuid.v4()
      } else {
        this.id = id
      }
    }
}
