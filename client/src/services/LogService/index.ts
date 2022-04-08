import axios from 'axios';
import { LogMessage } from '../../types/log-message';

const apiUrl = '/log';

export class LogService {
  public static log = (message: LogMessage) => {
    console.log('sesjon: ', this.sesjon);
    axios.post(apiUrl, JSON.stringify(message), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  static sesjon: string;
}
