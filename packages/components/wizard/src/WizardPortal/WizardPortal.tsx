import * as React from 'react';
import * as ReactDOM from 'react-dom';

const getPortalRoot = (): HTMLElement => {
  const target = document.getElementById('ds-portal-root');
  if (!target) {
    const newTarget = document.createElement('div');
    newTarget.id = 'ds-portal-root';
    document.body.appendChild(newTarget);

    return newTarget;
  }
  return target;
};

class WizardPortal extends React.Component {
  private modalRoot: HTMLElement;
  private readonly el: HTMLDivElement;
  constructor(props: Readonly<Record<string, unknown>>) {
    super(props);
    this.modalRoot = getPortalRoot();
    this.el = document.createElement('div');
  }

  componentDidMount(): void {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount(): void {
    this.modalRoot.removeChild(this.el);
  }

  render(): React.ReactPortal {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default WizardPortal;
