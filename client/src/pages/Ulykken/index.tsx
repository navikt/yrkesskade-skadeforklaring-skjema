import {
  ContentContainer,
  Grid,
  Cell,
  Heading,
  Button,
} from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import { useFormContext } from 'react-hook-form';
import OmUlykkenSkjema from '../../components/form/OmUlykkenSkjema';
import SystemHeader from '../../components/SystemHeader';
import 'react-day-picker/lib/style.css';
import { oppdaterSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';
import { useDispatch } from 'react-redux';
import { Skadeforklaring } from '../../api/skadeforklaring';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import { useCheckIfReloaded } from '../../core/hooks/reload-check.hooks';

const Ulykken = () => {
  useCheckIfReloaded();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useFormContext<Skadeforklaring>();

  const handleNext = (data: Skadeforklaring) => {
    console.log(data);
    dispatch(oppdaterSkadeforklaring(data));
    navigate('/skadeforklaring/skjema/vedlegg');
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
                Om ulykken
              </Heading>
              <OmUlykkenSkjema />
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

export default Ulykken;
