import { Attachment } from '../../types/attachment';
import './attachment.less';
import AttachmentListElement from './AttachmentListElement';

interface Props {
  attachments: Attachment[];
  showFileSize?: boolean;
  onDelete?: (file: Attachment) => void;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
  const { attachments, onDelete } = props;
  return (
    <ul className="attachmentList">
      {attachments.map((attachment, index) => (
        <li key={index}>
          <AttachmentListElement
            attachment={attachment}
            onDelete={onDelete}
            showFileSize={true}
          />
        </li>
      ))}
    </ul>
  );
};
export default AttachmentList;
