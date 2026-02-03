import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    plate: "",
    serial: "",
  });

  const [showQR, setShowQR] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Owner name required";
    if (!formData.address.trim()) newErrors.address = "Address required";

    // Phone validation: exactly 11 digits
    if (!/^\d{11}$/.test(formData.phone))
      newErrors.phone = "Phone must be 11 digits";

    // Plate validation: format ABC-123-XY
    if (!/^[A-Z]{3}-\d{3}-[A-Z]{2}$/i.test(formData.plate))
      newErrors.plate = "Plate must be like ABC-123-XY";

    if (!formData.serial.trim()) newErrors.serial = "Serial number required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Generate QR button click
  const handleGenerateQR = () => {
    if (validateForm()) {
      setShowQR(true);
    }
  };

  // Generate new QR → reset form
  const handleNewQR = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      plate: "",
      serial: "",
    });
    setErrors({});
    setShowQR(false);
  };

  const qrData = `
Owner Name: ${formData.name}
Address: ${formData.address}
Phone Number: ${formData.phone}
Plate Number: ${formData.plate}
Serial Number: ${formData.serial}
`;

  return (
    <div style={{ maxWidth: 450, margin: "auto", textAlign: "center" }}>
      <h2>Owner QR Code Generator</h2>

      {/* INPUT FORM */}
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

          <button onClick={handleGenerateQR}>Generate QR Code</button>
        </>
      )}

      {/* QR CODE */}
      {showQR && (
        <>
          <QRCodeCanvas value={qrData} size={240} includeMargin />
          <br /><br />
          <button onClick={handleNewQR}>Generate New QR</button>
        </>
      )}
    </div>
  );
}

export default QRGenerator;
