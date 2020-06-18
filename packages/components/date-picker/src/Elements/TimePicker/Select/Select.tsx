import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import { List, Item } from './Select.styles';

const scrollTo = (scrollbars, to, duration) => {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    function requestAnimationFrameTimeout() {
      return setTimeout(arguments[0], 10);
    };
  // jump to target if duration zero
  if (duration <= 0) {
    scrollbars.scrollTop(to);
    return;
  }
  const difference = to - scrollbars.getScrollTop();
  const perTick = (difference / duration) * 10;

  requestAnimationFrame(() => {
    scrollbars.scrollTop(scrollbars.getScrollTop() + perTick);
    if (scrollbars.getScrollTop() === to) return;
    scrollTo(scrollbars, to, duration - 10);
  });
};

class Select extends Component {
  static propTypes = {
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
  };

  state = {
    active: false,
  };

  componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  }

  componentDidUpdate(prevProps) {
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  onSelect = value => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  };

  getOptions() {
    const { options, selectedIndex } = this.props;
    return options.map((item, index) => {
      const selected = selectedIndex === index;
      let onclick = !item.disabled ? this.onSelect.bind(this, item.value) : null;
      return (
        <Item key={index} onClick={onclick} selected={selected} disabled={item.disabled}>
          {item.value}
        </Item>
      );
    });
  }

  scrollToSelected(duration) {
    // move to selected item
    const { list, scrollbars } = this;
    if (!list) {
      return;
    }
    let index = this.props.selectedIndex;
    if (index < 0) {
      index = 0;
    }
    const topOption = list.children[index];
    const to = topOption.offsetTop;
    scrollTo(scrollbars, to, duration);
  }

  handleMouseEnter = e => {
    this.setState({ active: true });
    this.props.onMouseEnter(e);
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  saveList = node => {
    this.list = node;
  };

  saveScrollbars = node => {
    this.scrollbars = node;
  };

  renderTrackHorizontal = ({ style, ...props }) => {
    const finalStyle = {
      ...style,
      right: 2,
      bottom: 2,
      left: 2,
      borderRadius: 3,
      opacity: 0,
    };
    return <div style={finalStyle} {...props} />;
  };

  renderTrackVertical = ({ style, ...props }) => {
    const finalStyle = {
      ...style,
      right: 2,
      bottom: 2,
      top: 2,
      borderRadius: 3,
      opacity: this.state.active ? 1 : 0,
      transition: 'opacity 0.3s',
    };
    return <div style={finalStyle} {...props} />;
  };

  render() {
    if (this.props.options.length === 0) {
      return null;
    }

    return (
      <Scrollbars
        ref={this.saveScrollbars}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
      >
        <List ref={this.saveList} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          {this.getOptions()}
        </List>
      </Scrollbars>
    );
  }
}

export default Select;
