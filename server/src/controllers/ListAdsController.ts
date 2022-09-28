import { Request, Response } from 'express';
import { ListAdsService } from '../services/ListAdsService';

export class ListAdsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listAdsService = new ListAdsService();

    const ads = await listAdsService.execute(id);

    return response.json(ads);
  }
}