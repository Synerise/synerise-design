import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { injectIntl, IntlShape } from 'react-intl';
import * as S from './DescriptionRow.styles';
import Star from './Star';
import Copy from './Copy';

export interface DescriptionRowProps {
  intl: IntlShape;
  label: string | React.ReactNode;
  labelIcon?: React.ReactNode;
  value: React.ReactNode;
  prefixEl?: string | React.ReactNode;
  suffixEl?: string | React.ReactNode;
  copyValue?: string;
  starType?: 'active' | 'inactive';
  texts?: {
    copyTooltip?: string;
    copiedTooltip?: string;
  };
}

const DescriptionRow: React.FC<DescriptionRowProps> = ({
  intl,
  label,
  labelIcon,
  value,
  prefixEl,
  suffixEl,
  copyValue,
  starType,
  texts = {
    copiedTooltip: intl.formatMessage({ id: 'DS.DESCRIPTION.COPIED' }),
    copyTooltip: intl.formatMessage({ id: 'DS.DESCRIPTION.COPY-VALUE' }),
  },
}) => {
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);
  const [tooltipTitle, setTooltipTitle] = React.useState(texts.copyTooltip);

  const handleCopy = React.useCallback(() => {
    if (copyValue && copy(copyValue)) {
      setTooltipTitle(texts.copiedTooltip);
      setTooltipVisible(true);
    }
  }, [copyValue, setTooltipTitle, setTooltipVisible, texts.copiedTooltip]);

  const handleMouseEnter = React.useCallback(() => {
    setTooltipVisible(true);
    setTooltipTitle(texts.copyTooltip);
  }, [setTooltipTitle, setTooltipVisible, texts.copyTooltip]);

  const handleMouseLeave = React.useCallback(() => {
    setTooltipVisible(false);
  }, [setTooltipVisible]);

  return (
    <S.RowWrapper copyable={Boolean(copyValue)}>
      <S.RowLabel className="ds-description-label">
        {labelIcon}
        <S.Label title={typeof label === 'string' ? label : undefined}>{label}</S.Label>
      </S.RowLabel>
      <S.RowValue
        copyable={typeof copyValue === 'string'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCopy}
      >
        {starType !== undefined && <Star starType={starType} hasPrefixEl={Boolean(prefixEl)} />}
        {prefixEl && <S.PrefixWrapper className="ds-description-prefix">{prefixEl}</S.PrefixWrapper>}
        {value && (
          <S.ValueWrapper className="ds-description-value" title={typeof value === 'string' ? value : undefined}>
            {value}
          </S.ValueWrapper>
        )}
        {suffixEl && <S.SuffixWrapper className="ds-description-suffix">{suffixEl}</S.SuffixWrapper>}
        {typeof copyValue === 'string' && (
          <Copy tooltipVisible={tooltipVisible} tooltipTitle={tooltipTitle as string} {...texts} />
        )}
      </S.RowValue>
    </S.RowWrapper>
  );
};

export default injectIntl(DescriptionRow);
