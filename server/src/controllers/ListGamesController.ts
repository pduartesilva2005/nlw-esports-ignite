import { Request, Response } from 'express';
import { ListGamesService } from '../services/ListGamesService';

export class ListGamesController {
  async handle(request: Request, response: Response) {
    const listGames = new ListGamesService();

    const games = await listGames.execute();

    return response.json(games);
  }
}
