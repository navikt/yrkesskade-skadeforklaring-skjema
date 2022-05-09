import {
  BodyShort,
  Heading,
  Ingress,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../api/skadeforklaring/models/Skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import Opplast from './Opplast';

const VedleggSkjema = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [skalEttersendeDokumentasjon, setSkalEttersendeDokumentasjon] =
    useState<string>(skadeforklaring.skalEttersendeDokumentasjon);

  return (
    <>
      <Ingress spacing>
        Ønsker du, eller har du blitt bedt om å legge ved dokumentasjon, kan du
        gjøre det her. Du kan også ettersende det per post.
      </Ingress>

      <Opplast />
      <div className="spacer"></div>
      <Heading size="small" spacing>
        Ettersendelse
      </Heading>
      <BodyShort spacing>
        Dersom NAV har bedt om konkret informasjon har du mulighet til å
        ettersende dette innen fristen NAV har gitt. Trenger du lengre frist ta
        kontakt med NAV kontaktsenter på 55 55 33 33.
      </BodyShort>
      <BodyShort spacing>
        Hvis du ikke innsender etterspurt dokumentasjon innen frist vil saken
        bli behandlet basert på de opplysningene NAV har mottatt.
      </BodyShort>

      <RadioGroup
        className="spacer"
        hideLegend
        legend="Jeg skal ettersende dokumenter"
        value={skalEttersendeDokumentasjon.toString()}
        error={
          errors?.skalEttersendeDokumentasjon &&
          errors?.skalEttersendeDokumentasjon.message
        }
        {...register('skalEttersendeDokumentasjon', {
          required: 'Dette feltet er påkrevd',
        })}
        onChange={(e) => setSkalEttersendeDokumentasjon(e)}
      >
        <Radio
          value="ja"
          data-test-id="skal-ettersende-dokumentasjon-ja"
          {...register('skalEttersendeDokumentasjon', {
            required: 'Dette feltet er påkrevd',
          })}
        >
          Jeg skal ettersende dokumenter
        </Radio>
        <Radio
          value="nei"
          data-test-id="skal-ettersende-dokumentasjon-nei"
          {...register('skalEttersendeDokumentasjon', {
            required: 'Dette feltet er påkrevd',
          })}
        >
          Jeg har ikke noen mer å tilføye
        </Radio>
      </RadioGroup>
    </>
  );
};

export default VedleggSkjema;
