import * as moment from 'moment-timezone';

export const convertCrmDate = (date: string) => {
  const faDate = moment.tz(date, 'Asia/Tehran');
  return new Date(moment.utc(faDate).format());
};
