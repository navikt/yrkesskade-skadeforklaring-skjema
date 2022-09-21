import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  BodyLong,
  BodyShort,
} from '@navikt/ds-react';
import BackButton from '../../components/BackButton';
import { useNavigate } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { StepIndicator } from '@navikt/yrkesskade-stepindicator';
import { People } from '@navikt/ds-icons';
import './Veiledning.less';
import ExitButton from '../../components/ExitButton';
import { selectBruker } from '../../core/reducers/bruker.reducer';
import { selectSkadeforklaring } from '../../core/reducers/skadeforklaring.reducer';
import { useCheckIfReloaded } from '../../core/hooks/reload-check.hooks';
import { useAppSelector } from '../../core/hooks/state.hooks';

const Veiledning = () => {
  useCheckIfReloaded();
  const navigate = useNavigate();
  const bruker = useAppSelector((state) => selectBruker(state));
  const skadeforklaring = useAppSelector((state) =>
    selectSkadeforklaring(state)
  );
  const skadelidt = skadeforklaring?.skadelidt?.norskIdentitetsnummer;

  const valgtSkadelidt =
    skadelidt === bruker?.brukerinfo?.identifikator
      ? { ...bruker.brukerinfo, beskrivelse: 'Deg selv' }
      : {
          ...bruker.brukerinfo?.foreldreansvar.find(
            (barn: any) => barn.identifikator === skadelidt
          ),
          beskrivelse: 'Barn',
        };

  const handleNext = () => {
    navigate('/skadeforklaring/skjema/ulykken');
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
              <Heading size="2xlarge" spacing data-number="1">
                Velkommen til skadeforklaring ved arbeidsulykke
              </Heading>
              <BodyLong spacing>
                Under ser du hvem du er i ferd med å sende inn på vegne av.
              </BodyLong>

              <div className="person-container spacer">
                <People />
                <div className="texts">
                  <Heading size="small">{valgtSkadelidt?.navn}</Heading>
                  <BodyShort>{valgtSkadelidt?.beskrivelse}</BodyShort>
                </div>
              </div>
              <Heading size="large" spacing>
                For deg som skal sende inn skadeforklaring
              </Heading>
              <BodyLong spacing>
                I dette skjemaet kan du gi flere opplysninger om en innmeldt
                yrkesskade. Opplysningene som oppgis skal være riktige og
                relevante, slik at NAV kan behandle saken så effektivt som
                mulig. Du skal kun oppgi opplysninger om deg selv,
                personopplysninger om andre anses ikke relevante for saken.
                Opplysningene skal bidra til å beskrive fakta om hendelsen og
                hvilken type skade du er blitt påført.
              </BodyLong>
              <BodyLong spacing>
                Har du fått konkrete spørsmål fra NAV i forbindelse med en
                innmeldt yrkesskade, kan du benytte skadeforklaringsskjemaet til
                å besvare disse.
              </BodyLong>
              <BodyLong spacing>
                Det presiseres at en skadeforklaring ikke erstatter
                skademeldingen, men kan benyttes for å gi flere opplysninger om
                en hendelse.
              </BodyLong>

              <Heading size="large" spacing>
                Vi vil hente informasjon om deg
              </Heading>
              <BodyLong spacing>
                NAV henter opplysninger om barn du har foreldreansvar for og din
                bostedsadresse fra folkeregisteret. Det er i tråd med
                regjeringens digitaliseringsstrategi å bruke data fra nasjonale
                komponenter slik at du slipper å fylle inn opplysninger som vi
                allerede har om deg.
              </BodyLong>
              <BodyLong spacing>
                Informasjonen som samles inn, vil bli brukt i behandlingen av
                yrkesskade eller yrkessykdomssaken din. Søker du om andre
                ytelser fra NAV hvor yrkesskaden eller yrkessykdommen din kan ha
                betydning vil opplysningene også kunne bli brukt i forbindelse
                med behandling av disse sakene.
              </BodyLong>
              <BodyLong spacing>
                Statistisk sentralbyrå og tilsynsmyndigheter kan benytte data om
                yrkesskader til analyse og statistikkformål.
              </BodyLong>
              <BodyLong spacing>
                Husk å logge av når du er ferdig med registreringen.
              </BodyLong>

              <Heading size="small">Kontakt</Heading>
              <BodyLong spacing>
                Oppdager du problemer eller har spørsmål kan du ta kontakt på:
                55 55 33 33
              </BodyLong>

              <section className="button-section spacer button-group">
                <ExitButton />
                <Button
                  variant="primary"
                  onClick={handleNext}
                  data-test-id="neste-steg"
                >
                  Start utfylling
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

export default Veiledning;
