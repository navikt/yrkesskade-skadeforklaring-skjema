import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  Ingress,
  BodyLong,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { useCancel } from '../../core/hooks/cancel.hooks';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';

const Veiledning = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

  const handleNext = () => {
    navigate('/skjema/person');
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
              <BodyLong spacing>
                Statistisk sentralbyrå og tilsynsmyndigheter kan benytte data om
                arbeidstakeres yrkesskader til analyse og statistikkformål.
              </BodyLong>
              <BodyLong spacing>
                Har du fått konkrete spørsmål fra NAV i forbindelse med en
                innmeldt yrkesskade, kan du benytte skadeforklaringsskjemaet til
                å besvare disse. Det presiseres at en skadeforklaring ikke
                erstatter skademeldingen, men kan benyttes for å gi flere
                opplysninger om en hendelse.
              </BodyLong>
              <BodyLong spacing>
                Husk å logge av når du er ferdig med registreringen.
              </BodyLong>

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
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator />
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default Veiledning;
