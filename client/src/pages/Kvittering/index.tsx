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
import { useLocation } from 'react-router';
import { Skadeforklaring } from '../../api/skadeforklaring';
import SystemHeader from '../../components/SystemHeader';
import { PrintService } from '../../services/PrintService';
import {
  logErrorMessage,
  logMessage,
  logWarningMessage,
} from '../../utils/logging';

const Kvittering = () => {
  const { state } = useLocation();

  const handlePrintClicked = async () => {
    try {
      const response = await PrintService.print(state as Skadeforklaring);

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      logMessage('Bruker har valgt å skrive ut en kopi');
      const pdfWindow = window.open();

      if (pdfWindow) {
        pdfWindow.location.href = fileURL;
      } else {
        logWarningMessage('Kunne ikke åpne pdf vindu/tab');
      }
    } catch (error: any) {
      logErrorMessage(
        `Nedlasting av skadeforklaring kopi feilet. Årsak: ${error.message}`
      );
    }
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
                Ønsker du kopi av skadeforklaringen, kan du skrive den ut her
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
