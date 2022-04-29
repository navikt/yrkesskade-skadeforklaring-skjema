import { Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring/models/Skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../../core/reducers/kodeverk.reducer';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';

const Fravaertype: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [fravaer, setFravaer] = useState<string>(
    skadeforklaring.fravaer.foerteDinSkadeEllerSykdomTilFravaer
  );
  const [fravaertype, setFravaertype] = useState<string>(
    skadeforklaring.fravaer.fravaertype || ''
  );

  const fravaertyper = useAppSelector((state) =>
    selectKodeverk(state, 'fravaertype')
  );

  const foerteDinSkadeEllerSykdomTilFravaer = useAppSelector((state) =>
    selectKodeverk(state, 'foerteDinSkadeEllerSykdomTilFravaer')
  );

  return (
    <div className={`skade-fravaer ${props.className}`}>
      <RadioGroup
        className="spacer"
        legend="Førte din skade/sykdom til fravær?"
        value={fravaer}
        error={
          errors?.fravaer?.foerteDinSkadeEllerSykdomTilFravaer &&
          errors?.fravaer?.foerteDinSkadeEllerSykdomTilFravaer.message
        }
        {...register('fravaer.foerteDinSkadeEllerSykdomTilFravaer', {
          required: {
            value: true,
            message: 'Dette feltet er påkrevd',
          },
        })}
        onChange={(e) => setFravaer(e)}
        data-test-id="fravaer-valg"
      >
        {foerteDinSkadeEllerSykdomTilFravaer &&
          Object.keys(foerteDinSkadeEllerSykdomTilFravaer).map(
            (fravaerkode) => (
              <Radio
                key={fravaerkode}
                value={fravaerkode}
                {...register('fravaer.foerteDinSkadeEllerSykdomTilFravaer', {
                  required: {
                    value: true,
                    message: 'Dette feltet er påkrevd',
                  },
                })}
                data-test-id={`fravaer-valg-${fravaerkode}`}
              >
                {foerteDinSkadeEllerSykdomTilFravaer[fravaerkode]?.verdi ||
                  'Kodeverdi feil'}
              </Radio>
            )
          )}
      </RadioGroup>

      {fravaer && fravaer !== 'nei' && fravaer !== 'ikkeRelevant' && (
        <>
          <RadioGroup
            legend="Velg type fravær"
            value={fravaertype}
            error={
              errors?.fravaer?.fravaertype &&
              errors.fravaer?.fravaertype.message
            }
            {...register('fravaer.fravaertype', {
              required: {
                value: true,
                message: 'Dette feltet er påkrevd',
              },
            })}
            onChange={(e) => setFravaertype(e)}
            data-test-id="fravaer-type"
          >
            {fravaertyper &&
              Object.keys(fravaertyper).map((fravaertypekode) => (
                <Radio
                  key={fravaertypekode}
                  value={fravaertypekode}
                  data-test-id={`fravaer-type-${fravaertypekode}`}
                  {...register('fravaer.fravaertype', {
                    required: {
                      value: true,
                      message: 'Dette feltet er påkrevd',
                    },
                  })}
                >
                  {fravaertyper[fravaertypekode]?.verdi || 'Kodeverdi feil'}
                </Radio>
              ))}
          </RadioGroup>
        </>
      )}
    </div>
  );
};

export default Fravaertype;
