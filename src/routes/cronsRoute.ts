import express, { Request, Response } from 'express';
import cronsController from '../controllers/cronsController';
// /crons
const router = express.Router();

router.get('/:id?', async (req: Request, res: Response) => {
  return await cronsController.getCrons(req, res);
});

router.put('/create', async (req: Request, res: Response) => {
  return await cronsController.createCron(req, res);
});

router.put('/update/:id', async (req: Request, res: Response) => {
  return await cronsController.updateCron(req, res);
});

export default router;
