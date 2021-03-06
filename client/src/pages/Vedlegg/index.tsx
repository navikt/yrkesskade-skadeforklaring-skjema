import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
} from '@navikt/ds-react';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Skadeforklaring } from '../../api/skadeforklaring/models/Skadeforklaring';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import VedleggSkjema from '../../components/form/VedleggSkjema';
import SystemHeader from '../../components/SystemHeader';
import { useCheckIfReloaded } from '../../core/hooks/reload-check.hooks';
import { useAppDispatch } from '../../core/hooks/state.hooks';
import { oppdaterSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';

const Vedlegg = () => {
  useCheckIfReloaded();
  const { handleSubmit } = useFormContext<Skadeforklaring>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = (data: Skadeforklaring) => {
    dispatch(oppdaterSkadeforklaring(data));
    navigate('/skadeforklaring/skjema/oppsummering');
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
                Vedlegg
              </Heading>
              <VedleggSkjema />
              <section className="button-section spacer button-group">
                <ExitButton />
                <Button
                  variant="primary"
                  onClick={handleSubmit(handleNext)}
                  data-test-id="neste-steg"
                >
                  Neste
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

export default Vedlegg;
