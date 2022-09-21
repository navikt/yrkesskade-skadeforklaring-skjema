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
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { logMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import './Veiledning.less';
import ExitButton from '../../components/ExitButton';
import { useAppDispatch, useAppSelector } from '../../core/hooks/state.hooks';
import {
  selectSkjemaStartet,
  setSkjemaStartet,
} from '../../core/reducers/app.reducer';

const Veiledning = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const skjemaStartet = useAppSelector((state) => selectSkjemaStartet(state));

  const handleNext = () => {
    if (skjemaStartet) {
      logMessage('Skjemautfylling gjenopptatt');
      logAmplitudeEvent('skadeforklaring.innmelding', {
        status: 'gjenopptatt',
      });
    } else {
      logMessage('Skjemautfylling påbegynt');
      dispatch(setSkjemaStartet());
      logAmplitudeEvent('skadeforklaring.innmelding', { status: 'startet' });
    }
    navigate('/skadeforklaring/skjema/person');
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
                Opplysningene skal bidra til å beskrive fakta om hendelsen og
                hvilken type skade du er blitt påført.
              </BodyLong>
              <BodyLong spacing>
                Har du fått konkrete spørsmål fra NAV i forbindelse med en
                innmeldt yrkesskade, kan du benytte skadeforklaringsskjemaet til
                å besvare disse.
              </BodyLong>
              <BodyLong spacing>
                Det presiseres at en skadeforklaring ikke erstatter
                skademeldingen, men kan benyttes for å gi flere opplysninger om
                en hendelse.
              </BodyLong>
              <BodyLong spacing>
                NAV henter opplysninger om barn du har foreldreansvar for og din
                bostedsadresse fra folkeregisteret. Det er i tråd med
                regjeringens digitaliseringsstrategi å bruke data fra nasjonale
                komponenter slik at du slipper å fylle inn opplysninger som vi
                allerede har om deg.
              </BodyLong>
              <BodyLong spacing>
                Informasjonen som samles inn, vil bli brukt i behandlingen av
                yrkesskade eller yrkessykdomssaken din. Søker du om andre
                ytelser fra NAV hvor yrkesskaden eller yrkessykdommen din kan ha
                betydning vil opplysningene også kunne bli brukt i forbindelse
                med behandling av disse sakene.{' '}
              </BodyLong>
              <BodyLong spacing>
                Statistisk sentralbyrå og tilsynsmyndigheter kan benytte data om
                yrkesskader til analyse og statistikkformål.{' '}
              </BodyLong>
              <BodyLong spacing>
                Husk å logge av når du er ferdig med registreringen.{' '}
              </BodyLong>
              <Heading size="small">Kontakt</Heading>
              <BodyLong spacing>
                Oppdager du problemer eller har spørsmål kan du ta kontakt på:
                55 55 33 33
              </BodyLong>

              <section className="button-section spacer button-group">
                <ExitButton />
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
