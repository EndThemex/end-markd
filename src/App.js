import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import defaultFiles from './utils/defaultFiles';
import FileList from './components/FileList';
import ButtomBtn from './components/ButtonBtn';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'
import TabList from './components/TabList';
import { useState } from 'react';
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import editerOptions from './utils/editerOptions';

function App() {

  const [files, setFiles] = useState(defaultFiles)
  const [activeFileId, setActiveFileId] = useState('')
  const [openedFileIds, setOpenedFileIds] = useState([])
  const [unsavedIds, setUnsaveIds] = useState([])

  const openedFiles = openedFileIds.map(openId => {
    return files.find(file => file.id === openId)
  })


  const activeFile = files.find(file => file.id === activeFileId)

  const openFileHandler = (openId) => {
    setActiveFileId(openId)
    if (!openedFileIds.includes(openId)) {
      setOpenedFileIds([...openedFileIds, openId])
    }
  }

  const closeFileHandler = (fileId) => {
    let newFileIds = openedFileIds.filter(id => id !== fileId)
    setOpenedFileIds([...newFileIds])
    if (fileId === activeFileId) {
      setActiveFileId(newFileIds.pop())
    }
  }

  const onFileChange = (fileId, text) => {
    let newFiles = files.map(file => {
      if (file.id === fileId) {
        file.body = text;
      }
      return file
    })
    setFiles(newFiles)
    setUnsaveIds([...unsavedIds, fileId])
  }

  const tabClickHandler = (fileId) => {
    setActiveFileId(fileId)
  } 

  return (
    <div className="App container-fluid">
      <div className='row no-gutters'>
        <div className='col-3 file-list-div left-pannel'>
          <FileSearch title='我的云文档' onFileSearch={(value) => {console.log(value);}}/>
          <FileList files={files} 
            onFileClick={(id) => openFileHandler(id)} 
            onSaveEdit={(id, newTitle) => {console.log('edit:' + newTitle);}} 
            onFileDelete={(id) => {console.log('del' + id);}}/>
          <div className='row button-group'>
            <div className='row col'>
              <ButtomBtn colorClass="no-border btn-primary" 
                text="新建"
                icon={faPlus}
                onBtnClick={() => {console.log(1)}} />
            </div>
            <div className='row col'>
              <ButtomBtn colorClass="no-border btn-success" 
                text="导入"
                icon={faFileImport}
                onBtnClick={() => {console.log(1)}} />
            </div>
          </div>
        </div>
        <div className='col-9 bg-warring right-panel'>
          {!activeFile && 
          <div className='start-page'>
            创建或者导入文档
          </div>}
          {
            activeFile &&
            <>
            <TabList 
              files={openedFiles}
              activeId={activeFileId}
              unsaveIds={unsavedIds}
              onTabClick={(id) => tabClickHandler(id)}
              onCloseTab={(id) => closeFileHandler(id)}
            />
            <SimpleMdeReact 
              key={activeFile?.id}
              options={editerOptions}
              value={activeFile?.body} 
              onChange={(text) => {onFileChange(activeFile?.id, text)}}
            />
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
