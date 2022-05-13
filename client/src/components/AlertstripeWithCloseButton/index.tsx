import { Close } from '@navikt/ds-icons';
import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import './AlertstripeWithCloseButton.less';
import { v4 as uuid } from 'uuid';
interface AlertstripeContentProps {
  onClose?: () => void;
  errorMessages: React.ReactNode[];
}

const AlertstripeWithCloseButton = ({
  onClose,
  errorMessages,
}: AlertstripeContentProps) => {
  return (
    <Alert variant="error" fullWidth className="attachment-alert">
      <div className="alertStripeContent">
        {errorMessages.length === 1 && (
          <BodyShort>{errorMessages[0]}</BodyShort>
        )}
        {errorMessages.length > 1 && (
          <div className="error-list">
            <Heading spacing size="small" level="2">
              Flere feil
            </Heading>
            <BodyLong>
              <ul>
                {errorMessages.map((message: React.ReactNode) => (
                  <li className="error-list-element" key={uuid()}>
                    <BodyShort>{message}</BodyShort>
                  </li>
                ))}
              </ul>
            </BodyLong>
          </div>
        )}
        {onClose && (
          <span className="lukk-knapp" onClick={onClose}>
            <Close />
          </span>
        )}
      </div>
    </Alert>
  );
};
export default AlertstripeWithCloseButton;
