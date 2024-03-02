import mongoose, { Document } from 'mongoose';
import MomentDate from '../libs/momentDate';

const scheduleSchema = new mongoose.Schema({
  description: { type: String, required: true },
  cronExpression: { type: String, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
  special_column: { type: String, required: true }
});

scheduleSchema.pre('save', function (next) {
  const currentDate = MomentDate.getDate() as any;
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

scheduleSchema.pre('updateOne', function (next) {
  const data: any = this.getUpdate();
  data.updated_at = MomentDate.getDate() as any;
  next();
});

export interface ISchedule extends Document {
  description: string;
  cronExpression: string;
  created_at: Date;
  updated_at: Date;
  special_column: string;
}

const scheduleModel = mongoose.model<ISchedule>('Schedule', scheduleSchema);

export default scheduleModel;
