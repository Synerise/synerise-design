import styled from 'styled-components';

export const FlagWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    span {
        margin-top: 12px;
    }
`;

export const FlagItem = styled.div`
    min-width: 145px;
    min-height: 145px;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e0e0e0;
`;
