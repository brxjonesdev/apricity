import { UserRepository } from "./user.repo";
import { createSupabaseUserRepo } from "./user.repo";
import { User, UserUpdate } from "./user.repo";
import { Result, ok, err } from "../utils";

const createUserService = (repo: UserRepository) => {
  return {
    // create user profile
    async onboardUserProfile(userData: User): Promise<Result<User, string>> {
      const usernameTakenResult = await repo.getByUsername(userData.username);
      if (usernameTakenResult.ok && usernameTakenResult.data) {
        return err('Username is already taken');
      }

      const userExistsResult = await this.userExists(userData.auth_id);
      if (!userExistsResult.ok) {
        return err(userExistsResult.error);
      }

      const creationResult = await repo.create(userData);
      if (!creationResult.ok) {
        return err(`Failed to create user profile: ${creationResult.error}`);
      }
      return ok(creationResult.data);
    },
    // get user profile
    async getUserProfile(authID: number): Promise<Result<User, string>> {
      const userResult = await repo.getById(authID);
      if (!userResult.ok || !userResult.data) {
        return err('User profile not found');
      }
      return ok(userResult.data);
    },
    // check if user exists
    async userExists(authID: number): Promise<Result<boolean, string>> {
      const userResult = await repo.getById(authID);
      if (!userResult.ok) {
        return err(`Error checking user existence: ${userResult.error}`);
      }
      return ok(!!userResult.data);
    },
    // update user profile\
    async updateUserProfile(updates: UserUpdate): Promise<Result<User, string>> {
      if (!updates.id) {
        return err("User ID is required for update");
      }

      const existingUserResult = await this.userExists(updates.id);
      if (!existingUserResult.ok) {
        return err(existingUserResult.error);
      }

      const updateResult = await repo.update(updates.id, updates);
      if (!updateResult.ok) {
        return err(`Failed to update user profile: ${updateResult.error}`);
      }
      return ok(updateResult.data);
    },
    // delete user profile
    async deleteUserProfile(userID: number): Promise<Result<null, string>> {
      const existingUserResult = await this.userExists(userID);
      if (!existingUserResult.ok) {
        return err(existingUserResult.error);
      }

      const deletionResult = await repo.delete(userID);
      if (!deletionResult.ok) {
        return err(`Failed to delete user profile: ${deletionResult.error}`);
      }
      return ok(null);

  }

  }
};
const userRepo = createSupabaseUserRepo();
export const userService = createUserService(userRepo);
