import { UserRepository } from "../repositories/user.repo";
import { User, UserUpdate } from "../repositories/user.repo";
import { Result, ok, err } from "../utils";

export const createUserService = (repo: UserRepository) => {
  const service = {
    onboardUserProfile: async (userData: User): Promise<Result<User, string>> => {
      const usernameTakenResult = await repo.getByUsername(userData.username);
      if (usernameTakenResult.ok && usernameTakenResult.data) {
        return err('Username is already taken');
      }

      const userExistsResult = await service.userExists(userData.auth_id);
      if (!userExistsResult.ok) {
        return err(userExistsResult.error);
      }

      const creationResult = await repo.create(userData);
      if (!creationResult.ok) {
        return err(`Failed to create user profile: ${creationResult.error}`);
      }
      return ok(creationResult.data);
    },

    getUserProfile: async (authID: string): Promise<Result<User, string>> => {
      const userResult = await repo.getById(authID);
      if (!userResult.ok || !userResult.data) {
        return err('User profile not found');
      }
      return ok(userResult.data);
    },

    userExists: async (authID: string): Promise<Result<boolean, string>> => {
      const userResult = await repo.getById(authID);
      if (!userResult.ok) {
        return err(`Error checking user existence: ${userResult.error}`);
      }
      return ok(!!userResult.data);
    },

    updateUserProfile: async (updates: UserUpdate): Promise<Result<User, string>> => {
      if (!updates.id) return err("User ID is required for update");

      const existingUserResult = await service.userExists(updates.auth_id);
      if (!existingUserResult.ok) return err(existingUserResult.error);

      const updateResult = await repo.update(updates.auth_id, updates);
      if (!updateResult.ok) return err(`Failed to update user profile: ${updateResult.error}`);

      return ok(updateResult.data);
    },

    deleteUserProfile: async (userID: string): Promise<Result<null, string>> => {
      const existingUserResult = await service.userExists(userID);
      if (!existingUserResult.ok) return err(existingUserResult.error);

      const deletionResult = await repo.delete(userID);
      if (!deletionResult.ok) return err(`Failed to delete user profile: ${deletionResult.error}`);

      return ok(null);
    }
  };

  return service;
};
