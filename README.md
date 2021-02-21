# Getting Started with react-auto-dropdown-menu

## Props
Available properties and descriptions for usage:

### title
This is the button you choose to be clicked to toggle the dropdown menu. This may be a simple string or html element.

### enableChevron
Property used to determine if a chevron is used for embedded dropdown menus. Values are true or false.

### dropdownLocation - Location Options
Based on your needs, there are multiple options available for menu placement:
- "left" - Menu will appear directly left of the button
- "right" - Menu will appear directly right of the button
- "bottom-left" - Menu will appear directly below the button, with the left sides aligned
- "bottom-right" - Menu will appear directly below the button, with the right sides aligned
- "bottom" - Menu will appear directly below and centered on the button
- "full-screen" - Large menu appears over left 90% or the screen. Click off the 10% not covered to close

### style
Style can be passed similar to any other react component. The passed in style will be applied to the overall component.
- color - Font color applied to all layers
- backgroundColor - Background color applied to menu

### items
An array of objects containing information about what elements to render:

## EXAMPLE
Here is an example of how to use the dropdown menu

    <DropdownMenu
      title={<div style={{fontSize:"2em"}} >Menu</div>}
      enableChevron={true}
      dropdownLocation="bottom-right"
      style={{backgroundColor:'red', color:'green'}}>
        
      <a style={{color: 'purple'}} href='/blog'>BLOG</a>
      <hr style={{borderColor: 'white'}} />
      <DropdownMenu
        style={{color: 'blue'}}
        title={'More Apps'}>
          <a href='/app1'>App 1</a>
          <a href='/app2'>App 2 Link</a>
        </DropdownMenu>
        <hr style={{borderColor: 'white'}} />
        <a href='/store'>STORE</a>
        <button href='/app1'>I'm a Button</button>
        <hr style={{borderColor: 'white'}} />
        <a href='/app3'>App 3</a>
        <hr style={{borderColor: 'white'}} />
        <a href='/about' style={{color: 'red'}}>About</a>
        <hr style={{borderColor: 'white'}} />
    </DropdownMenu>

## Future Plans
- Full Screen Left and Right Options
- Unit Tests