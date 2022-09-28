import { Request, Response } from 'express';

import { CreateAdService } from '../services/CreateAdService';

export class CreateAdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
      
    const {
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel
    } = request.body;

    const createAdService = new CreateAdService();

    const ad = await createAdService.execute({
      gameId: id,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel
    });

    return response.status(201).json(ad);
  }
}