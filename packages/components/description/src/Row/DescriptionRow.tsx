import * as React from 'react';
import * as S from './DescriptionRow.styles';
import Star from './Star';
import Copy from './Copy';

export interface DescriptionRowProps {
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
  label,
  labelIcon,
  value,
  prefixEl,
  suffixEl,
  copyValue,
  starType,
  texts,
}) => {
  return (
    <S.RowWrapper copyable={Boolean(copyValue)}>
      <S.RowLabel className="ds-description-label">
        {labelIcon}
        <S.Label title={typeof label === 'string' ? label : undefined}>{label}</S.Label>
      </S.RowLabel>
      <S.RowValue>
        {starType !== undefined && <Star starType={starType} hasPrefixEl={Boolean(prefixEl)} />}
        {prefixEl && <S.PrefixWrapper className="ds-description-prefix">{prefixEl}</S.PrefixWrapper>}
        {value && (
          <S.ValueWrapper className="ds-description-value" title={typeof value === 'string' ? value : undefined}>
            {value}
          </S.ValueWrapper>
        )}
        {suffixEl && <S.SuffixWrapper className="ds-description-suffix">{suffixEl}</S.SuffixWrapper>}
        {typeof copyValue === 'string' && <Copy copyValue={copyValue} {...texts} />}
      </S.RowValue>
    </S.RowWrapper>
  );
};

export default DescriptionRow;
