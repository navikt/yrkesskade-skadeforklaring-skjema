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

const Tid = () => {
  const FORMAT: string = 'dd.MM.yyyy';

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
    overlay: '',
    overlayWrapper: '',
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

  const [timeType, setTimeType] = useState(
    skadeforklaring.tid?.tidstype || 'Tidspunkt'
  );
  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    handleDateValue(skadeforklaring.tid?.tidspunkt)
  );

  const [specificTime, setSpecificTime] = useState<string | undefined>(
    handleTimeValue(skadeforklaring.tid?.tidspunkt)
  );

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
      const timeparts = specificTime.split(':');
      const newDate = new Date(
        specificDate.getUTCFullYear(),
        specificDate?.getUTCMonth(),
        specificDate?.getUTCDay(),
        parseInt(timeparts[0]),
        parseInt(timeparts[1])
      );

      setValue('tid.tidspunkt', newDate.toISOString());
    }
  }, [specificTime, specificDate, setValue]);

  useEffect(() => {
    if (timeType !== 'Periode') {
      return;
    }

    setValue('tid.periode.fra', specificFromDay?.toISOString() || '');
    setValue('tid.periode.til', specificToDay?.toISOString() || '');
  }, [timeType, specificFromDay, specificToDay, setValue]);

  return (
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
            value="Tidspunkt"
            {...register('tid.tidstype', {
              required: 'Dette feltet er påkrevd',
            })}
            onChange={(e) => {
              setTimeType(e.target.value);
              onChange(e.target.value);
            }}
          >
            På en dato
          </Radio>

          {timeType === 'Tidspunkt' && (
            <div>
              <Label>Dato for ulykken</Label>

              <DayPickerInput
                classNames={{ ...whenDayPickerClassNames }}
                placeholder=""
                value={specificDate}
                onDayChange={handleSpecificDate}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                {...register('tid.tidspunkt', {
                  required: timeType === 'Tidspunkt',
                })}
                dayPickerProps={{
                  disabledDays: {
                    after: new Date(),
                  },
                }}
              />

              {errors?.tid?.tidspunkt && (
                <div>{errors?.tid?.tidspunkt.message}</div>
              )}
            </div>
          )}

          {timeType === 'Tidspunkt' && specificDate !== null && (
            <div className="spacer">
              <label htmlFor="timeframe-when-time" className="navds-label">
                Tid for ulykken
              </label>
              <InputMask
                mask="99:99"
                onChange={handleKlokkeChange}
                value={specificTime || ''}
                data-test-id="timeframe-when-time"
                id="timeframe-when-time"
                className="navds-text-field__input navds-body-short navds-body-medium"
              />
            </div>
          )}

          <Radio
            value="Periode"
            data-testid="timeframe-when-over-period"
            id="timeframe-when-over-period"
            {...register('tid.tidstype', {
              required: 'Dette feltet er påkrevd',
            })}
            onChange={(e) => {
              setTimeType(e.target.value);
              onChange(e.target.value);
            }}
          >
            Over en periode
          </Radio>
          {timeType === 'Periode' && (
            <div className="periode-container spacer">
              <div>
                <Label>Fra dag</Label>
                <DayPickerInput
                  classNames={fromDayPickerClassNames}
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
              </div>
              <div>
                <Label>Til dag</Label>
                <DayPickerInput
                  ref={(el) => setToDayInput(el)}
                  classNames={toDayPickerClassNames}
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
              </div>
            </div>
          )}
        </RadioGroup>
      )}
    />
  );
};

export default Tid;
