export type MatchingProps = {
  matching: boolean;
  sentence?: string;
  onChange: (matching: boolean) => void;
  texts?: {
    matching: string;
    notMatching: string;
  };
};
