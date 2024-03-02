import { Request, Response } from 'express';
import scheduleModel, { ISchedule } from '../models/scheduleModel';

class ScheduleController {
  async getCrons(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let response;
      if (id) {
        response = await scheduleModel.findById(id);
        if (!response) {
          return res.status(404).json({ error: 'cron not found' });
        }
      } else {
        response = await scheduleModel.find();
      }
      return res.send(response);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  async createCron(req: Request, res: Response) {
    const { cronExpression, description, special_column } =
      req.body as ISchedule;
    const newCron = new scheduleModel({
      cronExpression,
      description,
      special_column
    });
    return res.status(201).json(await newCron.save());
  }

  async updateCron(req: Request, res: Response) {
    const { id } = req.params;
    const { cronExpression, description, special_column } =
      req.body as unknown as ISchedule;
    const findCron = (await scheduleModel.findById(id)) as unknown as ISchedule;
    if (!findCron) {
      return res.status(404).json({ error: 'cron not found' });
    }

    const update = await scheduleModel.updateOne(
      { _id: id },
      {
        ...{ cronExpression, description, special_column }
      }
    );
    if (update['modifiedCount'] === 1) {
      return res.status(200).json(await scheduleModel.findById(id));
    } else {
      return res.status(500).json({ error: 'server error' });
    }
  }
}

export default new ScheduleController();
