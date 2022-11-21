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
import {v4 as uuidv4} from  'uuid'
import { flattenArr, objToArr} from './utils/helper'

function App() {

  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [searchFiles, setSearchFiles] = useState([])
  const [activeFileId, setActiveFileId] = useState('')
  const [openedFileIds, setOpenedFileIds] = useState([])
  const [unsavedIds, setUnsaveIds] = useState([])

  const filesArr = objToArr(files);

  const openedFiles = openedFileIds.map(openId => {
    return files[openId]
  })

  const fileListArr = searchFiles.length === 0 ? filesArr : searchFiles;

  const activeFile = files[activeFileId]

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

    const newUnsaveIds = unsavedIds.filter(id => id !== fileId);
    setUnsaveIds(newUnsaveIds);
  }

  const updateFile = (newFile) => {
    setFiles({...files, [newFile.id]: newFile})
  }

  const onFileChange = (fileId, text) => {
    let newFile = { ...files[fileId], body: text}
    updateFile(newFile);
    if (!unsavedIds.includes(fileId)) {
      setUnsaveIds([...unsavedIds, fileId])
    }
  }

  const tabClickHandler = (fileId) => {
    setActiveFileId(fileId)
  }

  const deleteFile = (id) => {
    delete files[id];
    setFiles(files);
    // 关闭打开的文件
    closeFileHandler(id);
  }

  const updateFileTitle = (id, title) => {
    let newFile = {...files[id], title: title, isNew: false}
    updateFile(newFile);
  }

  const fileSearch = (param) => {
    const filterFiles = filesArr.filter(file => file.title.includes(param));
    setSearchFiles(filterFiles);
  }

  const createFile = () => {
    const uuid = uuidv4()
    const newFile = {
      id: uuid,
      title: '',
      body: '',
      createAt: new Date().getTime(),
      isNew: true
    }
    setFiles({...files, [uuid]: newFile});
  }

  return (
    <div className="App container-fluid">
      <div className='row no-gutters'>
        <div className='col-3 file-list-div left-pannel'>
          <FileSearch title='我的云文档' onFileSearch={(value) => fileSearch(value)}/>
          <FileList files={fileListArr} 
            onFileClick={(id) => openFileHandler(id)} 
            onSaveEdit={(id, newTitle) => updateFileTitle(id, newTitle)} 
            onFileDelete={(id) => deleteFile(id)}/>
          <div className='row button-group'>
            <div className='row col'>
              <ButtomBtn colorClass="no-border btn-primary" 
                text="新建"
                icon={faPlus}
                onBtnClick={() => createFile()} />
            </div>
            <div className='row col'>
              <ButtomBtn colorClass="no-border btn-success" 
                text="导入"
                icon={faFileImport}
                onBtnClick={() => {console.log("导入")}} />
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
