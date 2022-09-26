import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  BodyLong,
  Button,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import {
  Personvelger,
  Person,
  PersonType,
} from '@navikt/yrkesskade-personvelger';
import { useNavigate } from 'react-router';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../api/skadeforklaring';
import { useAppSelector } from '../../core/hooks/state.hooks';
import { useAppDispatch } from '../../core/hooks/state.hooks';
import { selectBruker } from '../../core/reducers/bruker.reducer';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ExitButton from '../../components/ExitButton';
import { setSkjemaStartet } from '../../core/reducers/app.reducer';
import { oppdaterSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';
import { logMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';

const PaaVegneAv = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setValue, getValues } = useFormContext<Skadeforklaring>();
  const bruker = useAppSelector((state) => selectBruker(state));

  const [personer, setPersoner] = useState<Person[]>([]);

  useEffect(() => {
    const brukerinfo = bruker.brukerinfo;
    if (!brukerinfo) {
      // skal vi sende feilmelding og sende brukeren til en annen side?
      return;
    }
    let tilPersoner: Person[] = [
      {
        navn: brukerinfo.navn || '',
        beskrivelse: 'Deg selv',
        identifikator: brukerinfo.identifikator || '',
        type: PersonType.VOKSEN,
      },
    ];

    if (brukerinfo.foreldreansvar) {
      const barn: Person[] = brukerinfo.foreldreansvar.map(
        (foreldreansvarperson: any) => ({
          navn: foreldreansvarperson.navn || '',
          beskrivelse: 'Barn',
          identifikator: foreldreansvarperson.identifikator || '',
          type: kalkulerPersontype(foreldreansvarperson.foedselsaar),
        })
      );
      tilPersoner = [...tilPersoner, ...barn];
    }

    setPersoner(tilPersoner);
  }, [bruker]);

  const handlePersonChange = (person: Person) => {
    settPersonOgNavigate(person.identifikator);
  };

  const handleNext = () => {
    if (bruker.brukerinfo) {
      settPersonOgNavigate(bruker.brukerinfo?.identifikator);
    } else {
      throw new Error('Bruker er ikke satt');
    }
  };

  const settPersonOgNavigate = (identifikator: string) => {
    setValue('skadelidt.norskIdentitetsnummer', identifikator);
    // setValue(
    //   'innmelder.norskIdentitetsnummer',
    //   bruker.brukerinfo?.identifikator || ''
    // );
    setValue('innmelder.norskIdentitetsnummer', '12');
    const innmelderrolle =
      bruker.brukerinfo?.identifikator !== identifikator
        ? 'vergeOgForesatt'
        : 'denSkadelidte';
    setValue('innmelder.innmelderrolle', innmelderrolle);

    logMessage('Skjemautfylling påbegynt');
    dispatch(setSkjemaStartet());
    logAmplitudeEvent('skadeforklaring.innmelding', { status: 'startet' });
    dispatch(oppdaterSkadeforklaring(getValues()));
    navigate('/skadeforklaring/skjema/veiledning');
  };

  const kalkulerPersontype = (fodselsaar?: number): PersonType => {
    if (fodselsaar === undefined) {
      return PersonType.VOKSEN;
    }

    const alder = dayjs().year() - fodselsaar;

    if (alder <= 1) {
      return PersonType.BABY;
    }

    if (alder <= 18) {
      return PersonType.BARN;
    }

    return PersonType.VOKSEN;
  };

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div>
            <div className="top-spacer">
              <Heading size="2xlarge" spacing data-number="2">
                Hvem skal du sende på vegne av?
              </Heading>
              <Personvelger
                personer={personer}
                onPersonChange={handlePersonChange}
                data-test-id="person-velger"
              />
              <BodyLong spacing>
                Du kan sende inn skadeforklaring digitalt på vegne av deg selv,
                eller for egne barn du har foreldreansvar for. Barn er
                yrkesskadedekket fra de begynner på skolen, du vil derfor kun få
                opp barn i skolealder som alternativ. Får du ikke opp alle dine
                barn, kan det være fordi de ikke er yrkesskadedekket, eller
                fordi du ikke er oppført med foreldreansvar for dem i
                folkeregisteret
              </BodyLong>
              <BodyLong spacing>
                Opplysninger som du nå sender til NAV vil kun bli knyttet til
                personen du velger.
              </BodyLong>
              <section className="button-section spacer button-group">
                <ExitButton />

                {bruker.brukerinfo?.foreldreansvar.length === 0 && (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    data-test-id="neste-steg"
                  >
                    Neste
                  </Button>
                )}
              </section>
            </div>
          </div>
        </Cell>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator />
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default PaaVegneAv;
