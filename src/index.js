const React = require('react')
const {render} = require('react-dom')
const Loadable = require('react-loadable')

function Loading() {
  return <div>Loading...</div>;
}


const LoadableComponent = Loadable({
  loader: () => import('./component/test.js'),
  loading: Loading,
});


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false
    }
  }
  toggle(){
    this.setState({
      ...this.state,
      show:!this.state.show
    })
  }
  render(){
    return <div>
      <h1>app</h1>
      <button onClick={this.toggle.bind(this)}>click ->show Loadable component</button>
      {
        this.state.show?<LoadableComponent />:null
      }
    </div>
  }
}

render(
  <App />,
  document.getElementById('app')
)

