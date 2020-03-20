import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import axios from  'axios';
import Papa from 'papaparse';



function Upload() {

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState({})

/*
  const uploadFile = (event) => {
    if(files.length <= 1){
      console.log("selected one");
      console.log(files);
      const formData = new FormData();
      formData.append('uploadedFile',files[0])
      const config = {
         headers: {
             'content-type': 'multipart/form-data'
         }
       }
      axios.post('http://localhost:3030/upload-file', formData, config)
        .then(() => {
          console.log("file Saved");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("selected many");
      console.log(files);
      const formData = new FormData();
      //append all files to formData
      for(var file of files){
        formData.append('uploadedFiles',file)
      }
      const config = {
         headers: {
             'content-type': 'multipart/form-data'
         }
       }
      axios.post('http://localhost:3030/upload-files', formData, config)
        .then(() => {
          console.log("files Saved");
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

*/

  const makeDataObj = (dataArray) => {
    console.log(dataArray);
    let returnArray = [];
    Object.keys(dataArray){
      let row = {};
      for(var j in dataArray[i]){
        row[i] = dataArray[i][j];
      }
    }
    console.log(returnArray);
    return(returnArray);
  }


  const changedFile = (event) => {
    const uploadedFile = event.target.files[0]
    console.log(uploadedFile);
    setFile(uploadedFile);
    setFileName([uploadedFile.name]);
    Papa.parse(uploadedFile, {
               	 complete: function(results) {
            		 console.log("Finished:");
                 const dataObj = makeDataObj(results.data);
                 setData(dataObj);
            	  }
            });

  }

  const displayFileNames = () => {
    return(fileName ? <Alert  severity="success">{fileName}</Alert> : null);
  }

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <Grid container direction="row" justify="flex-start" alignItems="center" >
        <input
            onChange={changedFile}
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span" >
              Choose
            </Button>
          </label>
          {displayFileNames()}
        </Grid>
    </Grid>
  );
}


export default Upload;
