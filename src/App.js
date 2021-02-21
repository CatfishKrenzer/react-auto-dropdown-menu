import DropdownMenu from './components/DropdownMenu'
function App() {
  return (
    <div className="App" style={{width:'100%', display:'flex', justifyContent:'center'}}>
        <DropdownMenu
          title={<div style={{fontSize:"2em"}} >Menu</div>}
          enableChevron={true}
          dropdownLocation="full-screen"
          // style={{backgroundColor:'red', color:'green'}}
          >
            
          <a style={{color: 'purple'}} href='/blog'>BLOG</a>
          <hr style={{borderColor: 'white'}} />
          <DropdownMenu
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
    </div>
  );
}

export default App;
