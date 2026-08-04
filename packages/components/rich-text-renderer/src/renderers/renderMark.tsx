import React, { type ReactNode } from 'react';

import { type Mark, sanitizeUrl } from '@synerise/ds-rich-text';

export const renderMark = (
  mark: Mark,
  children: ReactNode,
  key: number,
): ReactNode => {
  switch (mark.type) {
    case 'bold':
      return <strong key={key}>{children}</strong>;
    case 'italic':
      return <em key={key}>{children}</em>;
    case 'underline':
      return <u key={key}>{children}</u>;
    case 'strike':
      return <s key={key}>{children}</s>;
    case 'code':
      return <code key={key}>{children}</code>;
    case 'link': {
      // Documents may come from any source; drop unsafe (javascript:/data:/…)
      // hrefs so a stored payload can't execute on click. React does not block
      // these at runtime, so the guard must live here.
      const safeHref = sanitizeUrl(mark.href);
      return (
        <a
          key={key}
          href={safeHref || undefined}
          target={mark.target || '_blank'}
          rel={mark.rel || 'noopener noreferrer'}
        >
          {children}
        </a>
      );
    }
  }
};
