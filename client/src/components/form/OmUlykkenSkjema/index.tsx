import { Ingress, Textarea } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './OmUlykken.less';
import LegeOppsokt from './LegeOppsokt';
import Fravaertype from './FravaerType';
import { Skadeforklaring } from '../../../api/skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import Tid from './Tid';
import Ulykkesbeskrivelse from './Ulykkesbeskrivelse';

const OmUlykkenSkjema = () => {
  const { register } = useFormContext<Skadeforklaring>();
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
          maxLength={1000}
          minRows={5}
          value={arbeidsbeskrivelse}
          {...register('arbeidetMedIUlykkesoeyeblikket')}
          onChange={(e) => setArbeidsbeskrivelse(e.target.value)}
          data-test-id="ulykke-arbeidsbeskrivelse"
          className="ulykke-arbeidsbeskrivelse"
        />
      </div>

      <Ulykkesbeskrivelse className="spacer" />

      <Fravaertype className="spacer" />

      <LegeOppsokt className="spacer" />
    </>
  );
};

export default OmUlykkenSkjema;
