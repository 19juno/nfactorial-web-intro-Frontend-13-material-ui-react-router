import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Default({ getSpaceXData }) {
  return (
    <Grid container spacing={2} direction="column" p={3}>
      <Grid item>
        <Typography>SpaceX launches</Typography>
      </Grid>
      <Grid item>
        <Link to="/crew">
          <Button variant="contained" onClick={getSpaceXData}>
            Get Crew
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
