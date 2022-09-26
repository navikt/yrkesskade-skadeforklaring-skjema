import { RadioGroup, Radio, Label } from '@navikt/ds-react';
import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';
import './Helseinstitusjon.less';
import BehandlerNavn from '../../../BehandlerNavn';
import { formatDate, handleDateValue } from '../../../../utils/date';
import dateFnsParse from 'date-fns/parse';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { parse } from 'date-fns';
import nb from 'date-fns/locale/nb';
import { DateUtils } from 'react-day-picker';
import { InputClassNames } from 'react-day-picker/types/ClassNames';

const Helseinstitusjon: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const [legeOppsokt, setLegeOppsokt] = useState(
    skadeforklaring?.erHelsepersonellOppsokt
  );

  const FORMAT: string = 'dd.MM.yyyy';
  const TIDSPUNKT_FORMAT: string = `${FORMAT} HH:mm`;

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: 'nav-day-picker-overlay',
    overlayWrapper: 'nav-day-picker-overlay-wrapper',
  } as InputClassNames;

  const whenDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-when-date ${dayPickerClassNames.container}`,
  };

  const [oppsoktDato, setOppsoktDato] = useState<Date | undefined>(
    handleDateValue(skadeforklaring?.foersteHelsepersonellOppsoktDato)
  );

  const handleOppsoktDato = (selectedDay: Date) => {
    setOppsoktDato(selectedDay);
  };

  const parseDate = (str: string, format: string) => {
    // sjekk at vi har skrevet noe og at noe er 10 tegn
    if (!str || str.length !== 10) {
      return undefined;
    }

    // parse noe til dato om mulig
    const parsed = dateFnsParse(str, format, new Date());
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }

    // ikke dato
    return undefined;
  };

  useEffect(() => {
    if (oppsoktDato) {
      const dato = formatDate(oppsoktDato, FORMAT);
      const isoDate = parse(`${dato} 12:00`, TIDSPUNKT_FORMAT, new Date(), {
        locale: nb,
      }).toISOString();

      setValue('foersteHelsepersonellOppsoktDato', isoDate);
    }
  }, [oppsoktDato, setValue, FORMAT, TIDSPUNKT_FORMAT]);

  return (
    <div className={`skade-lege ${props.className}`}>
      <RadioGroup
        legend="Ble helsepersonell oppsøkt etter skaden?"
        value={legeOppsokt}
        error={
          errors?.erHelsepersonellOppsokt &&
          errors?.erHelsepersonellOppsokt.message
        }
        {...register('erHelsepersonellOppsokt', {
          required: {
            value: true,
            message: 'Dette feltet er påkrevd',
          },
        })}
        onChange={(e) => {
          setLegeOppsokt(e);
        }}
      >
        <Radio
          value="ja"
          data-test-id="lege-oppsokt-ja"
          {...register('erHelsepersonellOppsokt', {
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
          {...register('erHelsepersonellOppsokt', {
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
          <Controller
            name="helseinstitusjoner"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <BehandlerNavn
                helseinstitusjoner={skadeforklaring.helseinstitusjoner || []}
                onInstutisjonChange={(instutisjoner) => {
                  onChange(instutisjoner);
                }}
              />
            )}
          />
          <div className="tidspunkt-container spacer">
            <div className="dato-felt">
              <Label>Når hadde du første time hos lege/behandler?</Label>

              <DayPickerInput
                classNames={{
                  ...whenDayPickerClassNames,
                  container: `lege-oppsokt-tid ${
                    dayPickerClassNames.container
                  } ${
                    errors?.foersteHelsepersonellOppsoktDato
                      ? 'nav-day-picker-error'
                      : ''
                  }`,
                }}
                placeholder=""
                value={oppsoktDato}
                onDayChange={handleOppsoktDato}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                {...register('foersteHelsepersonellOppsoktDato', {
                  required: {
                    value: legeOppsokt === 'ja',
                    message: 'Dette feltet er påkrevd',
                  },
                })}
                dayPickerProps={{
                  disabledDays: {
                    after: new Date(),
                  },
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Helseinstitusjon;
