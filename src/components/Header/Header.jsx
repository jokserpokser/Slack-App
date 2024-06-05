import React from 'react';
import styled from 'styled-components';
// import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HelpOutline } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Header() {
  return (
    <HeaderContainer>
        <HeaderLeft>
            {/* <HeaderAvatar /> */}
            <AccessTimeIcon />
        </HeaderLeft>
        <HeaderSearch>
            <SearchIcon />
            <input placeholder="Search"/>
        </HeaderSearch>
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

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: rgb(27, 27, 27);
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
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
