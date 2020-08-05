export type MultivalueProps = {
  values: ProgressValue [];
}

export type ProgressValue = {
  percent: number;
  color: string;
  amount?: number;

}