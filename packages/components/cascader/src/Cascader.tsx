import * as React from 'react';
import { CascaderProps, CascaderState } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import onClickOutside from 'react-onclickoutside';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
import Icon from '@synerise/ds-icon';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import BackAction from './Elements/BackAction/BackAction';
import Divider from './Elements/Divider/Divider';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths } from './utlis';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP=(): void=>{};

class Cascader extends React.PureComponent<CascaderProps, CascaderState> {
  static InputWrapper = S.InputWrapper;
  static Dropdown = S.Dropdown;
  static Wrapper = S.Wrapper;
  static Divider: typeof Divider = Divider;

  constructor(props: CascaderProps) {
    super(props);
    const { categories } = this.props;
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      searchQuery: '',
      activeCategory: categories,
      paths: [],
    };
  }

  componentDidMount(): void {
    const { categories } = this.props;
    this.setState({ paths: getAllPaths(categories) });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClickOutside = (): void => {

  };

  render(): React.ReactNode {
    const { itemsTitle, itemsTooltip, disabled } = this.props;
    const {
      searchQuery,
      activeCategory,
      paths,
    } = this.state;
    return (
      <S.Wrapper
        className="ds-cascader"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => focusWithArrowKeys(e, 'ds-menu-item', NOOP)}
      >
        <S.InputWrapper>
          <SearchBar
            onSearchChange={(value: string): void => {
              this.setState({ searchQuery: value });
            }}
            disabled={disabled}
            placeholder="Placeholder"
            value={searchQuery}
            iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
          />
        </S.InputWrapper>
        <S.Dropdown visible>
          <Menu>
            {paths && searchQuery.length > 0 && (
              <>
                {filterPaths(paths, searchQuery).map(path => (
                  <Menu.Breadcrumb path={path} key={String(path.flat())} highlight={searchQuery} />
                ))}
              </>
            )}
            {!searchQuery && activeCategory.path && (
              <>
                <Menu.Breadcrumb path={activeCategory.path} prefixel={<Icon component={<HomeM />} />} />
              </>
            )}
            { !searchQuery && (
              <BackAction
                label="Back"
                onClick={NOOP}
              />
            )}

            {activeCategory && !searchQuery && (
              <>
                {itemsTitle && (
                  <>
                    <Menu.Header headerText={itemsTitle} tooltip={itemsTooltip} />
                  </>
                )}
                {Object.keys(activeCategory)
                  .filter(key => activeCategory[key]?.name)
                  .map(
                    (key): React.ReactNode => {
                      const item = activeCategory[key];
                      return (
                        <Menu.Item
                          text={activeCategory[key].name}
                          type="select"
                          key={`${activeCategory[key].id}`}
                          suffixel={<div>select</div>}
                          onClick={(): void => {
                            this.setState({
                              activeCategory: item,
                            });
                          }}
                        />
                      );
                    }
                  )}
              </>
            )}
          </Menu>
        </S.Dropdown>
      </S.Wrapper>
    );
  }
}

export default hoistNonReactStatics(onClickOutside(Cascader), Cascader);
