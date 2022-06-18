import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { Tid } from '../../api/skadeforklaring';
import { Skadeforklaring } from '../../api/skadeforklaring/models/Skadeforklaring';
import { RootState } from '../store';

interface SkadeforklaringState {
  skadeforklaring: Skadeforklaring;
}

const initialState: SkadeforklaringState = {
  skadeforklaring: {
    innmelder: {
      norskIdentitetsnummer: '',
    },
    skadelidt: {
      norskIdentitetsnummer: '',
    },
    tid: {
      tidstype: Tid.tidstype.TIDSPUNKT,
    },
    helseinstitusjon: {
      erHelsepersonellOppsokt: 'undefined',
      navn: '',
    },
    fravaer: {
      foerteDinSkadeEllerSykdomTilFravaer: '',
      fravaertype: '',
    },
    arbeidetMedIUlykkesoeyeblikket: '',
    noeyaktigBeskrivelseAvHendelsen: '',
    skalEttersendeDokumentasjon: '',
    vedleggreferanser: [],
  },
};

export const skadeforklaringSlice = createSlice({
  name: 'skadeforklaring',
  initialState,
  reducers: {
    oppdaterSkadeforklaring: (
      state,
      action: PayloadAction<Skadeforklaring>
    ) => {
      if (
        action.payload.vedleggreferanser &&
        action.payload.vedleggreferanser.length >= 0
      ) {
        // sørg for at vi overskriver vedleggreferanser med liste fra payload
        state.skadeforklaring.vedleggreferanser =
          action.payload.vedleggreferanser;
      }

      state.skadeforklaring = merge(state.skadeforklaring, action.payload);
    },
    nullstillSkjema: () => {
      console.log('initialState', initialState);

      return { ...initialState };
    },
  },
});

export const selectSkadeforklaring = (state: RootState) =>
  state.skadeforklaring.skadeforklaring;

export const { oppdaterSkadeforklaring, nullstillSkjema } =
  skadeforklaringSlice.actions;
export default skadeforklaringSlice.reducer;
