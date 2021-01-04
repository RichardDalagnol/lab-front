import { parseISO } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

export const formatarData = (data: string) => {
  return format(zonedTimeToUtc(parseISO(data), 'America/Sao_Paulo'), 'dd/MM/yyyy HH:mm', {
    timeZone: 'America/Sao_Paulo',
  });
}
