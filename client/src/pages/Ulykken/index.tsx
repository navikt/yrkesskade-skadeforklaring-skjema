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
import { useCancel } from '../../core/hooks/cancel.hooks';

const Ulykken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancel = useCancel();
  const { handleSubmit } = useFormContext<Skadeforklaring>();

  const handleNext = (data: Skadeforklaring) => {
    dispatch(oppdaterSkadeforklaring(data));
    navigate('/skjema/vedlegg');
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
                Om ulykken
              </Heading>
              <OmUlykkenSkjema />
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
                  onClick={handleSubmit(handleNext)}
                  data-test-id="neste-steg"
                >
                  Neste
                </Button>
              </section>
            </div>
          </div>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default Ulykken;
