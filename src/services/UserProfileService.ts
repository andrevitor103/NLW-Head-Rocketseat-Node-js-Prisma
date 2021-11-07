import prismaClient from "../prisma";
class UserProfileService {
  async execute(userId: string) {
    const profile = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });
    return profile;
  }
}
export { UserProfileService };
