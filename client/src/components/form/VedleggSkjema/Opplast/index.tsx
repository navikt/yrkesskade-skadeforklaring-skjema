import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring/models/Skadeforklaring';
import { Vedleggreferanse } from '../../../../api/skadeforklaring/models/Vedleggreferanse';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../core/hooks/state.hooks';
import {
  lastoppVedlegg,
  selectVedleggliste,
  slettVedlegg,
} from '../../../../core/reducers/vedlegg.reducer';
import { Attachment } from '../../../../types/attachment';
import AttachmentUploader from '../../../Attachment/AttachmentUploader';

const Opplast = () => {
  const dispatch = useAppDispatch();
  const vedleggliste = useAppSelector((state) => selectVedleggliste(state));
  const { setValue } = useFormContext<Skadeforklaring>();

  const onFileDelete = (attachments: Attachment[]) => {
    if (attachments.length <= 0) {
      return;
    }
    dispatch(slettVedlegg(attachments[0]));
  };

  const onfFilesSelect = (attachments: Attachment[]) => {
    attachments.forEach((vedlegg) => {
      dispatch(lastoppVedlegg(vedlegg));
    });
  };

  useEffect(() => {
    setValue(
      'vedleggreferanser',
      vedleggliste.map((vedlegg) => {
        return {
          id: vedlegg.id,
          navn: vedlegg.filename,
          url: vedlegg.url,
          storrelse: vedlegg.filesize,
        } as Vedleggreferanse;
      })
    );
  }, [vedleggliste, setValue]);

  return (
    <AttachmentUploader
      onFileDelete={onFileDelete}
      onFilesSelect={onfFilesSelect}
      attachments={vedleggliste}
      data-test-id="vedlegg-opplaster"
    />
  );
};

export default Opplast;
