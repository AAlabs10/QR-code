import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function QRGenerator() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    plate: "",
    serial: "",
    expDate: "",
  });

  const [showQR, setShowQR] = useState(false);
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Owner name required";
    if (!formData.address.trim()) newErrors.address = "Address required";

    if (!/^\d{11}$/.test(formData.phone))
      newErrors.phone = "Phone must be 11 digits";

    if (!/^[A-Z]{3}-\d{3}-[A-Z]{2}$/i.test(formData.plate))
      newErrors.plate = "Plate must be like ABC-123-XY";

    if (!formData.serial.trim()) newErrors.serial = "Serial number required";
    if (!formData.expDate) newErrors.expDate = "Expiration date required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateQR = () => {
    if (validateForm()) {
      setShowQR(true);
    }
  };

  const handleNewQR = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      plate: "",
      serial: "",
      expDate: "",
    });
    setErrors({});
    setShowQR(false);
  };

const qrData = `
Owner Name: ${formData.name}
Address: ${formData.address}
Phone Number: ${formData.phone}
Plate Number: ${formData.plate.toUpperCase()}
Serial Number: ${formData.serial}
Expiration Date: ${formData.expDate}
`.trim();

  return (
    <div style={{ maxWidth: 450, margin: "auto", textAlign: "center" }}>
      <h2>Owner QR Code Generator</h2>

      
      {!showQR && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            value={formData.name}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.name}</div>
          <br /><br />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.address}</div>
          <br /><br />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (11 digits)"
            value={formData.phone}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.phone}</div>
          <br /><br />

          <input
            type="text"
            name="plate"
            placeholder="Plate Number (ABC-123-XY)"
            value={formData.plate}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.plate}</div>
          <br /><br />

          <input
            type="text"
            name="serial"
            placeholder="Serial Number"
            value={formData.serial}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.serial}</div>
          <br /><br />

           <input
            type="date"
            name="expDate"
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.expDate}</div>
          <br /><br />


          <button onClick={handleGenerateQR}>Generate QR Code</button>
           <br /><br />

      <button
      onClick={() => navigate("/QRScanner")}
      style={{ backgroundColor: "#333", color: "#fff" }}
       >
      Scan Code
      </button>
        </>
      )}


      {showQR && (
        <>
          <QRCodeCanvas value={qrData} size={240} includeMargin />
          <br /><br />
          <p><strong>Expires on:</strong> {formData.expDate}</p>
          <button onClick={handleNewQR}>Generate New QR</button>

        <br /><br />

      <button
      onClick={() => navigate("/QRScanner")}
      style={{ backgroundColor: "#333", color: "#fff" }}
       >
      Scan Code
      </button>

        </>
      )}
    </div>
  );
}

export default QRGenerator;
