import { prisma } from '../database/prisma';

export class ListDiscordService {
  async execute(adId: string) {
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId
      }
    });

    return {
      discord: ad.discord
    }
  }
}