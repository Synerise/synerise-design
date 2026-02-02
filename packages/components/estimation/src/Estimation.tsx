import React from 'react';

import { FormFieldLabel } from '@synerise/ds-form-field';
import InlineAlert from '@synerise/ds-inline-alert';

import * as S from './Estimation.styles';
import type { EstimationProps } from './Estimation.types';
import { EstimationCalculatedDate } from './components/EstimationCalculated';
import { EstimationProgressBar } from './components/EstimationProgressBar';
import { EstimationProgressBarSkeleton } from './components/EstimationProgressBarSkeleton';
import { useDefaultTexts } from './hooks/useDefaultTexts';

const Estimation = ({
  value,
  tooltip,
  tooltipConfig,
  label,
  total,
  footerButtons,
  isLoading,
  progressBarValues,
  errorMessage,
  texts: customTexts,
  calculatedDate,
  ...rest
}: EstimationProps) => {
  const texts = useDefaultTexts(customTexts);

  const footerLeftSide = errorMessage ? (
    <InlineAlert type="alert" message={errorMessage} />
  ) : isLoading ? (
    texts.loading
  ) : (
    <EstimationCalculatedDate
      label={texts.calculated}
      calculatedDate={calculatedDate}
    />
  );

  const loadingParts = typeof isLoading === 'object' ? isLoading : undefined;

  const showTotalSkeleton = loadingParts?.total;
  const showProgressBarSkeleton = loadingParts?.progressBar;

  const shouldRenderTotal =
    total !== undefined && (!isLoading || showTotalSkeleton);

  const shouldRenderFooterLeftSide = Boolean(
    isLoading || errorMessage || calculatedDate,
  );

  return (
    <S.EstimationWrapper isLoading={!!isLoading} {...rest}>
      {label && (
        <FormFieldLabel
          label={label}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
        />
      )}
      <S.EstimationContent p={16} pb={12}>
        <S.EstimationHead>
          <S.EstimationLeftSide>
            {isLoading ? (
              <S.Skeleton
                numberOfSkeletons={1}
                size="L"
                width="L"
                height={28}
              />
            ) : (
              <S.EstimationTitle level={1}>{value}</S.EstimationTitle>
            )}
          </S.EstimationLeftSide>

          {shouldRenderTotal && (
            <S.EstimationRightSide>
              {showTotalSkeleton ? (
                <S.Skeleton
                  numberOfSkeletons={1}
                  size="L"
                  width="L"
                  height={18}
                />
              ) : (
                total
              )}
            </S.EstimationRightSide>
          )}
        </S.EstimationHead>
        <S.EstimationBody>
          {showProgressBarSkeleton ? (
            <EstimationProgressBarSkeleton />
          ) : (
            progressBarValues?.length &&
            !isLoading && <EstimationProgressBar values={progressBarValues} />
          )}
        </S.EstimationBody>
        {(footerButtons || shouldRenderFooterLeftSide) && (
          <>
            <S.EstimationDivider dashed />
            <S.EstimationFooter data-testid="estimation-footer">
              <S.EstimationCalculated>{footerLeftSide}</S.EstimationCalculated>
              {footerButtons && (
                <S.EstimationRightSide>{footerButtons}</S.EstimationRightSide>
              )}
            </S.EstimationFooter>
          </>
        )}
      </S.EstimationContent>
    </S.EstimationWrapper>
  );
};
export default Estimation;
