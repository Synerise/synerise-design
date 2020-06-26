import React from 'react';
import styled from 'styled-components';
import IconBase from '@synerise/ds-icon';

export const Icon = styled(({ on, ...rest }) => <IconBase {...rest} />)`
  grid-area: icon;
  position: relative;

  &::before,
  &::after {
    display: ${props => (props.on ? 'block' : 'none')};
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    border-radius: 50%;
    background-color: red;
    width: 8px;
    height: 8px;
  }

  &::before {
    box-shadow: 0 0 0 6px rgba(255, 0, 0, 0.125);
  }

  &::after {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.25);
  }
`;

export const OpenModalButton = styled.button`
  grid-area: button;
  vertical-align: middle;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.theme.variable('@primary-color')};
  font-weight: 500;
`;

export const RemoveFilterButton = styled.button`
  grid-area: removeButton;
  vertical-align: middle;
  background: none;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  color: ${props => props.theme.variable('@error-color')};
  font-weight: 500;
`;

export const Status = styled.span`
  grid-area: status;

  b {
    color: ${props => props.theme.variable('@gray-color')};
  }
`;

export const Container = styled.div`
margin: 0 0 8px;
padding: 16px;
border-radius: 3px;
border: ${props => (props.on ? '1px solid transparent' : '1px dashed #d9eeff')};
color: ${props => (props.on ? props.theme.variable('@gray-color-lighter-3') : 'inherit')};
background-color: ${props => (props.on ? props.theme.variable('@yellow-color-lighter-6') : 'inherit')};
display: grid;
grid-template-areas: "${props => (props.on ? 'icon status removeButton button' : 'icon button')}";
grid-template-columns: ${props => (props.on ? 'min-content auto max-content max-content' : 'min-content auto')};
justify-content: ${props => (props.on ? 'stretch' : 'left')};
align-items: center;
grid-gap: 8px;
text-align: left;
`;
