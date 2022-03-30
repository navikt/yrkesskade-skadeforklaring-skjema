import { BodyShort } from '@navikt/ds-react';
import { Skadeforklaring } from '../../../api/skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';

const VedleggOppsummering = () => {
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );

  const presenterOppsummering = (): JSX.Element => {
    switch (skadeforklaring.vedleggtype) {
      case 'digital':
        return <Digital skadeforklaring={skadeforklaring} />;
      case 'papir':
        return <Papir />;
      default:
        return <BodyShort>Ingen vedlegg</BodyShort>;
    }
  };

  return presenterOppsummering();
};

const Papir = () => {
  return <BodyShort>Du har valgt å sende inn vedlegg per post</BodyShort>;
};

interface DigitalVedleggProps {
  skadeforklaring: Skadeforklaring;
}
const Digital = (props: DigitalVedleggProps) => {
  return <div>En tabell med vedlegg</div>;
};

export default VedleggOppsummering;
