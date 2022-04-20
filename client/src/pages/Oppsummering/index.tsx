import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
  Accordion,
  Ingress,
  Label,
  BodyShort,
} from '@navikt/ds-react';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { useNavigate } from 'react-router';
import { SkadeforklaringApiService } from '../../api/skadeforklaring/services/SkadeforklaringApiService';
import BackButton from '../../components/BackButton';
import PersonOppsummering from '../../components/summary/PersonOppsummering';
import UlykkenOppsummering from '../../components/summary/UlykkenOppsummering';
import VedleggOppsummering from '../../components/summary/VedleggOppsummering';
import SystemHeader from '../../components/SystemHeader';
import { useCancel } from '../../core/hooks/cancel.hooks';
import { useAppSelector } from '../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { logMessage } from '../../utils/logging';

const Oppsummering = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const handleSubmit = async () => {
    try {
      await SkadeforklaringApiService.postSkadeforklaring(skadeforklaring);
      logMessage('Skjemainnsending fullført');
      logAmplitudeEvent('skadeforklaring.innmelding', { status: 'fullfort' });
      navigate('/skjema/kvittering');
    } catch (e: any) {
      logAmplitudeEvent('skadeforklaring.innmelding', {
        status: 'feilet',
        feilmelding: e.body,
      });
      navigate('/feilmelding', { state: e.body });
    }
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
                Oppsummering
              </Heading>
              <Ingress spacing>
                Les gjennom oppsummeringen før du sender inn og bekrefter
                opplysningene du har oppgitt. Hvis du trenger å gjøre endringer
                kan du gjøre det helt frem til du har fullført innsendingen
              </Ingress>
              <Label>Vi stoler på deg</Label>
              <BodyShort spacing>
                Dersom du med viten og vilje oppgir uriktige opplysninger, eller
                holder tilbake informasjon som kan ha betydning for utbetalinger
                fra NAV, kan dette medføre en politianmeldelse.
              </BodyShort>
              <Accordion className="spacer">
                <Accordion.Item renderContentWhenClosed={true}>
                  <Accordion.Header>Dine opplysninger</Accordion.Header>
                  <Accordion.Content>
                    <PersonOppsummering />
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item renderContentWhenClosed={true}>
                  <Accordion.Header>Om Ulykken</Accordion.Header>
                  <Accordion.Content>
                    <UlykkenOppsummering />
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item renderContentWhenClosed={true}>
                  <Accordion.Header>Vedlegg</Accordion.Header>
                  <Accordion.Content>
                    <VedleggOppsummering />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
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
                  onClick={handleSubmit}
                  data-test-id="send-inn"
                >
                  Fullfør
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

export default Oppsummering;
