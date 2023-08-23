import React, { useState, useEffect } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { dumpDatabase } from "../Services/service";
import { useNavigate } from "react-router-dom";
import { uploadBookFile } from "../Services/service";
const ImportExportComponent = () => {
  const [dbName, setDbName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/error");
    }
  }, [navigate, userRole]);
  const fileInputRef = React.createRef();
  const token = localStorage.getItem("jwtToken");
  const handleFileUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;


    if (!collectionName) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please Add Collection Name."
      });
    }

   try{  const response = await uploadBookFile(file, dbName, collectionName);
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Data imported successfully."
    })}
      catch(error){
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error importing data";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message
        })
      }}
    


      const handleDump = async () => {
        if (!dbName) {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Please provide a Database Name for exporting."
            });
            return;
        }

        try {
            const response = await dumpDatabase(dbName);
            if (!response.data) {
                throw new Error("No data received from server.");
            }

            const contentDisposition = response.headers["content-disposition"];
            let fileName = "downloaded_file";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="([^"]+)"/);
                if (match && match[1]) fileName = match[1];
            }

            const contentType = response.headers["content-type"] || "application/octet-stream";
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Data has been downloaded successfully."
            });
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message || "Error exporting data";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message
            });
        }
    };
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto", 
        marginTop: "5rem" //
      }}
    >
      <Typography variant="h6" align="center">
        Data Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <TextField
          label="Database Name"
          variant="outlined"
          value={dbName}
          onChange={e => setDbName(e.target.value)}
        />
        <TextField
          label="Collection Name "
          variant="outlined"
          value={collectionName}
          onChange={e => setCollectionName(e.target.value)}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInputRef.current.click()}
          disabled={!collectionName}
        >
          Import Data
        </Button>

        <Button variant="contained" color="secondary" onClick={handleDump}>
          Dump Data
        </Button>
      </Box>
    </Box>
  );
};

export default ImportExportComponent;
