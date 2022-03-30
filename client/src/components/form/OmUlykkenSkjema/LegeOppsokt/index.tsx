import { RadioGroup, Radio, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';

const LegeOppsokt = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const [legeOppsokt, setLegeOppsokt] = useState('');
  const [navn, setNavn] = useState('');

  return (
    <>
      <Controller
        name="behandler.erBehandlerOppsokt"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <RadioGroup
            legend="Ble lege oppsøkt etter skaden?"
            value={legeOppsokt}
            error={
              errors?.behandler?.erBehandlerOppsokt &&
              errors?.behandler.erBehandlerOppsokt.message
            }
            onChange={(e) => {
              setLegeOppsokt(e);
              onChange(e === 'ja');
            }}
          >
            <Radio value="ja" data-test-id="lege-oppsokt-ja">
              Ja
            </Radio>
            <Radio value="nei" data-test-id="lege-oppsokt-nei">
              Nei
            </Radio>
          </RadioGroup>
        )}
      />

      {legeOppsokt === 'ja' && (
        <TextField
          label="Navn på helseforetak, legevakt eller lege (valgfritt)"
          value={navn}
          data-test-id="lege-behandler-navn"
          {...register('behandler.behandlerNavn')}
          onChange={(e) => setNavn(e.target.value)}
        />
      )}
    </>
  );
};

export default LegeOppsokt;
