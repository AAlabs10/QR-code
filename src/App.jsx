import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import QRGenerator from "./component/QRGenerator";
import { QRCodeSVG } from "qrcode.react";
import QRScanner from "./component/QRScanner";

function App() {

  const downloadQR = () => {
  const canvas = document.querySelector("canvas");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qr-code.png";
  downloadLink.click();
};

  return (
    <div style={{ padding: 20 }}>
      {/* <h2>My QR Code</h2> */}

      {/* <QRCodeCanvas
        value="https://example.com"
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      /> */}
      
      <QRGenerator />
      <QRScanner />
      
    </div>
  );
}

export default App;
