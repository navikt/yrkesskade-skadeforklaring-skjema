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
    innmelder: undefined,
    skadelidt: undefined,
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
    vedleggtype: '',
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
      state.skadeforklaring = merge(state.skadeforklaring, action.payload);
    },
  },
});

export const selectSkadeforklaring = (state: RootState) =>
  state.skadeforklaring.skadeforklaring;

export const { oppdaterSkadeforklaring } = skadeforklaringSlice.actions;
export default skadeforklaringSlice.reducer;
