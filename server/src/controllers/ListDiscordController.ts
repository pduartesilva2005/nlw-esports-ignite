import { Request, Response } from 'express';
import { ListDiscordService } from '../services/ListDiscordService';

export class ListDiscordController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listDiscordService = new ListDiscordService();

    const discordAd = await listDiscordService.execute(id);

    return response.json(discordAd);
  }
}