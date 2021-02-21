import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import DropdownMenuConstants from './DropdownMenuConstants.json'; 
import './DropdownMenu.css';

const DropdownMenuEmbedded = props => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdownMenu">
      <div onClick={()=>setIsOpen(!isOpen)} style={{color:(props.color || 'white')}}>
        {props.enableChevron && <span><FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight}/> </span>} 
        {props.title}
      </div>
      {isOpen &&
        <ul className={`dropdownMenuEmbedded ` + (props.isTopLevel ? 'dropdownMenuExpandedTopLevel' : '')}>
          {props.items.map((item,index)=>{
            if(item.type === DropdownMenuConstants.DropdownMenuTypes.ELEMENT){
              return (
                <li className="dropdownMenuItemList" key={`Dropdown-Item-${index}-${item.title}`}>
                  {item.element}
                </li>
              )
            } else if(item.type === DropdownMenuConstants.DropdownMenuTypes.DROPDOWN){
              return (
                <li className="dropdownMenuItemList" key={`Dropdown-Item-${index}-${item.title}`}>
                  <DropdownMenuEmbedded items={item.items} title={item.title} color={props.color || 'white'}/>
                </li>
              )
            } else if(item.type === DropdownMenuConstants.DropdownMenuTypes.DIVIDER){
              return (
                <li className="dropdownMenuItemDivider" key={`Dropdown-Item-${index}-${item.title}`}>
                  <hr style={{color:(props.color || 'white'), backgroundColor: (props.color || 'white')}} />
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      }
    </div>
  );
}

DropdownMenuEmbedded.defaultProps = {
  enableChevron: true,
  dropdownLocation: 'full-screen',
  title: '',
  items: []
}
export default DropdownMenuEmbedded;