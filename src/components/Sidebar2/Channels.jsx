
import './Sidebar2.css';
import ChannelsComponent from './Channel/ChannelsComponent';
import Chat from '../Chat/Chat';


export default function Channels() {


  return (
    <div className='sidebar2-container'>
      <ChannelsComponent />
      <Chat />
    </div>
    
  )
}
