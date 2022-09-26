/* eslint-disable react-hooks/exhaustive-deps */

import { TextField, Button, Table } from '@navikt/ds-react';
import { AddCircle, MinusCircle } from '@navikt/ds-icons';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../core/hooks/state.hooks';
import { fjernInstitusjon } from '../../core/reducers/skadeforklaring.reducer';
import { isEmpty, remove } from 'ramda';
import { Helseinstitusjon } from '../../api/skadeforklaring';

interface IProps {
  helseinstitusjoner: Helseinstitusjon[] | [];
  onInstutisjonChange: (instutisjoner: Helseinstitusjon[]) => void;
}

const BehandlerNavn = ({ helseinstitusjoner, onInstutisjonChange }: IProps) => {
  const [instutisjon, setInstutisjon] = useState<string | undefined>();
  const [nameForTable, setNameForTable] = useState<Helseinstitusjon[]>([]);

  const dispatch = useAppDispatch();

  const handleMultipleName = () => {
    if (!isEmpty(instutisjon) && typeof instutisjon !== undefined) {
      setNameForTable([
        ...nameForTable,
        { navn: instutisjon } as Helseinstitusjon,
      ]);
      setInstutisjon('');
    } else {
      return;
    }
  };
  const removeName = (index: number) => {
    const instutisjon = nameForTable[index];
    const newInstitusjon = remove(index, 1, nameForTable);
    dispatch(fjernInstitusjon(instutisjon));
    setNameForTable(newInstitusjon);
  };
  useEffect(() => {
    if (helseinstitusjoner && helseinstitusjoner.length > 0) {
      const institusjoner = helseinstitusjoner;
      const institusjon = institusjoner[institusjoner.length - 1];
      const resten = remove(institusjoner.length - 1, 1, institusjoner);
      setInstutisjon(institusjon.navn);
      setNameForTable(resten);
    }
  }, []);

  useEffect(() => {
    if (instutisjon) {
      onInstutisjonChange([...nameForTable, { navn: instutisjon }]);
    } else {
      onInstutisjonChange(nameForTable);
    }
  }, [nameForTable, setNameForTable]);

  useEffect(() => {
    if (instutisjon) {
      onInstutisjonChange([...nameForTable, { navn: instutisjon }]);
    }
  }, [instutisjon]);

  return (
    <>
      <TextField
        className="spacer"
        label="Hvor har du blitt behandlet? (valgfritt)"
        description="Oppsøkt tannlege, legekontor, fysioterapaut osv."
        value={instutisjon || ''}
        onChange={(e) => setInstutisjon(e.target.value)}
        data-test-id="lege-helseinstitusjon-navn"
      />
      <Button
        variant="tertiary"
        onClick={handleMultipleName}
        data-test-id="add-lege-button"
      >
        <AddCircle />
        Legg til flere behandlere
      </Button>
      {nameForTable && nameForTable.length > 0 && (
        <Table className="spacer">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Behandler</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {nameForTable.map(
              (instutisjon: Helseinstitusjon, index: number) => {
                return (
                  <Table.Row key={index} data-testid="instutisjon-rad">
                    <Table.DataCell>{instutisjon.navn}</Table.DataCell>
                    <Table.DataCell>
                      <Button
                        variant="tertiary"
                        data-testid="lege-tabell-fjern"
                        onClick={() => removeName(index)}
                      >
                        <MinusCircle />
                      </Button>
                    </Table.DataCell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default BehandlerNavn;
