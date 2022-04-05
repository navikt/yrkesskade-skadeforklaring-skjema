import { Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring/models/Skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';

const Fravaertype: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [fravaer, setFravaer] = useState<string>(
    skadeforklaring.fravaer?.harFravaer !== undefined
      ? skadeforklaring.fravaer.harFravaer
        ? 'ja'
        : 'nei'
      : ''
  );
  const [fravertype, setFravaertype] = useState<string>(
    skadeforklaring.fravaer?.fravaertype || ''
  );

  return (
    <div className={`skade-fravaer ${props.className}`}>
      <Controller
        name="fravaer.harFravaer"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <RadioGroup
            legend="Førte din skade/sykdom til fravær?"
            value={fravaer}
            error={
              errors?.fravaer?.harFravaer && errors?.fravaer?.harFravaer.message
            }
            onChange={(e) => {
              setFravaer(e);
              onChange(e === 'ja');
            }}
            onBlur={onBlur}
            data-test-id="fravaer-valg"
          >
            <Radio value="ja" data-test-id="fravaer-valg-ja">
              Ja
            </Radio>
            <Radio value="nei" data-test-id="fravaer-valg-nei">
              Nei
            </Radio>
          </RadioGroup>
        )}
      />

      {fravaer === 'ja' && (
        <>
          <RadioGroup
            legend="Velg type fravær"
            value={fravertype}
            error={
              errors?.fravaer?.fravaertype &&
              errors.fravaer?.fravaertype.message
            }
            {...register('fravaer.fravaertype', {
              required: {
                value: fravaer === 'ja',
                message: 'Dette feltet er påkrevd',
              },
            })}
            onChange={(e) => setFravaertype(e)}
            data-test-id="fravaer-type"
          >
            <Radio
              value="sykemelding"
              data-test-id="fravaer-type-sykemelding"
              {...register('fravaer.fravaertype', {
                required: {
                  value: fravaer === 'ja',
                  message: 'Dette feltet er påkrevd',
                },
              })}
            >
              Sykemelding
            </Radio>
            <Radio
              value="egenmelding"
              data-test-id="fravaer-type-egenmelding"
              {...register('fravaer.fravaertype', {
                required: {
                  value: fravaer === 'ja',
                  message: 'Dette feltet er påkrevd',
                },
              })}
            >
              Egenmelding
            </Radio>
          </RadioGroup>
        </>
      )}
    </div>
  );
};

export default Fravaertype;
