import { Ingress, Textarea } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './OmUlykken.less';
import Helseinstitusjon from './Helseinstitusjon';
import Fravaertype from './FravaerType';
import { Skadeforklaring } from '../../../api/skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import Tid from './Tid';
import Ulykkesbeskrivelse from './Ulykkesbeskrivelse';

const OmUlykkenSkjema = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const [arbeidsbeskrivelse, setArbeidsbeskrivelse] = useState<string>(
    skadeforklaring.arbeidetMedIUlykkesoeyeblikket || ''
  );

  return (
    <>
      <Ingress spacing>
        Basert på opplysningene som allerede er gitt i skademeldingen trenger vi
        mer informasjon om hendelsen
      </Ingress>

      <Tid className="spacer" />

      <div className="spacer">
        <Textarea
          label="Hva arbeidet du med i ulykkesøyeblikket?"
          maxLength={2000}
          minRows={5}
          value={arbeidsbeskrivelse}
          {...register('arbeidetMedIUlykkesoeyeblikket', {
            required: {
              value: true,
              message: 'Dette feltet er påkrevd',
            },
            maxLength: {
              value: 2000,
              message: 'Maks 2000 tegn',
            },
          })}
          onChange={(e) => setArbeidsbeskrivelse(e.target.value)}
          data-test-id="ulykke-arbeidsbeskrivelse"
          className="ulykke-arbeidsbeskrivelse"
          error={
            errors?.arbeidetMedIUlykkesoeyeblikket &&
            errors?.arbeidetMedIUlykkesoeyeblikket.message
          }
        />
      </div>

      <Ulykkesbeskrivelse className="spacer" />

      <Fravaertype className="spacer" />

      <Helseinstitusjon className="spacer" />
    </>
  );
};

export default OmUlykkenSkjema;
