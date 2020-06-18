import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 20,
    margin: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 600,
  },
});

const SimpleCard = ({ data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {data.type}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ККД: {data.efficiency}%
        </Typography>
        {data.temperature && (
          <Typography className={classes.pos} color="textSecondary">
            Вихідна температура води: {data.temperature}℃
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
