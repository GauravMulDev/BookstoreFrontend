import React, { useRef, useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Divider } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAtom } from "jotai";
import { groupedItemsAtom } from "../Store/store.js";
import { makeStyles } from "@mui/styles";
import InputMask from "react-input-mask";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main
  },
  sectionTitle: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary
  },
  contentText: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 300,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  totalAmount: {
    marginTop: theme.spacing(2.5),
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500
  },
  button: {
    marginTop: theme.spacing(3),
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));
function Checkout({ cartItems = [], setCartItems }) {
  const classes = useStyles();
  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  const slipRef = useRef(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [groupedItems, setGroupedItems] = useAtom(groupedItemsAtom);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const validatePaymentDetails = () => {
    const errors = {};

    if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
      errors.cardNumber = "Card number should be 16 digits.";
    }
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      errors.expiryDate = "Expiry date should be in MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      errors.cvv = "CVV should be 3 or 4 digits.";
    }
    if (!paymentDetails.cardholderName.trim()) {
      errors.cardholderName = "Cardholder Name is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCardNumberChange = event => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    let formatted = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += "-";
      }
      formatted += value[i];
    }
    setPaymentDetails(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryDateChange = event => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    let formatted = value;
    if (value.length > 2) {
      formatted = value.substring(0, 2) + "/" + value.substring(2);
    }
    setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handlePayment = () => {



    setCardNumber(paymentDetails.cardNumber);
    setExpiryDate(paymentDetails.expiryDate);
    setCardHolderName(paymentDetails.cardholderName);

    setPaymentSuccessful(true);
    setCartItems([]);
 

  };

 //NOTE - Download pdf function
  const downloadPDF = () => {
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.style.display = "none"; 

    html2canvas(slipRef.current).then(canvas => {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth * 0.8; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      
      const x = (pageWidth - imgWidth) / 2;
      const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 4 + 1; 

    
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        x,
        y,
        imgWidth,
        imgHeight
      );

  //NOTE - Calculating total pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setTextColor(235); 
        pdf.setFontSize(40);
        pdf.text(
          "Bookstore Name",
          pageWidth / 2,
          pdf.internal.pageSize.getHeight() / 2,
          { angle: 45, align: "center" }
        );
      }

      pdf.save("payment-slip.pdf");
      downloadButton.style.display = "block"; 
    });
  };

  //NOTE - Calculating total amount
  const totalAmount = groupedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <div className="payment-container">
      {!isPaymentSuccessful ? (
        <>
          <form onSubmit={handlePayment}>
            <TextField
              required
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              fullWidth
              value={paymentDetails.cardNumber}
              onChange={handleCardNumberChange}
              style={{
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
              }}
            />
            <TextField
              required
              name="expiryDate"
              label="Expiry Date"
              variant="outlined"
              fullWidth
              style={{
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
              }}
              value={paymentDetails.expiryDate}
              onChange={handleExpiryDateChange}
            />

            <TextField
              required
              name="cvv"
              type={showCVV ? "text" : "password"}
              label="CVV"
              variant="outlined"
              fullWidth
              style={{
                marginBottom: "0px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}
              value={paymentDetails.cvv}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowCVV(!showCVV)}>
                    {showCVV ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              
              }}
            />

            <TextField
              required
              name="cardholderName"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cardholder Name"
              type="text"
              style={{
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
              }}
              value={paymentDetails.cardholderName}
              onChange={handleChange}
              inputProps={{
                pattern: "^[A-Za-z ]+$", 
                title:
                  "Cardholder name should only contain alphabets and spaces."
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="confirm-button"
            >
              Confirm Payment
            </Button>
          </form>
        </>
      ) : (
        <div ref={slipRef} className="receipt-container">
          <Paper elevation={3} className="paper-container">
            <Typography variant="h5" align="center" className="title">
              <strong> Bookstore Payment Receipt</strong>
            </Typography>
            <Divider className="divider-margin" />

            <Typography
              variant="h6"
              style={{ color: "#131921", marginBottom: "10px" }}
            >
              <strong> Purchased Items:</strong>
            </Typography>
            {groupedItems.map(item => (
              <div key={item._id} style={{ marginBottom: "10px" }}>
                <Typography variant="body1">
                  <strong>
                    {item.title} - ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </strong>
                </Typography>
              </div>
            ))}

            <Divider style={{ margin: "15px 0" }} />

            <Typography variant="body1">
              <strong> Card Holder: {cardHolderName}</strong>
            </Typography>
            <Typography variant="body1">
              <strong>
                {" "}
                Card Number: **** **** **** {cardNumber.slice(-4)}
              </strong>
            </Typography>
            <Typography variant="body1">
              {" "}
              <strong>Expiry Date: </strong> {expiryDate}
            </Typography>
            <Typography variant="body1">
              <strong> Time & Date: {new Date().toLocaleString()}</strong>
            </Typography>

            <Typography
              variant="h6"
              style={{ color: "#131921", marginTop: "15px" }}
            >
              <strong> Shipping Details: </strong>
            </Typography>
            <Typography variant="body1">
              <strong> Address: Mock Address, 123 St</strong>
            </Typography>
            <Typography variant="body1">
              <strong> Mobile: 123-456-7890</strong>{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Expected Time of Delivery: 2-4 PM</strong>
            </Typography>

            <Typography
              variant="h6"
              style={{ color: "#131921", marginTop: "15px" }}
            >
              <strong> Total Amount: ${totalAmount.toFixed(2)}</strong>
            </Typography>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                id="downloadButton"
                variant="contained"
                color="primary"
                className="center-buttons"
                onClick={downloadPDF}
              >
                Download as PDF
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
}

export default Checkout;
