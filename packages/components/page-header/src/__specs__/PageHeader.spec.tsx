import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import PageHeader from '../index';

describe('PageHeader', () => {
  const onClick = jest.fn();
  const TITLE = 'TEST TITLE';
  const RIGHT_SIDE = 'RIGHT_SIDE';
  const DESCRIPTION = 'DESCRIPTION';

  it('should render title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} onGoBack={onClick} />);
    // ASSERT
    expect(getByText('TEST TITLE')).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} description={DESCRIPTION} onGoBack={onClick} />);
    // ASSERT
    expect(getByText('TEST TITLE')).toBeTruthy();
  });

  it('should render rightSide', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} onGoBack={onClick} rightSide={RIGHT_SIDE} />);
    // ASSERT
    expect(getByText(RIGHT_SIDE)).toBeTruthy();
  });

  it('should render bar', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <PageHeader title={TITLE} bar={<div data-testid="bar">bar</div>}/>
    );
    // ASSERT
    expect(getByTestId('bar') as HTMLElement).toBeTruthy();
  });

  it('should render tabs', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <PageHeader title={TITLE} tabs={<div data-testid="tabs">tabs</div>}/>
    );
    // ASSERT
    expect(getByTestId('tabs') as HTMLElement).toBeTruthy();
  });

  it('should render avatar', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <PageHeader title={TITLE} avatar={<div data-testid="avatar">avatar</div>}/>
    );
    // ASSERT
    expect(getByTestId('avatar') as HTMLElement).toBeTruthy();
  });

  it('should render more', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <PageHeader title={TITLE} more={<div data-testid="more">more</div>}/>
    );
    // ASSERT
    expect(getByTestId('more') as HTMLElement).toBeTruthy();
  });

  it('should render inlineEditor', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <PageHeader title={TITLE} onGoBack={onClick} inlineEdit={
        {name: '', value: '', maxLength: 10, handleOnChange: () => {}, placeholder: 'test', size: 'normal'}
      } >
        Children
      </PageHeader>
    );
    // ASSERT
    expect(getByPlaceholderText('test')).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <PageHeader title={TITLE} onGoBack={onClick}>
        Children
      </PageHeader>
    );
    // ASSERT
    expect(getByText('Children')).toBeTruthy();
  });

  it('clicking back should trigger onChange event', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <PageHeader title={TITLE} onGoBack={onClick}>
        Children
      </PageHeader>
    );

    // ACT
    fireEvent.click(container.querySelector('.page-header__back') as HTMLElement);

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });

  it('clicking close should trigger onChange event', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <PageHeader title={TITLE} onClose={onClick}>
        Children
      </PageHeader>
    );

    // ACT
    fireEvent.click(container.querySelector('.page-header__close') as HTMLElement);

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });
});