import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import SkeletonSingle from "../CardComponent/SkeletonSingle";

export default function ModalWindow(props) {
  const { style, images, handleClose, isLoadingImages } = props;

  return (
    <Box sx={style}>
      {isLoadingImages ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <Grid item xs={4} key={index}>
              <SkeletonSingle />
            </Grid>
          ))}
        </Grid>
      ) : (
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {images.map((item, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item}?w=161&fit=crop&auto=format`}
                alt="item"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Link to="/crew">
        <Button onClick={handleClose}>Close</Button>
      </Link>
    </Box>
  );
}
