import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
  BodyShort,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import {
  Personvelger,
  Person,
  PersonType,
} from '@navikt/yrkesskade-personvelger';
import { useNavigate } from 'react-router';
import { useCancel } from '../../core/hooks/cancel.hooks';

const PaaVegneAv = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

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
    navigate('/skjema/ulykken');
  };

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div>
            <div>
              <Heading size="2xlarge" spacing data-number="2">
                Hvem skal du melde på vegne av?
              </Heading>
              <Personvelger
                personer={personer}
                onPersonChange={handlePersonChange}
              />
              <BodyShort spacing>
                Alle opplysninger som sendes inn vil være knyttet til personen
                du velger
              </BodyShort>
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
      </Grid>
    </ContentContainer>
  );
};

export default PaaVegneAv;
