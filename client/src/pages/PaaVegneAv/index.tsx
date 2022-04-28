import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
  BodyLong,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import {
  Personvelger,
  Person,
  PersonType,
} from '@navikt/yrkesskade-personvelger';
import { useNavigate } from 'react-router';
import { useCancel } from '../../core/hooks/cancel.hooks';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import BackButton from '../../components/BackButton';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../api/skadeforklaring';
import { useAppSelector } from '../../core/hooks/state.hooks';
import { selectBruker } from '../../core/reducers/bruker.reducer';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const PaaVegneAv = () => {
  const navigate = useNavigate();
  const cancel = useCancel();
  const { setValue } = useFormContext<Skadeforklaring>();
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
        (foreldreansvarperson) => ({
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
    setValue('skadelidt.norskIdentitetsnummer', person.identifikator);
    setValue(
      'innmelder.norskIdentitetsnummer',
      bruker.brukerinfo?.identifikator || ''
    );
    const innmelderrolle =
      bruker.brukerinfo?.identifikator !== person.identifikator
        ? 'vergeOgForesatt'
        : 'denSkadelidte';
    setValue('innmelder.innmelderrolle', innmelderrolle);

    navigate('/skadeforklaring/skjema/ulykken');
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
          <BackButton />
          <div>
            <div>
              <Heading size="2xlarge" spacing data-number="2">
                Hvem skal du sende på vegne av?
              </Heading>
              <Personvelger
                personer={personer}
                onPersonChange={handlePersonChange}
                data-test-id="person-velger"
              />
              <BodyLong spacing>
                Du kan sende skadeforklaring digitalt på vegne av dine barn som
                er oppført med samme bostedsadresse som deg i folkeregisteret.
                Barn er yrkesskadedekket fra de begynner på skolen, og derfor
                vil du kun få opp barn som er i skolealder frem til de er 18år.
                Får du ikke opp alle dine barn kan det være fordi de ikke er
                yrkesskade dekket, eller fordi de ikke er oppført på samme
                adresse som deg i folkeregisteret.
              </BodyLong>
              <BodyLong spacing>
                Opplysninger som du nå sender NAV vil kun bli knyttet til
                personen du velger.
              </BodyLong>
              <section className="button-section spacer button-group">
                <Button
                  variant="secondary"
                  onClick={cancel}
                  data-test-id="avbryt-skadeforklaring"
                >
                  Avbryt
                </Button>
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
