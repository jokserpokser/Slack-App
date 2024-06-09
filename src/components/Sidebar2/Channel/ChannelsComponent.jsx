import { FiberManualRecord } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ChannelOptions from './ChannelOptions';
import ChannelService from '../../../services/ChannelService';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { selectChannel, fetchMessages } from '../../../redux/chatSlice';

function ChannelsComponent() {
    const status = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const { uid, id } = user;

    const [open, setOpen] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channels, setChannels] = useState([]);
    const [channelFlag, setChannelFlag] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChannels = async () => {
            if (channelFlag) {
                const data = await ChannelService.getChannels(user);
                if (Array.isArray(data)) {
                    setChannels(data);
                } else {
                    setChannels([]);
                }
                setChannelFlag(false);
            }
        
        };

        fetchChannels();
    }, [channelFlag, user]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateChannel = async () => {
        if (!channelName) {
            alert('Channel name is required');
            return;
        }

        const result = await ChannelService.createChannel(user, channelName);
        if (result) {
            setChannelName('');
            handleClose();
            setChannels([...channels, result]);
        } else {
            console.error('Failed to create channel');
        }
        setChannelFlag(true);
    };

    const handleCancel = () => {
        handleClose();
        return(handleCancel);
    };

    const handleChannelSelect = (channel) => {
        dispatch(selectChannel(channel));
        dispatch(fetchMessages(channel.id));
    };

    return (
        <ChannelContainer>
            <ChannelHeader>
                {status === "true" && (
                    <ChannelInfo>
                        <h2>AVION SCHOOL</h2>
                        <h3>
                            <FiberManualRecord />
                            {uid} #{id}
                        </h3>
                    </ChannelInfo>
                )}
                
            </ChannelHeader>
            <hr />
            <ChannelOptions Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <ChannelOptions Icon={AddIcon} title="Add Channel" onClick={handleOpen} />

            {Array.isArray(channels) && channels.map((channel, index) => (
                <ChannelOptions key={index} title={channel.name} onClick={() => handleChannelSelect(channel)} />
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
                    <Button onClick={handleCancel}>
                        Cancel
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
    width: 300px;
    background-color: white;
    padding: 20px;
    box-shadow: 24;
    background-color: rgb(15, 15, 15);
    color: whitesmoke;
   

`;
