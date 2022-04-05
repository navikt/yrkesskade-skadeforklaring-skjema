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

const OmUlykkenSkjema = () => {
  const { register } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const [arbeidsbeskrivelse, setArbeidsbeskrivelse] = useState<string>(
    skadeforklaring.arbeidsbeskrivelse || ''
  );
  const [ulykkebeskrivelse, setUlykkesbeskrivelse] = useState<string>(
    skadeforklaring.ulykkesbeskrivelse || ''
  );

  return (
    <>
      <Ingress spacing>
        Basert på opplysningene som allerede er gitt i skademeldingen trenger vi
        mer informasjon om hendelsen
      </Ingress>

      <Tid />

      <Textarea
        label="Hva arbeidet du med i ulykkesøyeblikket?"
        maxLength={1000}
        value={arbeidsbeskrivelse}
        {...register('arbeidsbeskrivelse')}
        onChange={(e) => setArbeidsbeskrivelse(e.target.value)}
        data-test-id="ulykke-arbeidsbeskrivelse"
        className="ulykke-arbeidsbeskrivelse"
      />

      <Textarea
        label="Gi en så nøyaktig beskrivelse av hendelsen som mulig"
        maxLength={2000}
        value={ulykkebeskrivelse}
        {...register('ulykkesbeskrivelse')}
        onChange={(e) => setUlykkesbeskrivelse(e.target.value)}
        data-test-id="ulykke-ulykkesbeskrivelse"
        className="ulykke-ulykkesbeskrivelse"
      />

      <Fravaertype />

      <LegeOppsokt />
    </>
  );
};

export default OmUlykkenSkjema;
