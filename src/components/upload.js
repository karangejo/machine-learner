import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import axios from  'axios';
import Papa from 'papaparse';
import TableDisplay from './table';
import Browse from './browse';


function Upload() {

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState({})
  const [displayData, setDisplayData] = useState(false);
  const [displayWrongFileType, setDisplayWrongFileType] = useState(false);
  const [displayBrowser, setDisplayBrowser] = useState(false);
  const [mlOutput, setMlOutput] = useState('');

  const changedFile = (event) => {
    const uploadedFile = event.target.files[0]
    if(uploadedFile.name.match(/\.csv/)){
      setDisplayWrongFileType(false);
      setFile(uploadedFile);
      setFileName([uploadedFile.name]);
      Papa.parse(uploadedFile, {
                   complete: function(results) {
                   //const dataObj = makeDataObj(results.data);
                   console.log(results);
                   setColumns(results.meta.fields);
                   setData(results.data);
                   setDisplayData(true);
                 },
                 header: true
              });
    } else {
        console.log("please upload a csv");
        setDisplayWrongFileType(true);
    }
  }

  const displayFileNames = () => {
    return(fileName ? <Alert  severity="success">{fileName}</Alert> : null);
  }

  const runMl = (xCol, yCol) => {
    console.log("selected one");
    console.log(file);
    const formData = new FormData();
    formData.append('uploadedFile',file);
    formData.append('xCol',xCol);
    formData.append('yCol',yCol);
    const config = {
       headers: {
           'content-type': 'multipart/form-data'
       }
     }
    axios.post('http://localhost:3030/regression', formData, config)
      .then((res) => {
        console.log("file Saved");
        const output = res.data.data.mlData.match(/OUTPUT[\d\w\s.,:"()#+=\-\n\[\]]*OUTPUT/)[0].replace(/OUTPUT/,'').split(/\r?\n/);
        console.log(output);
        setMlOutput(output);
        setDisplayBrowser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const displayOutput = () => {
    const items = mlOutput.map((value, index) => {
      return(
        <p key={index}>{value}</p>
      )
    });
    return(items);
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
          {displayWrongFileType ? <Alert  severity="success">Please upload a CSV (comma separated value) file</Alert> : null }
        </Grid>
        {displayData && <TableDisplay data={data.slice(0, 10)} columns={columns} runMl={runMl}/> }
        {displayBrowser && <Browse/> }
        {displayBrowser && displayOutput()}
    </Grid>
  );
}


export default Upload;
