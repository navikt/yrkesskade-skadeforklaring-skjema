import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { Tid, Helseinstitusjon } from '../../api/skadeforklaring';
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
    arbeidetMedIUlykkesoeyeblikket: '',
    noeyaktigBeskrivelseAvHendelsen: '',
    tid: {
      tidstype: Tid.tidstype.TIDSPUNKT,
    },

    skalEttersendeDokumentasjon: '',
    vedleggreferanser: [],
    fravaer: {
      foerteDinSkadeEllerSykdomTilFravaer: '',
      fravaertype: '',
    },

    erHelsepersonellOppsokt: '',
    helseinstitusjoner: [],
    foersteHelsepersonellOppsoktDato: undefined,
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
    fjernInstitusjon: (
      (state, action: PayloadAction<Helseinstitusjon>) => {
        state.skadeforklaring.helseinstitusjoner = state.skadeforklaring.helseinstitusjoner.filter(i => i.navn !== action.payload.navn);
      }
    ),
    oppdaterInstitusjon: (
      (state, action: PayloadAction<Helseinstitusjon[]>) => {
        state.skadeforklaring.helseinstitusjoner = action.payload;
      }
    ),
    nullstillSkjema: () => {
      return { ...initialState };
    },
  }
});

export const selectSkadeforklaring = (state: RootState) =>
  state.skadeforklaring.skadeforklaring;

export const { oppdaterSkadeforklaring, nullstillSkjema, fjernInstitusjon, oppdaterInstitusjon } =
  skadeforklaringSlice.actions;
export default skadeforklaringSlice.reducer;
