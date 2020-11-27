import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import "./VideoModal.css";
function VideoModal(props) {
  const [statePlaying, setStatePlaying] = useState(false);
  const handleReady = () => {
    setStatePlaying(true);
  };
  return (
    <div>
      {props && props.data && props.data.url && (
        <Modal
          {...props}
          size="xl"
          animation={false}
          dialogClassName="video__modal"
          aria-labelledby="contained-modal-video-vcenter"
          centered
        >
          <Modal.Body className="video__modal__no-padding">
            <div className="video__modal__body">
              <ReactPlayer
                url={props.data.url}
                muted={true}
                light={true}
                controls={true}
                playing={statePlaying}
                onReady={handleReady}
                width="100%"
                height="auto"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="video__modal__no-padding">
            <Button
              className="howfree__submit video__modal__button-small"
              onClick={props.onHide}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default VideoModal;
