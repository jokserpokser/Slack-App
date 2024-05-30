import { FiberManualRecord } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ChannelOptions from './ChannelOptions';
import ChannelService from '../../../services/ChannelService';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ChannelsComponent() {
    const status = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const { uid, id } = user;

    const [open, setOpen] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const data = await ChannelService.getChannels(user);
            if (Array.isArray(data)) {
                setChannels(data);
            } else {
                setChannels([]);
            }
        };

        fetchChannels();
    }, [user]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateChannel = async () => {
        if (!channelName) {
            alert('Channel name is required');
            return;
        }

        const result = await ChannelService.createChannel(user, channelName);
        if (result) {
            console.log('Channel created successfully:', result);
            setChannelName('');
            handleClose();
            setChannels([...channels, result]); // Update channels list with the new channel
        } else {
            console.error('Failed to create channel');
        }
    };

    return (
        <ChannelContainer>
            <ChannelHeader>
                {status === "true" && (
                    <ChannelInfo>
                        <h2>ADVENT CHILDREN</h2>
                        <h3>
                            <FiberManualRecord />
                            {uid} #{id}
                        </h3>
                    </ChannelInfo>
                )}
                <CreateIcon />
            </ChannelHeader>
            <hr />
            <ChannelOptions Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <ChannelOptions Icon={AddIcon} title="Add Channel" onClick={handleOpen} />

            {Array.isArray(channels) && channels.map((channel) => (
                <ChannelOptions key={channel.id} title={channel.name} />
            ))}
            
            <Modal open={open} onClose={handleClose}>
                <ModalBox>
                    <h2>Create a new channel</h2>
                    <TextField
                        label="Channel Name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleCreateChannel}>
                        Create
                    </Button>
                </ModalBox>
            </Modal>
        </ChannelContainer>
    );
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

const ModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    padding: 20px;
    box-shadow: 24;
    p: 4;
`;
