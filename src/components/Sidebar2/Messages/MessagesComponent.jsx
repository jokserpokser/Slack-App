import React from 'react'
import styled from 'styled-components'
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

function Messages() {
  return (
    <MessageContainer>
      <MessageHeader>
          <MessageInfo>
              <h2>Direct messages</h2>
          </MessageInfo>
          <CreateIcon />
      </MessageHeader>
      <HeaderSearch>
      <SearchIcon />
      <input placeholder="Search"/>
      </HeaderSearch>


    </MessageContainer>
  )
}

export default Messages

const MessageContainer = styled.div`
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

const MessageHeader = styled.div`
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

const MessageInfo = styled.div`
  flex: 1;

> h2 {
  font-size: 20px;
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

const HeaderSearch = styled.div`
    margin-top: 10px;
    opacity: 1;
    border-radius: 5px;
    background-color: rgb(27, 27, 27);
    text-align: center;
    display: flex;
    padding: 0 10px;
    color: gray;
    border: 1px gray solid;
    align-items: center;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 15vw;
        outline: 0;
        color: white;
    }
`;
