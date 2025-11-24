import { type AnyObject } from '../../Search.types';
import { LIST_HEADER_HEIGHT } from '../../const';

export const getAllElementsFiltered = <T extends AnyObject>(
  data: T[] | undefined | null,
  value: string,
  elementTextLookupKey: keyof T,
): T[] => {
  return (
    (data &&
      data.filter((el) =>
        String(el[elementTextLookupKey])
          .toLowerCase()
          .includes(value.toLocaleLowerCase()),
      )) ||
    []
  );
};

export const hasSomeElementFiltered = <T extends AnyObject>(
  data: T[] | undefined | null,
  currentValue: string,
  elementTextLookupKey: keyof T,
): boolean => {
  return (
    (!!data &&
      data.some((el) =>
        String(el[elementTextLookupKey])
          .toLowerCase()
          .includes(currentValue.toLocaleLowerCase()),
      )) ||
    false
  );
};

export const hasSomeElement = (
  data: Record<string, unknown>[] | undefined,
): boolean => !!data && data.length > 0;

export const getParametersScrollTop = ({
  scrollTop,
  rowHeight,
  recent,
}: {
  scrollTop: number;
  rowHeight: number;
  recent: AnyObject[];
}): number =>
  scrollTop -
  LIST_HEADER_HEIGHT -
  (hasSomeElement(recent) ? recent.length * rowHeight : 0);
