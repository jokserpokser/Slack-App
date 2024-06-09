import React from 'react';
import styled from 'styled-components';
import { HelpOutline } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Header() {
  return (
    <HeaderContainer>
        <HeaderLeft>
            {/* <HeaderAvatar /> */}
            <AccessTimeIcon />
        </HeaderLeft>
        <HeaderCenter>
            SLACK APP
        </HeaderCenter>  
        <HeaderRight>
            <HelpOutline />
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`;

const HeaderCenter = styled.div`
    font-weight: 800;
    color: whitesmoke;
`;


const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    background-color: rgb(27, 27, 27);
    color: white;
    position: fixed;
    z-index: 9999;
`;


const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    padding-right: 20px;
`;

// const HeaderAvatar = styled(Avatar)`
//     cursor: pointer;

//     :hover {
//         opacity: 0.8;
//     }
// `;
