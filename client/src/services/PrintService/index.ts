import axios, { AxiosResponse } from 'axios';
import { Skadeforklaring } from '../../api/skadeforklaring';

const apiUrl = '/print';

export class PrintService {
  public static print = (
    skadeforklaring: Skadeforklaring
  ): Promise<AxiosResponse<any, any>> => {
    return axios.post(apiUrl, JSON.stringify(skadeforklaring), {
      params: {
        cacheBustTimestamp: Date.now(), // prevents IE cache problems on re-download
      },
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    });
  };
}
