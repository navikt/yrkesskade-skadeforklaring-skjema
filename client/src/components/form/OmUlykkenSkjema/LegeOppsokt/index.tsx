import { RadioGroup, Radio, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';

const LegeOppsokt = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [legeOppsokt, setLegeOppsokt] = useState(
    skadeforklaring.behandler?.erBehandlerOppsokt !== undefined
      ? skadeforklaring.behandler.erBehandlerOppsokt
        ? 'ja'
        : 'nei'
      : ''
  );
  const [navn, setNavn] = useState(skadeforklaring.behandler?.behandlerNavn);

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
