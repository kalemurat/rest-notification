import moment from 'moment-timezone';

class MomentDate {
  getDate(): moment.Moment {
    return moment().tz('Europe/Istanbul').utc(true);
  }
}

export default new MomentDate();
