import { User } from "./schemas";
import { IUser } from "./types";

export class UserDB {
    async createUser(userDetails: IUser): Promise<boolean> {
        const user = await this.getUser(userDetails.id);
        if (user) {
            return false;
        } else {
            await User.insertOne(userDetails);
            return true;
        }
    }

    async getUser(userId: number): Promise<IUser | null> {
        const user = await User.findOne({ id: userId });
        return user;
    }

    async listUsers(): Promise<IUser[]> {
        const users = (await User.find().populate("courses")) ?? [];
        return users;
    }

    async deleteUser(userId: number): Promise<{ msg: string }> {
        try {
            const result = await User.deleteOne({ id: userId });
            if (result.deletedCount === 0) {
                console.log(`User with ID ${userId} not found.`);
                return { msg: `User with ID ${userId} not found.` };
            }
            console.log(`Deleted user with ID ${userId}.`);
            return { msg: `Deleted user with ID ${userId}.` };
        } catch (err) {
            console.error("Error deleting user:", err);
            return { msg: "Error deleting user." };
        }
    }

    async updateRole(userId: number, isAdmin: boolean): Promise<boolean> {
        try {
            const res = await User.updateOne(
                { id: userId },
                { $set: { isAdmin: isAdmin } }
            );
            if (res.modifiedCount === 0) {
                console.log("User with given id not found.");
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }
}
