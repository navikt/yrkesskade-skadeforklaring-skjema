import {
  KodeverdiResponsDto,
  KodeverkApiService,
  OpenAPI as KodeverkOpenApi,
} from '../../client/src/api/kodeverk';
import config from '../config';
KodeverkOpenApi.BASE = config.KODEVERK_URL;

export class KodeverkLoader {
  private kodeverkholder: Kodeverk = {
    kodelister: {},
  };

  init = async () => {
    this.kodeverkholder = await this.hentKodeverk();
  };

  private hentKodeverk = async (): Promise<Kodeverk> => {
    const kodeverkholder: Kodeverk = {
      kodelister: {},
    };

    for (const kodeverk of [
      'fravaertype',
      'foerteDinSkadeEllerSykdomTilFravaer',
      'innmelderrolle',
    ]) {
      const resultat = await KodeverkApiService.hentKodeverdierForType(
        kodeverk
      );

      kodeverkholder.kodelister[kodeverk] = resultat;
    }

    return kodeverkholder;
  };

  mapKodeTilVerdi = (kode: string, kodelistenavn: string): string => {
    return (
      this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]
        ?.verdi || `Ukjent: ${kode}`
    );
  };

  mapKoderTilVerdier = (koder: string[], kodelistenavn: string): string[] => {
    return koder.map(
      (kode) =>
        this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]
          ?.verdi || `Ukjent: ${kode}`
    );
  };
}
export interface Kodeverk {
  kodelister: { [index: string]: KodeverdiResponsDto };
}
