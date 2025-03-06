import React, { useEffect, useState } from "react";
import axios from "axios";

const DealerInfoModal = ({ product, onClose }) => {
  const [dealerInfo, setDealerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealerInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/dealerinfo/${product.dlid}`);
        setDealerInfo(response.data);
      } catch (error) {
        console.error("Error fetching dealer info:", error);
        setError("Failed to fetch dealer info");
      } finally {
        setLoading(false);
      }
    };

    fetchDealerInfo();
  }, [product.dlid]);

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>X</button>
        <h2>Dealer Information</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : dealerInfo ? (
          <div>
            {dealerInfo.shopPhotoData ? (
              <img src={`data:image/jpeg;base64,${dealerInfo.shopPhotoData}`} alt="Shop" style={imageStyle} />
            ) : (
              <p>No shop photo available</p>
            )}
            <p><strong>Name:</strong> {dealerInfo.username}</p>
            <p><strong>Email:</strong> {dealerInfo.email}</p>
            <p><strong>Location:</strong> {dealerInfo.location}</p>
          </div>
        ) : (
          <p>No information available</p>
        )}
      </div>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  position: "relative",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  borderRadius: "10px",
};

export default DealerInfoModal;