import { Ingress, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../api/skadeforklaring/models/Skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import Opplast from './Opplast';
import Papir from './Papir';

const VedleggSkjema = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [vedleggtype, setVedleggtype] = useState<string>(
    skadeforklaring.vedleggtype || ''
  );

  const visVedleggType = () => {
    switch (vedleggtype) {
      case 'digital':
        return <Opplast />;
      case 'papir':
        return <Papir />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <Ingress spacing>
        Har du noen vedlegg som du ønsker å legge ved her. Du kan også
        ettersende dem per post.
      </Ingress>
      <RadioGroup
        legend="Jeg skal ettersende dokumenter"
        value={vedleggtype}
        error={errors?.vedleggtype && errors?.vedleggtype.message}
        {...register('vedleggtype', {
          required: 'Dette feltet er påkrevd',
        })}
        onChange={(e) => setVedleggtype(e)}
      >
        <Radio
          value="digital"
          data-test-id="vedlegg-type-digital"
          {...register('vedleggtype', {
            required: 'Dette feltet er påkrevd',
          })}
        >
          Ja, jeg legger det ved denne skadeforklaringen
        </Radio>
        <Radio
          value="papir"
          data-test-id="vedlegg-type-papir"
          {...register('vedleggtype', {
            required: 'Dette feltet er påkrevd',
          })}
        >
          Ja, jeg sender per post
        </Radio>
        <Radio
          value="ingen"
          data-test-id="vedlegg-type-ingen"
          {...register('vedleggtype', {
            required: 'Dette feltet er påkrevd',
          })}
        >
          Nei, jeg har ingen vedlegg
        </Radio>
      </RadioGroup>

      {visVedleggType()}
    </>
  );
};

export default VedleggSkjema;
