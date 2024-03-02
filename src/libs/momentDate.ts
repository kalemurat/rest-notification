import moment from 'moment-timezone';
import TimeZone from './enums/timezone.enum';

class MomentDate {
  getDate(): moment.Moment {
    return moment().tz(TimeZone.EUROPE_ISTANBUL).utc(true);
  }
}

export default new MomentDate();
