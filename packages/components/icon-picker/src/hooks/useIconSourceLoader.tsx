import React, { useCallback, useState } from 'react';
import Icon, { medium } from '@synerise/ds-icon';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { SourceType, FilterElement, ValueTypeForSource } from '../IconPicker.types';
import { isDSSourceType, isFASourceType } from '../utils/typeguards.utils';
import { loadFontAwesome } from '../utils/loadFontAwesome';
import { prepareItems } from '../utils/prepareItems';

export const useIconSourceLoader = <Source extends SourceType>(
  data: SourceType
): FilterElement<ValueTypeForSource<Source>>[] => {
  const [items, setItems] = useState<FilterElement<ValueTypeForSource<Source>>[]>([]);

  const loadedItems = useCallback(() => {
    if (!items.length) {
      const loadFAIcons = async () => {
        const { fas, fab, far, icon, FontAwesomeIcon } = await loadFontAwesome();

        setItems([
          {
            category: 'Solid',
            items: Object.values(fas).map((iconData: IconDefinition) => ({
              keywords: iconData.iconName,
              item: <FontAwesomeIcon icon={icon(iconData)} key={iconData.iconName} />,
              value: [iconData.prefix, iconData.iconName],
            })),
          },
          {
            category: 'Brands',
            items: Object.values(fab).map((iconData: IconDefinition) => ({
              keywords: iconData.iconName,
              item: <FontAwesomeIcon icon={icon(iconData)} key={iconData.iconName} />,
              value: [iconData.prefix, iconData.iconName],
            })),
          },
          {
            category: 'Regular',
            items: Object.values(far).map((iconData: IconDefinition) => ({
              keywords: iconData.iconName,
              item: <FontAwesomeIcon icon={icon(iconData)} key={iconData.iconName} />,
              value: [iconData.prefix, iconData.iconName],
            })),
          },
        ]);
      };

      if (isDSSourceType(data)) {
        const iconItems = Object.entries(medium).map(([name, Component]) => ({
          keywords: name,
          item: <Icon component={<Component />} />,
          value: (<Icon component={<Component />} />) as ValueTypeForSource<Source>,
        }));
        setItems([
          {
            category: 'DS Icons',
            items: iconItems,
          },
        ]);
        return;
      }
      if (isFASourceType(data)) {
        loadFAIcons();
        return;
      }
      setItems(prepareItems(data) as FilterElement<ValueTypeForSource<Source>>[]);
    }
  }, [data, items.length]);

  loadedItems();

  return items;
};
