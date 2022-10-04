import { prisma } from '../database/prisma';
import { convertHourStringToMinutes } from '../utils/convertHourStringToMinutes';

interface Request {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

export class CreateAdService {
  async execute({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  }: Request) {
    const ad = await prisma.ad.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays: weekDays.join(', '),
        hourStart: convertHourStringToMinutes(hourStart),
        hourEnd: convertHourStringToMinutes(hourEnd),
        useVoiceChannel
      }
    });

    return ad;
  }
}
