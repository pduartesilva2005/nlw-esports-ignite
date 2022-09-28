import { Router } from 'express';

import { ListGamesController } from './controllers/ListGamesController';
import { CreateAdController } from './controllers/CreateAdController';
import { ListAdsController } from './controllers/ListAdsController';
import { ListDiscordController } from './controllers/ListDiscordController';

export const routes = Router();

const listGamesController = new ListGamesController();
const createAdController = new CreateAdController();
const listAdsController = new ListAdsController();
const listDiscordController = new ListDiscordController();

routes.get('/games', listGamesController.handle);
routes.post('/games/:id/ads', createAdController.handle);
routes.get('/games/:id/ads', listAdsController.handle);
routes.get('/ads/:id/discord', listDiscordController.handle);
