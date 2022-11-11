import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import defaultFiles from './utils/defaultFiles';
import FileList from './components/FileList';
import ButtomBtn from './components/ButtonBtn';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'
import TabList from './components/TabList';

function App() {
  return (
    <div className="App container-fluid">
      <div className='row no-gutters'>
        <div className='col-3 file-list-div'>
          <FileSearch title='我的云文档' onFileSearch={(value) => {console.log(value);}}/>
          <FileList files={defaultFiles} 
            onFileClick={(id) => {console.log('click' + id);}} 
            onSaveEdit={(id, newTitle) => {console.log('edit:' + newTitle);}} 
            onFileDelete={(id) => {console.log('del' + id);}}/>
          <div className='row'>
            <div className='row col'>
              <ButtomBtn colorClass="btn-primary" 
                text="新建"
                icon={faPlus}
                onBtnClick={() => {console.log(1)}} />
            </div>
            <div className='row col'>
              <ButtomBtn colorClass="btn-success" 
                text="导入"
                icon={faFileImport}
                onBtnClick={() => {console.log(1)}} />
            </div>
          </div>
        </div>
        <div className='col-9 bg-warring right-panel'>
          <TabList 
            files={defaultFiles}
            activeId="2"
            unsaveIds={["1"]}
            onTabClick={(id) => console.log(id)}
            onCloseTab={(id) => console.log(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
