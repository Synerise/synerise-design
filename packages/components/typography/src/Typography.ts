import { Paragraph } from './Paragraph';
import { Text } from './Text';
import Title from './Title';

/**
 * DS-native replacement for antd's `Typography` namespace (the former default export).
 * `Title` / `Text` / `Paragraph` are the DS-implemented components — no antd, no duplication.
 * antd-only members (`Link`, `copyable`, `editable`, …) are intentionally dropped: a repo-wide
 * audit found zero usages across portal-ui-bridge, portal-next and universal-list.
 */
const Typography = {
  Title,
  Text,
  Paragraph,
};

export default Typography;
