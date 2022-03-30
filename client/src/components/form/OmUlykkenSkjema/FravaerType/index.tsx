import { Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring/models/Skadeforklaring';

const Fravaertype = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const [fravaer, setFravaer] = useState<string>('');
  const [fravertype, setFravaertype] = useState<string>('');

  return (
    <>
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
            legend="Velg type fravært"
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

          {fravertype && fravertype !== '' && (
            <TextField
              label="Skriv inn antall fraværsdager"
              data-test-id="fravaer-antall-dager"
              error={
                errors?.fravaer?.antallDager &&
                errors?.fravaer?.antallDager.message
              }
              {...register('fravaer.antallDager', {
                required: {
                  value: fravaer === 'ja',
                  message: 'Dette feltet er påkrevd',
                },
                min: {
                  value: 1,
                  message: 'Det må være minst 1 fraværsdag',
                },
              })}
            />
          )}
        </>
      )}
    </>
  );
};

export default Fravaertype;
