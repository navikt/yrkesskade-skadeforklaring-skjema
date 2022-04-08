import { RadioGroup, Radio, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';
import './LegeOppsokt.less';

const LegeOppsokt: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const {
    register,
    control,
    setValue,
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
  const [adresse, setAdresse] = useState(
    skadeforklaring.behandler?.adresse?.adresse || ''
  );
  const [postnummer, setPostnummer] = useState(
    skadeforklaring.behandler?.adresse?.postnummer || ''
  );
  const [poststed, setPoststed] = useState(
    skadeforklaring.behandler?.adresse?.poststed || ''
  );

  return (
    <div className={`skade-lege ${props.className}`}>
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
              if (e === 'nei') {
                // sørg for at vi setter adresse til undefined
                setValue('behandler.adresse', undefined);
              }
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
        <>
          <TextField
            className="spacer"
            label="Navn på helseforetak, legevakt eller legekontor (valgfritt)"
            value={navn}
            data-test-id="lege-behandler-navn"
            {...register('behandler.behandlerNavn')}
            onChange={(e) => setNavn(e.target.value)}
          />
          <TextField
            className="spacer"
            label="Adresse (valgfritt)"
            value={adresse}
            data-test-id="lege-behandler-adresse"
            {...register('behandler.adresse.adresse')}
            onChange={(e) => setAdresse(e.target.value)}
          />

          <div className="postnummer-sted-felt spacer">
            <TextField
              className="postnummer-felt"
              label="Postnummer (valgfritt)"
              value={postnummer}
              data-test-id="lege-behandler-postnummer"
              {...register('behandler.adresse.postnummer', {
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Kun tall',
                },
              })}
              error={
                errors?.behandler?.adresse?.postnummer &&
                errors?.behandler?.adresse?.postnummer.message
              }
              onChange={(e) => setPostnummer(e.target.value)}
            />

            <TextField
              className="poststed-felt"
              label="Poststed (valgfritt)"
              value={poststed}
              data-test-id="lege-behandler-poststed"
              {...register('behandler.adresse.poststed')}
              onChange={(e) => setPoststed(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LegeOppsokt;
