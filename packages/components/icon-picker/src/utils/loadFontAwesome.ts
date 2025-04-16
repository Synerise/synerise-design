export const loadFontAwesome = async () => {
  const core = import('@fortawesome/fontawesome-svg-core');
  const solid = import('@fortawesome/free-solid-svg-icons');
  const brands = import('@fortawesome/free-brands-svg-icons');
  const regular = import('@fortawesome/free-regular-svg-icons');
  const component = import('@fortawesome/react-fontawesome');
  const loaded = await Promise.all([core, solid, brands, regular, component]);
  const { library, icon } = loaded[0];
  const { fas } = loaded[1];
  const { fab } = loaded[2];
  const { far } = loaded[3];
  const { FontAwesomeIcon } = loaded[4];

  library.add(fas, fab, far);
  return {
    fas,
    icon,
    fab,
    far,
    FontAwesomeIcon,
  };
};
