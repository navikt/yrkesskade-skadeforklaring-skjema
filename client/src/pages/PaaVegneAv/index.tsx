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

const PaaVegneAv = () => {
  const navigate = useNavigate();
  const cancel = useCancel();
  const { setValue } = useFormContext<Skadeforklaring>();

  const personer: Person[] = [
    {
      navn: 'Randi Olsen',
      beskrivelse: 'Deg selv',
      identifikator: '1',
      type: PersonType.VOKSEN,
    },
    {
      navn: 'Erik Olsen',
      beskrivelse: 'Barnet ditt',
      identifikator: '2',
      type: PersonType.BARN,
    },
    {
      navn: 'Nina Olsen',
      beskrivelse: 'Barnet ditt',
      identifikator: '3',
      type: PersonType.BABY,
    },
  ];

  const handlePersonChange = (person: Person) => {
    setValue('identifikator', person.identifikator);
    navigate('/skjema/ulykken');
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
                Hvem skal du melde på vegne av?
              </Heading>
              <Personvelger
                personer={personer}
                onPersonChange={handlePersonChange}
                data-test-id="person-velger"
              />
              <BodyLong spacing>
                Du kan melde skadeforklaring digitalt på vegene av dine barn som
                er oppført med samme bostedsadresse som deg i folkeregisteret.
                Barn er yrkesskadedekket fra de begynner på skolen, og derfor
                vil du kun få opp barn som er i skolealder frem til de er 18år.
                Får du ikke opp alle dine barn kan det være fordi de ikke er
                yrkesskade dekket, eller fordi de ikke er oppført på samme
                adresse som deg i folkeregisteret.
              </BodyLong>
              <BodyLong spacing>
                Alle opplysninger som sendes inn vil være knyttet til personen
                du velger.
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
