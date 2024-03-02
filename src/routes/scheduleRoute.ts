import express, { Request, Response } from 'express';
import scheduleController from '../controllers/scheduleController';
// /crons
const router = express.Router();

router.get('/:id?', async (req: Request, res: Response) => {
  return await scheduleController.getCrons(req, res);
});

router.put('/create', async (req: Request, res: Response) => {
  return await scheduleController.createCron(req, res);
});

router.put('/update/:id', async (req: Request, res: Response) => {
  return await scheduleController.updateCron(req, res);
});

export default router;
