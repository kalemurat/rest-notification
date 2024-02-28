import mongoose, { Document } from 'mongoose';
import moment from 'moment-timezone';

const cronSchema = new mongoose.Schema({
  description: { type: String, required: true },
  cronExpression: { type: String, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
  special_column: { type: String, required: true }
});

cronSchema.pre('save', function (next) {
  const currentDate = moment().tz('Europe/Istanbul').toDate();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});
//TODO, moment date wrong
cronSchema.pre('updateOne', function (next) {
  const data: any = this.getUpdate();
  data.updated_at = moment().tz('Europe/Istanbul').toDate();
  next();
});

export interface ICron extends Document {
  description: string;
  cronExpression: string;
  created_at: Date;
  updated_at: Date;
  special_column: string;
}

const cronsModel = mongoose.model<ICron>('Crons', cronSchema);

export default cronsModel;
