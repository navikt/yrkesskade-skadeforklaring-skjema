import { RadioGroup, Radio, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';
import './Helseinstitusjon.less';

const LegeOppsokt: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [legeOppsokt, setLegeOppsokt] = useState(
    skadeforklaring.helseinstitusjon?.erHelsepersonellOppsokt
  );
  const [navn, setNavn] = useState(skadeforklaring.helseinstitusjon?.navn);
  const [adresse, setAdresse] = useState(
    skadeforklaring.helseinstitusjon?.adresse?.adresse || ''
  );
  const [postnummer, setPostnummer] = useState(
    skadeforklaring.helseinstitusjon?.adresse?.postnummer || ''
  );
  const [poststed, setPoststed] = useState(
    skadeforklaring.helseinstitusjon?.adresse?.poststed || ''
  );

  return (
    <div className={`skade-lege ${props.className}`}>
      <RadioGroup
        legend="Ble helsepersonell oppsøkt etter skaden?"
        value={legeOppsokt}
        error={
          errors?.helseinstitusjon?.erHelsepersonellOppsokt &&
          errors?.helseinstitusjon.erHelsepersonellOppsokt.message
        }
        {...register('helseinstitusjon.erHelsepersonellOppsokt', {
          required: {
            value: true,
            message: 'Dette feltet er påkrevd',
          },
        })}
        onChange={(e) => {
          setLegeOppsokt(e);
          if (e === 'nei') {
            // sørg for at vi setter adresse til undefined
            setValue('helseinstitusjon.adresse', undefined);
          }
        }}
      >
        <Radio
          value="ja"
          data-test-id="lege-oppsokt-ja"
          {...register('helseinstitusjon.erHelsepersonellOppsokt', {
            required: {
              value: true,
              message: 'Dette feltet er påkrevd',
            },
          })}
        >
          Ja
        </Radio>
        <Radio
          value="nei"
          data-test-id="lege-oppsokt-nei"
          {...register('helseinstitusjon.erHelsepersonellOppsokt', {
            required: {
              value: true,
              message: 'Dette feltet er påkrevd',
            },
          })}
        >
          Nei
        </Radio>
      </RadioGroup>

      {legeOppsokt === 'ja' && (
        <>
          <TextField
            className="spacer"
            label="Navn på helseforetak, legevakt eller legekontor (valgfritt)"
            value={navn}
            data-test-id="lege-helseinstitusjon-navn"
            {...register('helseinstitusjon.navn', {
              maxLength: {
                value: 150,
                message: 'Maks 150 tegn',
              },
            })}
            onChange={(e) => setNavn(e.target.value)}
            error={
              errors?.helseinstitusjon?.navn &&
              errors?.helseinstitusjon?.navn?.message
            }
          />
          <TextField
            className="spacer"
            label="Adresse (valgfritt)"
            value={adresse}
            data-test-id="lege-helseinstitusjon-adresse"
            {...register('helseinstitusjon.adresse.adresse')}
            onChange={(e) => setAdresse(e.target.value)}
          />

          <div className="postnummer-sted-felt spacer">
            <TextField
              className="postnummer-felt"
              label="Postnummer (valgfritt)"
              value={postnummer}
              data-test-id="lege-helseinstitusjon-postnummer"
              {...register('helseinstitusjon.adresse.postnummer', {
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Kun tall',
                },
              })}
              error={
                errors?.helseinstitusjon?.adresse?.postnummer &&
                errors?.helseinstitusjon?.adresse?.postnummer.message
              }
              onChange={(e) => setPostnummer(e.target.value)}
            />

            <TextField
              className="poststed-felt"
              label="Poststed (valgfritt)"
              value={poststed}
              data-test-id="lege-helseinstitusjon-poststed"
              {...register('helseinstitusjon.adresse.poststed')}
              onChange={(e) => setPoststed(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LegeOppsokt;
