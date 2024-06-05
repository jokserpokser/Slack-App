import React from 'react';
import styled from 'styled-components';

function ChannelOptions({ Icon, title, onClick }) {
    return (
        <ChannelOptionContainer onClick={onClick}>
            {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <ChannelOptionBox>
                    <span>#</span> {title}
                </ChannelOptionBox>
            )}
        </ChannelOptionContainer>
    );
}

export default ChannelOptions;

const ChannelOptionContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        margin-left: 10px;
        font-size: 14px;
    }

    > h3 > span {
        padding: 5px;
    }
`;

const ChannelOptionBox = styled.h3`
    display: flex;
    font-size: 15px;
    align-items: center;
    font-weight: 400;
    padding: 10px 0;
    
`;
