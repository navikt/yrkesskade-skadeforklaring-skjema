import { Attachment } from '../../types/attachment';
import AttachmentOverview from './AttachmentOverview';

export interface AttachmentsUploaderProps {
  attachments: Attachment[];
  onFilesSelect: (attachments: Attachment[]) => void;
  onFileDelete: (attachment: Attachment[]) => void;
}

const AttachmentUploader = (props: AttachmentsUploaderProps) => {
  const { attachments, onFilesSelect, onFileDelete } = props;
  return (
    <AttachmentOverview
      attachments={attachments}
      onFilesSelect={onFilesSelect}
      onFileDelete={onFileDelete}
    />
  );
};

export default AttachmentUploader;
