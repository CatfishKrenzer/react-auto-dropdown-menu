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

#### ELEMENT
    {
      type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT
      element: {<a href="some/link-here>Click Me</a>}
    }

#### DIVIDER
    {
      type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
    }

#### EMBEDDED DROPDOWN
    {
      title:'More Apps',
      type: DropdownMenuConstants.DropdownMenuTypes.DROPDOWN,
      items:[
        {
          type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT
          element: {<a href="some/link-here>Click Me</a>}
        },
        {
          type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT
          element: {<a href="some/link-here>Click Me</a>}
        }
      ]
    }

## Future Plans
- Mobile Sizing Feature
    - Enable button height to be mobile friendly (58px)
- Allow non-link functions
    - Allow consumer to pass in handlers for the items, allowing more than just navigation links
- Full Screen Left and Right Options
- Unit Tests