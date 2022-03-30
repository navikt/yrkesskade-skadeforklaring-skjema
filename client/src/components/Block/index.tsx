import './Block.less';
import { Heading } from '@navikt/ds-react';

export type BlockPadding = 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
  /** Default true */
  header?: {
    title: string;
    info?: string;
    tag?: string;
    apneLabel?: string;
  };
  visible?: boolean;
  /** Animation is set to default true if visible is !undefined, unless animated is set to false */
  animated?: boolean;
  /** Size - default m */
  margin?: BlockPadding;
  /** If Block contains child Block. If so, it disables animation */
  hasChildBlocks?: boolean;
  /** content */
  children: React.ReactNode;
  screenOnly?: boolean;
}

const Block: React.FunctionComponent<BlockProps> = ({
  visible,
  margin = 'm',
  header,
  animated = true,
  children,
  hasChildBlocks,
  screenOnly,
}) => {
  if (children === undefined || (animated !== true && visible === false)) {
    return null;
  }

  const content =
    header !== undefined ? (
      <section className="block">
        <Heading size="large" level="3">
          {header.title}
        </Heading>
        {children}
      </section>
    ) : (
      <div className="block">{children}</div>
    );
  return visible === true || visible === undefined ? content : null;
};

export default Block;
