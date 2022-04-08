import { Label, Textarea } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skadeforklaring } from '../../../../api/skadeforklaring';
import { useAppSelector } from '../../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../../core/reducers/skadeforklaring.reducer';

const Ulykkesbeskrivelse: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { register } = useFormContext<Skadeforklaring>();
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const [ulykkebeskrivelse, setUlykkesbeskrivelse] = useState<string>(
    skadeforklaring.ulykkesbeskrivelse || ''
  );

  return (
    <div className={`skade-ulykkesbeskrivelse ${props.className}`}>
      <Label>Gi en så nøyaktig beskrivelse av hendelsen som mulig</Label>
      <div className="spacer">
        <ul>
          <li>Har du fått spørsmål fra saksbehandler, så svar på disse</li>
          <li>Beskriv hendelsesforløpet</li>
          <li>Beskriv spesielle omstendigheter</li>
          <li>Beskriv avvik fra normale arbeidsoppgaver</li>
          <li>Situasjon om skadelig påvirkning av stoffer</li>
        </ul>
      </div>
      <Textarea
        label="Gi en så nøyaktig beskrivelse av hendelsen som mulig"
        hideLabel={true}
        maxLength={2000}
        minRows={10}
        value={ulykkebeskrivelse}
        {...register('ulykkesbeskrivelse')}
        onChange={(e) => setUlykkesbeskrivelse(e.target.value)}
        data-test-id="ulykke-ulykkesbeskrivelse"
        className="ulykke-ulykkesbeskrivelse"
      />
    </div>
  );
};

export default Ulykkesbeskrivelse;
