import DropdownMenuConstants from './components/DropdownMenuConstants';
import DropdownMenu from './components/DropdownMenu'
function App() {
  return (
    <div className="App" style={{width:'100%', display:'flex', justifyContent:'center'}}>
        <DropdownMenu
          title={<div style={{fontSize:"2em"}} >TEST</div>}
          enableChevron={true}
          dropdownLocation="full-screen"
          // style={{backgroundColor:'red', color:'black'}}
          items={[
            {
              type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
              element: <a style={{color: 'purple'}} className="dropdownMenuItemLink" href='/blog'>BLOG</a>
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
            },
            {
              title:'More Apps',
              type: DropdownMenuConstants.DropdownMenuTypes.DROPDOWN,
              items:[
                {
                  type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
                  element: <a className="dropdownMenuItemLink" href='/app1'>App 1</a>
                },
                {
                  type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
                  element: <a className="dropdownMenuItemLink" href='/app2'>App 2 Link</a>
                },
              ]
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
              element: <a className="dropdownMenuItemLink" href='/store'>STORE</a>
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
              element: <button href='/app1'>I'm a Button</button>
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
              element: <a className="dropdownMenuItemLink" href='/app3'>App 3</a>
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.ELEMENT,
              element: <a className="dropdownMenuItemLink" href='/about'>About</a>
            },
            {
              type: DropdownMenuConstants.DropdownMenuTypes.DIVIDER
            },
          ]}
        />
    </div>
  );
}

export default App;
