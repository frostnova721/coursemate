import { User } from "./schemas";
import { IUser } from "./types";

export class UserDB {
  async createUser(userDetails: IUser): Promise<boolean> {
    const user = await this.getUser(userDetails.id);
    if (user) {
      return false;
    } else {
      await User.insertOne(userDetails);
    }
  }

  async getUser(userId: number): Promise<IUser | null> {
    const user = await User.findOne({ id: userId });
    return user;
  }

  async listUsers(): Promise<IUser[]> {
    const users = await User.find().populate("courses") ?? [];
    return users;
  }
}
