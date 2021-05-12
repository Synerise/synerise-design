export const getEditorColor = (error: boolean) => {
  if(error)
    return 'red-100';
  return 'white';
}

export const getGutterColor = (focused: boolean, error: boolean) => {
  if(error)
    return 'red-200';
  if(focused)
    return 'blue-050';
  return 'grey-050';
}
