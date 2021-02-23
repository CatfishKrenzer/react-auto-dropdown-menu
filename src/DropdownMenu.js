import React, {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './DropdownMenu.css';

const DropdownMenu = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [idSeed, setIdSeed] = useState(0);
  const [positionStyle, setPositionStyle] = useState({});

  // Create a reference to this element, only used by the top level menu
  const wrapperRef = useRef();
  
  // Close the menu if user clicks outside of the menu
  const handleClickOutside = (event) => {
    if (!wrapperRef?.current?.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    // If the menu is the top level menu, add an event listener to the document 
    // to close the menu when clicked outside
    if(!props.isEmbedded){
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Removes the event listener after the event fires (Prevent Continuously adding events)
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [wrapperRef]);

  // Set Seed Id - This is used for determining position with multiple dropdown menus
  useEffect(()=>{
    setIdSeed(Math.floor(Math.random() * 10000));
  }, [])

  // Get top level menu coordinates
  useEffect(()=>{
    if(!props.isEmbedded){
      // Dynamically find the x and y coordinates of the div 
      let dropdownMenuDiv = document.getElementById(`topLevelMenu_seed${idSeed}`);
      if(dropdownMenuDiv){
        switch(props.dropdownLocation){
          case "full-screen":
            setPositionStyle({left:'0px', top: '0px', width: 'calc(90% - 10px)', height:'calc(100% - 10px)', marginTop:'0px', ...props.style})
            break;
          case "full-screen-right":
            setPositionStyle({right:'0px', top: '0px', width: 'calc(90% - 10px)', height:'calc(100% - 10px)', marginTop:'0px', textAlign: 'right', ...props.style})
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
    }
  }, [idSeed, props.dropdownLocation])

  const childOrEmbeddedMenu = (child) => {
    // Apply color styling from top level menu, or default. But allow passed in style to overwrite
    const childStyling = child.props.style;
    const currentStyling = {color: props.style?.color || 'white'}

    const styleToApply = {...currentStyling, ...childStyling}
    // If the defaulted property is detected, mark the element as embedded
    if(child?.props?.componentType === 'dropdown-menu'){
      return React.cloneElement(child, {isEmbedded:true, dropdownLocation: props.dropdownLocation, style: styleToApply})
    }

    return React.cloneElement(child, {style: styleToApply})
  }

  return (
    <div id={`topLevelMenu_seed${idSeed}`} className="dropdownMenu" ref={wrapperRef}>

      {/* Title / Button */}
      <div onClick={()=>setIsOpen(!isOpen)} style={props.isEmbedded ? {color: props.style?.color || 'white', display:'flex', flexDirection:'row'} : {}}>
        {/* Determine if the main icon/title should be used or the chevron */}
        {props.isEmbedded && props.enableChevron && <span className="react-auto-dropdown-menu-embedded-chevron"><FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight}/> </span>} 
        {props.title}
      </div>

      {isOpen &&
        // Determine dropdown menu styling based on if it is the top level or embedded 
        <ul className={`${!props.isEmbedded ? 'react-auto-dropdown-menu-expanded-top-level' : props.dropdownLocation === 'full-screen-right'? 'react-auto-dropdown-menu-embedded-right' : 'react-auto-dropdown-menu-embedded'}`} style={positionStyle}>
          {props.children.map((child,index)=>{
            return (
              <li className="react-auto-dropdown-menu-item-list" key={`Dropdown-Item-${index}-${child.type.toString()}`}>
                {childOrEmbeddedMenu(child)}
              </li>
            )
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
  items: [],
  componentType: 'dropdown-menu'
}

export default DropdownMenu;