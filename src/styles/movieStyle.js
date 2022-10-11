export const generalStyle = {
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    padding: "30px",
    zIndex: 3,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 2,
  },
};

export const movieStyle = {
  bannerWrapper: {
    position: "relative",
    width: "100%",
    height: "500px",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    transition: "all 0.5s",
  },
};
