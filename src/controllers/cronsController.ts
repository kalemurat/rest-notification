import { Request, Response } from 'express';
import cronsModel, { ICron } from '../models/cronsModel';

class CronsController {
  async getCrons(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let response;
      if (id) {
        response = await cronsModel.findById(id);
        if (!response) {
          return res.status(404).json({ error: 'cron not found' });
        }
      } else {
        response = await cronsModel.find();
      }
      return res.send(response);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  async createCron(req: Request, res: Response) {
    const { cronExpression, description, special_column } = req.body as ICron;
    const newCron = new cronsModel({
      cronExpression,
      description,
      special_column
    });
    return res.status(201).json(await newCron.save());
  }

  async updateCron(req: Request, res: Response) {
    const { id } = req.params;
    const { cronExpression, description, special_column } =
      req.body as unknown as ICron;
    const findCron = (await cronsModel.findById(id)) as unknown as ICron;
    if (!findCron) {
      return res.status(404).json({ error: 'cron not found' });
    }

    const update = await cronsModel.updateOne(
      { _id: id },
      {
        ...{ cronExpression, description, special_column }
      }
    );
    if (update['modifiedCount'] === 1) {
      return res.status(200).json(await cronsModel.findById(id));
    } else {
      return res.status(500).json({ error: 'server error' });
    }
  }
}

export default new CronsController();
