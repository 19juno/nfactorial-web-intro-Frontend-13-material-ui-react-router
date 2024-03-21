import CardComponent from "../CardComponent";
import { Grid } from "@mui/material";

function Cards({ crew }) {
  return (
    <Grid container spacing={2} direction="column" p={3}>
      <Grid item>
        <Grid container spacing={2}>
          {crew &&
            crew.map((el, index) => (
              <Grid key={index} item xs={4}>
                <CardComponent el={el} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Cards;
