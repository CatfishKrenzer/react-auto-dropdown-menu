import React, {useEffect, useState, useRef} from 'react';
import DropdownMenuConstants from './DropdownMenuConstants.json'; 
import './DropdownMenu.css';
const DropdownMenuEmbedded =  React.lazy(() => import('./DropdownMenuEmbedded' /* webpackChunkName: "DropdownMenuEmbedded" */));

const DropdownMenu = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [idSeed, setIdSeed] = useState(0);
  const [positionStyle, setPositionStyle] = useState({});

  const wrapperRef = useRef(null);
  
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            // Close the menu when clicked outside
            setIsOpen(false);
          }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  // Set Seed Id
  useEffect(()=>{
    setIdSeed(Math.floor(Math.random() * 10000));
  }, [])

  // Get top level menu coordinates
  useEffect(()=>{
    // Dynamically find the x and y coordinates of the div 
    let dropdownMenuDiv = document.getElementById(`topLevelMenu_seed${idSeed}`);
    if(dropdownMenuDiv){
      switch(props.dropdownLocation){
        case "full-screen":
          setPositionStyle({left:'0px', top: '0px', width: 'calc(90% - 10px)', height:'calc(100% - 10px)', marginTop:'0px', ...props.style})
          break;
        case "left":
          setPositionStyle({right:`${window.innerWidth - dropdownMenuDiv.offsetLeft}px`, top: `${dropdownMenuDiv.offsetTop}px`, ...props.style})
          break;
        case "bottom":
          setPositionStyle({left:`${dropdownMenuDiv.offsetLeft - dropdownMenuDiv.offsetWidth}px`, top: `${dropdownMenuDiv.offsetTop + dropdownMenuDiv.offsetHeight}px`, ...props.style})
          break;
        case "bottom-left":
          setPositionStyle({right:`${window.innerWidth - dropdownMenuDiv.offsetLeft - dropdownMenuDiv.offsetWidth}px`, top: `${dropdownMenuDiv.offsetTop + dropdownMenuDiv.offsetHeight}px`, ...props.style})
          break;
        case "right":
          setPositionStyle({left:`${dropdownMenuDiv.offsetLeft + dropdownMenuDiv.offsetWidth}px`, top: `${dropdownMenuDiv.offsetTop}px`, ...props.style})
          break;
        default:
        case "bottom-right":
          setPositionStyle({left:`${dropdownMenuDiv.offsetLeft}px`, top: `${dropdownMenuDiv.offsetTop + dropdownMenuDiv.offsetHeight}px`, ...props.style})
          break; 
      }
    }
  }, [idSeed, props.dropdownLocation])

  return (
    <div id={`topLevelMenu_seed${idSeed}`} className="dropdownMenu" ref={wrapperRef}>
      <div onClick={()=>setIsOpen(!isOpen)}>{props.title}</div>
      
      {isOpen &&
        <ul className={'dropdownMenuExpanded dropdownMenuExpandedTopLevel'} style={positionStyle}>
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
                  <React.Suspense fallback={null}>
                    <DropdownMenuEmbedded items={item.items} title={item.title} enableChevron={props.enableChevron} color={props.style?.color || 'white'}/>
                  </React.Suspense>
                </li>
              )
            } else if(item.type === DropdownMenuConstants.DropdownMenuTypes.DIVIDER){
              return (
                <li className="dropdownMenuItemDivider" key={`Dropdown-Item-${index}-${item.title}`}>
                  <hr style={{borderColor:(props.style?.color || 'white')}} />
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

DropdownMenu.defaultProps = {
  enableChevron: true,
  dropdownLocation: 'full-screen',
  title: '',
  items: []
}
export default DropdownMenu;