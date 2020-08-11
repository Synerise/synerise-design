export type OptionsDropdownProps = {
  options: React.ReactText[];
  visible: boolean;
  value: React.ReactText;
  onSelect: (value: React.ReactText) => void;
  onClick: () => void;
};
