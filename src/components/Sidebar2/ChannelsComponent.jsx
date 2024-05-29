import { FiberManualRecord } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChannelOptions from './ChannelOptions';
import AddIcon from '@mui/icons-material/Add';

function ChannelsComponent() {
  return (
    <ChannelContainer>
        <ChannelHeader>
            <ChannelInfo>
                <h2>ADVENT CHILDREN</h2>
                <h3>
                    <FiberManualRecord />
                    Sephiroth
                </h3>
            </ChannelInfo>
            <CreateIcon />
        </ChannelHeader>
        <hr />
        <ChannelOptions Icon={ExpandMoreIcon} title="Channels" />
        <hr />
        <ChannelOptions Icon={AddIcon} addChannelOptions title="Add Channel" />
    </ChannelContainer>

  )
}

export default ChannelsComponent;

const ChannelContainer = styled.div`
    color: white;
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 23rem;
    margin-top: 60px;
    text-align: left;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`;

const ChannelHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }
`;

const ChannelInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;

