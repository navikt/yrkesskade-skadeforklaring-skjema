import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  Ingress,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { useCancel } from '../../core/hooks/cancel.hooks';

const Veiledning = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

  const handleNext = () => {
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
              <Heading size="2xlarge" spacing data-number="1">
                Skadeforklaringskjema ved arbeidsulykke
              </Heading>
              <Ingress spacing>
                I dette skjemaet kan du gi flere opplysninger om en
                arbeidsulykke. Har du fått konkrete spørsmål fra NAV, kan de
                besvares her. Skadeforklaringen erstatter ikke skademeldingen.
              </Ingress>
              <section className="button-section spacer button-group">
                <Button
                  variant="secondary"
                  onClick={cancel}
                  data-test-id="avbryt-skadeforklaring"
                >
                  Avbryt
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  data-test-id="neste-steg"
                >
                  Start utfylling
                </Button>
              </section>
            </div>
          </div>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default Veiledning;
