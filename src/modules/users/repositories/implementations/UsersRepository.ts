import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser: User = new User();

    Object.assign(newUser, { name, email });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userUpdated: User = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    const userNewList: User[] = [];

    this.users.map((user) => {
      if (user.id === userUpdated.id) {
        userNewList.push(userUpdated);
      } else {
        userNewList.push(user);
      }
    });

    this.users = userNewList;

    return userUpdated;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
