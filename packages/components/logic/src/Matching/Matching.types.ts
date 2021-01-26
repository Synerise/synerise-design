export type MatchingTexts = {
  matching: string;
  notMatching: string;
};

export type MatchingProps = {
  matching: boolean;
  sentence?: string;
  onChange: (matching: boolean) => void;
  texts?: MatchingTexts;
};
