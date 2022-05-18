import { BodyLong } from '@navikt/ds-react';
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
    const mappetListe = vedleggliste
      .filter((vedlegg) => vedlegg.uploaded)
      .map((vedlegg) => {
        return {
          id: vedlegg.id,
          navn: vedlegg.filename,
          url: vedlegg.url,
          storrelse: vedlegg.filesize,
        } as Vedleggreferanse;
      });

    setValue('vedleggreferanser', mappetListe);
  }, [vedleggliste, setValue]);

  return (
    <>
      <BodyLong spacing>
        Send inn det du mener er relevant for å vurdere arbeidsulykken og skaden
        din. Dersom du likevel sender oss opplysninger som ikke er relevant for
        saken, vil dette blir arkivert i saken på personen du har valgt.
        Kvitteringer, resepter og kopi av sykemeldingsblanketter vil ikke kunne
        si noe om omfanget av arbeidsulykken, det er ikke nødvendig å sende
        disse opplysningene her.
      </BodyLong>
      <BodyLong spacing>
        NAV vil som hovedregel ikke sladde eller sortere opplysninger som er
        sendt inn digitalt. Det er ditt ansvar å laste opp riktige opplysninger
        som handler om arbeidsulykken.
      </BodyLong>
      <AttachmentUploader
        onFileDelete={onFileDelete}
        onFilesSelect={onfFilesSelect}
        attachments={vedleggliste}
        data-test-id="vedlegg-opplaster"
      />
    </>
  );
};

export default Opplast;
