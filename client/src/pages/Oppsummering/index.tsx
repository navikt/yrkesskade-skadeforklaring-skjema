import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
  Accordion,
  Ingress,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import { SkadeforklaringApiService } from '../../api/skadeforklaring/services/SkadeforklaringApiService';
import UlykkenOppsummering from '../../components/summary/UlykkenOppsummering';
import VedleggOppsummering from '../../components/summary/VedleggOppsummering';
import SystemHeader from '../../components/SystemHeader';
import { useCancel } from '../../core/hooks/cancel.hooks';
import { useAppSelector } from '../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';

const Oppsummering = () => {
  const navigate = useNavigate();
  const cancel = useCancel();

  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const handleSubmit = async () => {
    try {
      await SkadeforklaringApiService.postSkadeforklaring(skadeforklaring);
      navigate('/skjema/kvittering');
    } catch (e: any) {
      navigate('/feilmelding', { state: e.body });
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
              <Heading size="2xlarge" spacing data-number="2">
                Oppsummering
              </Heading>
              <Ingress spacing>
                Les gjennom oppsummeringen før du sender inn og bekrefter
                opplysningene du har oppgitt. Hvis du trenger å gjøre endringer
                kan du gjøre det helt frem til du har fullført innsendingen
              </Ingress>
              <Accordion className="spacer">
                <Accordion.Item renderContentWhenClosed={true}>
                  <Accordion.Header>Dine opplysninger</Accordion.Header>
                  <Accordion.Content>
                    <div>Opplysninger om deg</div>
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
      </Grid>
    </ContentContainer>
  );
};

export default Oppsummering;
