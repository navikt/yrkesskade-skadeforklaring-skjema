import { Attachment } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Label } from '@navikt/ds-react';
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

  return (
    <>
      <Digital skadeforklaring={skadeforklaring} />
      <div className="spacer"></div>
      <Label>Skal dokumenter ettersendes?</Label>
      <BodyLong>
        {skadeforklaring.skalEttersendeDokumentasjon === 'ja'
          ? 'Ja'
          : skadeforklaring.skalEttersendeDokumentasjon === 'nei'
          ? 'Nei'
          : 'Ferdig'}
      </BodyLong>
    </>
  );
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
