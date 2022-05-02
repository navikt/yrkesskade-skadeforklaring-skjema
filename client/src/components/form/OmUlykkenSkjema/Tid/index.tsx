import { RadioGroup, Radio, Label } from '@navikt/ds-react';
import { useState, useEffect } from 'react';
import { DateUtils } from 'react-day-picker';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import { Controller, useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';
import {
  formatDate,
  handleDateValue,
  handleTimeValue,
  isKlokkeslett,
} from '../../../../utils/date';
import dateFnsParse from 'date-fns/parse';
import InputMask from 'react-input-mask';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './Tid.less';
import { Tid as TidModel } from '../../../../api/skadeforklaring';
import { getEnumKeyByEnumValue } from '../../../../utils/enumHelper';
import { parse } from 'date-fns';

const Tid: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const FORMAT: string = 'dd.MM.yyyy';
  const TIDSPUNKT_FORMAT: string = `${FORMAT} HH:mm`;

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: 'nav-day-picker-overlay',
    overlayWrapper: 'nav-day-picker-overlay-wrapper',
  } as InputClassNames;

  const whenDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-when-date ${dayPickerClassNames.container}`,
  };

  const fromDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`,
  };

  const toDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`,
  };

  const [timeType, setTimeType] = useState<string>(
    skadeforklaring.tid?.tidstype || 'TIDSPUNKT'
  );
  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    handleDateValue(skadeforklaring.tid?.tidspunkt)
  );

  const [specificTime, setSpecificTime] = useState<string | undefined>(
    handleTimeValue(skadeforklaring.tid?.tidspunkt)
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toDayInput, setToDayInput] = useState<DayPickerInput | null>();
  const [specificFromDay, setSpecificFromDay] = useState<Date | undefined>(
    handleDateValue(skadeforklaring.tid?.periode?.fra)
  );
  const [specificToDay, setSpecificToDay] = useState<Date | undefined>(
    handleDateValue(skadeforklaring.tid?.periode?.til)
  );

  const modifiers = { start: specificFromDay, end: specificToDay };

  const handleSpecificDate = (selectedDay: Date) => {
    setSpecificDate(selectedDay);
  };

  const handleSpecificFromDay = (selectedDay: Date) => {
    setSpecificFromDay(selectedDay);
  };

  const handleSpecificToDay = (selectedDay: Date) => {
    setSpecificToDay(selectedDay);
  };

  const handleKlokkeChange = (event: any) => {
    setSpecificTime(event.target.value);
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
    if (specificDate && specificTime && isKlokkeslett(specificTime)) {
      const dato = formatDate(specificDate, FORMAT);
      const tidspunkt = `${dato} ${specificTime}`;
      const isoDate = parse(
        tidspunkt,
        TIDSPUNKT_FORMAT,
        new Date().getTime()
      ).toISOString();

      setValue('tid.tidspunkt', isoDate);
    }
  }, [specificTime, specificDate, setValue, TIDSPUNKT_FORMAT]);

  useEffect(() => {
    if (timeType !== 'PERIODE') {
      return;
    }

    setValue('tid.periode.fra', specificFromDay?.toISOString() || '');
    setValue('tid.periode.til', specificToDay?.toISOString() || '');
  }, [timeType, specificFromDay, specificToDay, setValue]);

  return (
    <div className={`skadeforklaring-tid ${props.className}`}>
      <Controller
        name="tid.tidstype"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <RadioGroup
            legend="Når skjedde ulykken?"
            error={errors?.tid?.tidstype && errors?.tid.tidstype.message}
            value={timeType}
          >
            <Radio
              data-test-id="timeframe-when-date"
              id="timeframe-when-date"
              value="TIDSPUNKT"
              {...register('tid.tidstype', {
                required: 'Dette feltet er påkrevd',
              })}
              onChange={(e) => {
                setTimeType(e.target.value);
                const tidstype = getEnumKeyByEnumValue(
                  TidModel.tidstype,
                  e.target.value
                );
                onChange(tidstype);
              }}
            >
              På en dato
            </Radio>

            {timeType === 'TIDSPUNKT' && (
              <div className="tidspunkt-container spacer">
                <div className="dato-felt">
                  <Label>Dato for ulykken</Label>

                  <DayPickerInput
                    classNames={{
                      ...whenDayPickerClassNames,
                      container: `timeframe-when-date ${
                        dayPickerClassNames.container
                      } ${
                        errors?.tid?.tidspunkt ? 'nav-day-picker-error' : ''
                      }`,
                    }}
                    placeholder=""
                    value={specificDate}
                    onDayChange={handleSpecificDate}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    {...register('tid.tidspunkt', {
                      required: {
                        value: timeType === 'TIDSPUNKT',
                        message: 'Dette feltet er påkrevd',
                      },
                    })}
                    dayPickerProps={{
                      disabledDays: {
                        after: new Date(),
                      },
                    }}
                  />

                  {errors?.tid?.tidspunkt && (
                    <div className="navds-label navds-error-message">
                      {errors?.tid?.tidspunkt.message}
                    </div>
                  )}
                </div>
                <div
                  className={`klokkeslett-felt ${
                    errors?.tid?.tidspunkt ? 'navds-text-field--error' : ''
                  }`}
                >
                  <label htmlFor="timeframe-when-time" className="navds-label">
                    Tid for ulykken
                  </label>
                  <InputMask
                    mask="99:99"
                    onChange={handleKlokkeChange}
                    value={specificTime || ''}
                    data-test-id="timeframe-when-time"
                    id="timeframe-when-time"
                    className={`navds-text-field__input navds-body-short navds-body-medium`}
                  />
                </div>
              </div>
            )}

            <Radio
              value="PERIODE"
              data-testid="timeframe-when-over-period"
              id="timeframe-when-over-period"
              {...register('tid.tidstype', {
                required: 'Dette feltet er påkrevd',
              })}
              onChange={(e) => {
                setTimeType(e.target.value);
                const tidstype = getEnumKeyByEnumValue(
                  TidModel.tidstype,
                  e.target.value
                );
                onChange(tidstype);
              }}
            >
              Over en periode
            </Radio>
            {timeType === 'PERIODE' && (
              <div className="periode-container spacer">
                <div>
                  <Label>Fra dag</Label>
                  <DayPickerInput
                    classNames={{
                      ...fromDayPickerClassNames,
                      container: `timeframe-from-date ${
                        dayPickerClassNames.container
                      } ${
                        errors?.tid?.periode?.fra ? 'nav-day-picker-error' : ''
                      }`,
                    }}
                    {...register('tid.periode.fra', {
                      required: {
                        value: timeType === 'PERIODE',
                        message: 'Dette feltet er påkrevd',
                      },
                    })}
                    placeholder=""
                    value={specificFromDay}
                    onDayChange={handleSpecificFromDay}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    dayPickerProps={{
                      toMonth: specificToDay,
                      disabledDays: {
                        after: new Date(),
                      },
                      modifiers,
                      onDayClick: () => toDayInput?.getInput().focus(),
                    }}
                  />
                  {errors?.tid?.periode?.fra && (
                    <div className="navds-label navds-error-message">
                      {errors?.tid?.periode?.fra?.message}
                    </div>
                  )}
                </div>
                <div>
                  <Label>Til dag</Label>
                  <DayPickerInput
                    classNames={{
                      ...toDayPickerClassNames,
                      container: `timeframe-to-date ${
                        dayPickerClassNames.container
                      } ${
                        errors?.tid?.periode?.til ? 'nav-day-picker-error' : ''
                      }`,
                    }}
                    {...register('tid.periode.til', {
                      required: {
                        value: timeType === 'PERIODE',
                        message: 'Dette feltet er påkrevd',
                      },
                    })}
                    placeholder=""
                    value={specificToDay}
                    onDayChange={handleSpecificToDay}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    dayPickerProps={{
                      month: specificFromDay,
                      fromMonth: specificFromDay,
                      modifiers,
                      disabledDays: {
                        after: new Date(),
                      },
                    }}
                  />
                  {errors?.tid?.periode?.til && (
                    <div className="navds-label navds-error-message">
                      {errors?.tid?.periode?.til?.message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default Tid;
