import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import defaultFiles from './utils/defaultFiles';
import FileList from './components/FileList';

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-3'>
          <FileSearch title='我的云文档' onFileSearch={(value) => {console.log(value);}}/>
          <FileList files={defaultFiles} />
        </div>
        <div className='col-9 bg-warring'>
          <h1>2</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
