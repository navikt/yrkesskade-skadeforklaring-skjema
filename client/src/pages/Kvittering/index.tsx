import { Print } from '@navikt/ds-icons';
import {
  Alert,
  BodyShort,
  Button,
  Cell,
  ContentContainer,
  Grid,
  Heading,
  Label,
} from '@navikt/ds-react';
import { format } from 'date-fns';
import SystemHeader from '../../components/SystemHeader';

const Kvittering = () => {
  const handlePrintClicked = () => {
    console.log('handle print clicked');
  };

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div>
            <div>
              <Heading size="2xlarge" spacing data-number="1">
                Takk for innmelding
              </Heading>
              <Alert variant="success" className="spacer">
                Innmeldingen din om skadeforklaring er sendt{' '}
                {format(new Date(), 'dd.MM.yyyy')}
              </Alert>
              <Label>Skriv ut</Label>
              <BodyShort spacing>
                Ønsker du kopi av skademeldingen, kan du skrive den ut her
              </BodyShort>
              <Button
                className="no-print"
                onClick={handlePrintClicked}
                variant="tertiary"
                data-test-id="kvittering-print-kopi"
              >
                <Print />
                Skriv ut en kopi av skadeforklaringen
              </Button>
            </div>
          </div>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default Kvittering;
