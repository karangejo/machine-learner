import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import axios from  'axios';



function Browse() {

  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/models')
      .then((res) => {
        console.log(res.data);
        setFileNames(res.data);
      })
  },[])

  const downloadFile = async (event) => {
    const fileName = event.target.getAttribute('value')
    console.log(fileName);
    window.open('http://localhost:3030/download?fileName='+fileName);
  }

  const displayFileNames = () => {
    const items = fileNames.map((value, index) => {
      const name = value
      return(
        <Link key={index} href="#" value={name} onClick={downloadFile}>{name}</Link>
      );
    });
    return(fileNames ? items : null);
  }

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      {displayFileNames()}
    </Grid>
  );
}


export default Browse;
