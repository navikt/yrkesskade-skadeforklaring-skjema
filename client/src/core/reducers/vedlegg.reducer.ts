import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findIndex } from 'lodash';
import { ApiError, VedleggApiService } from '../../api/skadeforklaring';
import { Attachment } from '../../types/attachment';
import { RootState } from '../store';

interface VedleggState {
  vedleggliste: Attachment[];
  status: string;
}

const initialState: VedleggState = {
  vedleggliste: [],
  status: '',
};

export const vedleggSlice = createSlice({
  name: 'vedlegg',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(lastoppVedlegg.pending, (state, action) => {
        const vedlegg = action.meta.arg;
        vedlegg.pending = true;
        state.vedleggliste.push(vedlegg);
        state.status = 'loading';
      })
      .addCase(lastoppVedlegg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const attachment = action.payload;

        const index = state.vedleggliste.findIndex(
          (vedlegg) => vedlegg.id === attachment.id
        );
        state.vedleggliste.splice(index, 1, attachment);
      })
      .addCase(lastoppVedlegg.rejected, (state, action) => {
        state.status = 'failed';
        const attachment = action.meta.arg;

        const vedlegg: Attachment = {
          pending: false,
          uploaded: false,
          id: attachment.id,
          filename: attachment.filename,
          filesize: attachment.filesize,
          file: attachment.file,
          url: attachment.url,
          error: action.payload,
        };
        const index = findIndex(state.vedleggliste, attachment);
        state.vedleggliste.splice(index, 1, vedlegg);
      })
      .addCase(slettVedlegg.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(slettVedlegg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const attachment = action.payload;
        const index = findIndex(state.vedleggliste, attachment);
        state.vedleggliste.splice(index, 1);
      })
      .addCase(slettVedlegg.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const lastoppVedlegg = createAsyncThunk<
  Attachment,
  Attachment,
  {
    rejectValue: ApiError;
  }
>('vedlegg/lastopp', async (vedlegg: Attachment, { rejectWithValue }) => {
  try {
    const url = await VedleggApiService.lastOppVedlegg({
      id: vedlegg.id,
      vedlegg: vedlegg.file,
    });

    const oppdatertVedlegg: Attachment = {
      pending: false,
      uploaded: true,
      id: vedlegg.id,
      filename: vedlegg.filename,
      filesize: vedlegg.filesize,
      file: vedlegg.file,
      url: url,
    };
    return oppdatertVedlegg;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const slettVedlegg = createAsyncThunk(
  'vedlegg/slett',
  async (vedlegg: Attachment) => {
    await VedleggApiService.slettVedlegg(vedlegg.id);
    return vedlegg;
  }
);

export const selectVedleggliste = (state: RootState) =>
  state.vedlegg.vedleggliste;

export default vedleggSlice.reducer;
