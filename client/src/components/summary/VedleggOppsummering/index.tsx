import { Attachment } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';
import {
  Skadeforklaring,
  Vedleggreferanse,
} from '../../../api/skadeforklaring';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkadeforklaring } from '../../../core/reducers/skadeforklaring.reducer';
import './VedleggOppsummering.less';

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
  return (
    <>
      <BodyShort spacing>Du har lastet opp disse vedleggene</BodyShort>
      {props.skadeforklaring.vedleggreferanser?.map((vedleggreferanse) => (
        <VedleggreferanseVisning
          key={vedleggreferanse.id}
          vedlegg={vedleggreferanse}
        />
      ))}
    </>
  );
};

interface VedleggreferanseProps {
  vedlegg: Vedleggreferanse;
}
const VedleggreferanseVisning: React.FC<
  VedleggreferanseProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return (
    <div className="oppsummering-vedleggreferanse-item">
      <Attachment className="icon" />
      <span>{props.vedlegg.navn}</span>
    </div>
  );
};

export default VedleggOppsummering;
