export type WatcherParent = HTMLElement & { sizeWatcher?: HTMLIFrameElement };
export type ResizeCallback = (width: number, height: number) => void;

export default (
  element: WatcherParent,
  resizeCallback: ResizeCallback,
  width = true,
  height = true
): number[] | false => {
  const customElement: WatcherParent = element;
  if (customElement.sizeWatcher) return false;
  if (
    !customElement.style.position ||
    (customElement.style.position !== 'absolute' && customElement.style.position !== 'relative')
  ) {
    throw new Error('Element needs to have explicit absolute or relative positioning to support size watcher');
  }
  const watcher = document.createElement('iframe');
  document.body.appendChild(watcher);
  Object.assign(watcher.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: width ? '100%' : '0',
    height: height ? '100%' : '0',
    pointerEvents: 'none',
    visibility: 'hidden',
    border: 'none',
    margin: '0',
    padding: '0',
  });
  customElement.appendChild(watcher);
  customElement.sizeWatcher = watcher;
  const content = watcher.contentWindow;
  if (content) {
    content.addEventListener('resize', (event: Event) =>
      resizeCallback((event.target as Window).innerWidth, (event.target as Window).innerHeight)
    );
    return [content.innerWidth, content.innerHeight];
  }
  return false;
};
