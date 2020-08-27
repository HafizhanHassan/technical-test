import React, { Component } from 'react';
import '../css/App.css';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import Preview from './Preview';


//start the FileChecker Class Component
class FileChecker extends Component {

  constructor(props) {
    super(props);
    //state declaration
    this.state = {
      listFiles: [],
      totLines: null,
      totWords: null,
      user: null,
      totUser: null
    };
  }

    render(){

      //function that triggered when changes happen in dropzone
      //fileWithMeta to setState
      const handleChangeStatus = ( { xhr, file }, status) => {
        if (xhr) {
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              const result = JSON.parse(xhr.response);
              console.log(result);
              
            }
          }
        }
        //error handling if any file except .txt being drop
        if(status=== 'rejected_file_type'){
          alert('The dropped file is not (.txt) type. Please Drop only (.txt) type files')
        }
        //setState for file
          this.setState({listFiles : file})
          
        
      }
      
      
      //function when submit button being triggered
      const handleSubmit = (files) => {

        files.map(f => f.meta)
       
        //read the dropped file
        const reader = new FileReader ()
        reader.onload =()=>{
        const text = reader.result
        let user = text.match(/(?<=<)(.*)(?=>)/g);
        let tUser = text.match(/(?<=<)(.*)(?=>)/gi).length;
        let lines = text.split('\n').length
        let words = text.length
        //set state for each value
        this.setState({
            user: user,
            totUser:tUser,
            totLines: lines,
            totWords: words
          })

        }
        //readAsText method to read the file content
        reader.readAsText( this.state.listFiles)
        }
      
        //interfaces
      return (
        <div className="App">
          <h2><strong>Upload a log File (.txt)</strong></h2>
          <Dropzone
            onChangeStatus={handleChangeStatus}
            onSubmit ={handleSubmit}
            canRemove = {true}
            styles={{
              dropzone: { 
                overflow: 'auto', 
                border: 'dotted', 
                background: '#f5f5f5',
                width: 550,
                height: 400
               },
              inputLabelWithFiles: { margin: '20px 3%' }
            }}
            inputContent="Drag n Drop Files here...."
            disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading']
            .includes(f.meta.status))}
            PreviewComponent={Preview}
            accept=".txt"
          />
          <br />
          {//display result
          }
          <h3>Result</h3>
            <div className="result">
              <div styles ={{
              width: 300,
              height: 400,
              border: 'solid'
              }}>
                {this.state.totUser ? <p>1. Number of user appear in chat: {this.state.totUser}</p> : <p></p>}
                {this.state.totUser ? <p>2. Number of Lines: {this.state.totLines}</p> : <p></p>}
                {this.state.totUser ? <p>3. total words: {this.state.totWords}</p>: <p></p>}
              </div>
            </div>
          </div>
    
      );

    }
  
      
}

//export the component
export default FileChecker;
