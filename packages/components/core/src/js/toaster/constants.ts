import { type ToasterProps } from './Toaster.types';

export const TOASTER_DEFAULTS: ToasterProps = {
  position: 'bottom-left',
  reverseOrder: false,
  toastOptions: {
    removeDelay: 200,
  },
  gutter: 8,
  containerStyle: {
    padding: '24px',
  },
};
