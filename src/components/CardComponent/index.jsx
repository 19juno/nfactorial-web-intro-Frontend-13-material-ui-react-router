import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import ModalWindow from "../ModalWindow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CardComponent({ el }) {
  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const handleOpen = () => {
    setIsLoadingImages(true);
    setOpen(true);
    axios
      .get(`https://api.spacexdata.com/v4/launches/${el.launches}`)
      .then((res) => {
        setImages(res.data.links.flickr.original);
        console.log(images);
        setIsLoadingImages(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingImages(false);
      });
  };
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia sx={{ height: 400 }} image={el.image} title={el.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {el.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Agency = {el.agency} ; Status = {el.status}
        </Typography>
      </CardContent>
      <Link to={`/crew/${el.launches}`}>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Show More
          </Button>
        </CardActions>
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <ModalWindow
            style={style}
            handleClose={handleClose}
            images={images}
            isLoadingImages={isLoadingImages}
          />
        </div>
      </Modal>
    </Card>
  );
}
