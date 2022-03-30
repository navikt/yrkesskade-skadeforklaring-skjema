import { Attachment } from '../../types/attachment';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import AttachmentInput from './AttachmentInput';
import { Label } from '@navikt/ds-react';
import { bytesString, getTotalFileSize } from '../../utils/filesize';
import AttachmentList from './AttachmentList';
import Block from '../Block';
import AlertstripeWithCloseButton from '../AlertstripeWithCloseButton';

export interface AttachmentOverviewProps {
  attachments: Attachment[];
  inputId?: string;
  showFileSize?: boolean;
  onFilesSelect: (files: Attachment[]) => void;
  onFileDelete: (files: Attachment[]) => void;
}

const AttachmentOverview = (props: AttachmentOverviewProps) => {
  const {
    inputId = 'input-id-guid',
    attachments,
    showFileSize,
    onFileDelete,
    onFilesSelect,
  } = props;

  const createErrorMessagesForFailedAttachments = (
    attachments: Attachment[]
  ): React.ReactNode[] => {
    const errorMessages: React.ReactNode[] = [];
    const attachmentsWithError = attachments.filter(isAttachmentWithError);
    const multipleErrors = attachmentsWithError.length > 1;

    attachmentsWithError.forEach((a: Attachment) => {
      const error = a.error;

      if (a.filesize === 0) {
        errorMessages.push(
          multipleErrors
            ? `Du kan ikke laste opp en tom fil: ${a.filename}`
            : 'Du kan ikke laste opp en tom fil'
        );
      } else if (error && error.status === 413) {
        errorMessages.push(
          multipleErrors
            ? `Vedlegg er for stort: ${a.filename}`
            : 'Vedlegg er for stort'
        );
      } else if (error && error.status === 422) {
        const passordBeskyttet = error.response.data.messages.includes(
          'AttachmentPasswordProtectedException'
        );
        const melding = passordBeskyttet
          ? 'Vedlegg er passordbeskyttet'
          : 'Vedlegg har virus';
        errorMessages.push(
          multipleErrors ? `${melding}: ${a.filename}` : melding
        );
      } else {
        errorMessages.push(
          multipleErrors ? `Noe gikk galt med: ${a.filename}` : 'Noe gikk galt'
        );
      }
    });
    return errorMessages;
  };

  const deleteFailedAttachments = (): void => {
    props.onFileDelete(props.attachments.filter(isAttachmentWithError));
  };

  const showErrorMessage: boolean = props.attachments.some(
    isAttachmentWithError
  );
  const attachmentsToRender = attachments.filter(
    (a: Attachment) => !isAttachmentWithError(a)
  );
  const showAttachments = attachmentsToRender.length > 0;

  return (
    <>
      <Block margin={showAttachments || showErrorMessage ? 'xs' : 'none'}>
        <AttachmentInput
          id={inputId}
          onFilesSelect={(files: File[]) => {
            onFilesSelect(files.map((f) => mapFileToAttachment(f)));
          }}
          onClick={deleteFailedAttachments}
        />
      </Block>
      <Block margin="xs" visible={showErrorMessage} animated={false}>
        <AlertstripeWithCloseButton
          errorMessages={createErrorMessagesForFailedAttachments(
            props.attachments.filter(isAttachmentWithError)
          )}
          onClose={deleteFailedAttachments}
        />
      </Block>
      <>
        {showAttachments && (
          <>
            <Block margin="xs">
              <Label>
                <span>
                  {bytesString(
                    getTotalFileSize(
                      attachmentsToRender
                        .filter((a: Attachment) => a.file)
                        .map((a: Attachment) => a.file)
                    )
                  )}
                </span>
              </Label>
            </Block>
            <AttachmentList
              attachments={attachmentsToRender}
              showFileSize={showFileSize}
              onDelete={(file: Attachment) => onFileDelete([file])}
            />
          </>
        )}
      </>
    </>
  );
};

export default AttachmentOverview;
