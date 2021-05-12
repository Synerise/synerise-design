export const getEditorColor = (error: boolean): string => {
  if(error)
    return 'red-100';
  return 'white';
}

export const getGutterColor = (focused: boolean, error: boolean): string => {
  if(error)
    return 'red-200';
  if(focused)
    return 'blue-050';
  return 'grey-050';
}
