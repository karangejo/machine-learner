import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    console.log(props.columns)
    setLeft(props.columns);
    setRight([]);
  },[props.columns]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const handleCheckedRight = () => {
    let newRight = right.concat(leftChecked);
    let newLeft = not(left, leftChecked);
    setRight(newRight);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));
    console.log("left" + left);
    console.log("right" + right);
    console.log("leftChecked" + leftChecked);
    console.log("rightChecked" + rightChecked);
    console.log("checked" + checked);
    props.setX(newLeft);
    props.setY(newRight);
  };

  const handleCheckedLeft = () => {
    let newLeft = left.concat(rightChecked);
    let newRight = not(right, rightChecked);
    setLeft(newLeft);
    setRight(newRight);
    setChecked(not(checked, rightChecked));
    console.log("left" + left);
    console.log("right" + right);
    console.log("leftChecked" + leftChecked);
    console.log("rightChecked" + rightChecked);
    console.log("checked" + checked);
    props.setX(newLeft);
    props.setY(newRight);
  };



  const customList = (items, dir) => (
    <Paper className={classes.paper}>
      <h4>{(dir === "L") ? "X" : "Y"}</h4>
      <List dense component="div" role="list">
        {items.map(value => {
          const labelId = value;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left,"L")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>

        </Grid>
      </Grid>
      <Grid item>{customList(right,"R")}</Grid>
    </Grid>
  );
}
