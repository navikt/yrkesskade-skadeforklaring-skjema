import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  BodyLong,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { useCancel } from '../../core/hooks/cancel.hooks';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { logMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import './Veiledning.less';

const Veiledning = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

  const handleNext = () => {
    logMessage('Skjemautfylling påbegynt');
    logAmplitudeEvent('skadeforklaring.innmelding', { status: 'startet' });
    navigate('/skjema/person');
  };

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="top-spacer">
            <div>
              <Heading size="2xlarge" spacing data-number="1">
                Skadeforklaringskjema ved arbeidsulykke
              </Heading>
              <BodyLong spacing>
                I dette skjemaet kan du gi flere opplysninger om en innmeldt
                yrkesskade. Opplysningene som oppgis skal være riktige og
                relevante, slik at NAV kan behandle saken så effektivt som
                mulig. Du skal kun oppgi opplysninger om deg selv,
                personopplysninger om andre anses ikke relevante for saken.
                Personopplysningene som du oppgir i skadeforklaringen skal
                begrenses til behandlingens formål; å beskrive fakta om
                hendelsen og hvilken skade du har blitt påført.
              </BodyLong>
              <BodyLong spacing>
                Statistisk sentralbyrå og tilsynsmyndigheter kan benytte data om
                yrkesskader til analyse og statistikkformål.
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
              <Heading size="small">Kontakt</Heading>
              <BodyLong spacing>
                Oppdager du problemer eller har spørsmål kan du ta kontakt på:
                55 55 33 33
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
