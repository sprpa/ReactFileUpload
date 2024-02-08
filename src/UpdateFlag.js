import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function UpdateFlagForm() {
  const pathsAndFlagsUrl = "http://127.0.0.1:5000/get_all_paths_and_flags";
  const updateFlagUrl = "http://127.0.0.1:5000/update_flag";

  const [data, setData] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [newFlagValue, setNewFlagValue] = useState('');

  useEffect(() => {
    fetchPathsAndFlags();
  }, []);

  const fetchPathsAndFlags = async () => {
    try {
      const response = await axios.get(pathsAndFlagsUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching paths and flags: ", error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedPath = event.target.value;
    setSelectedPath(selectedPath);
    const selectedImageData = data.find((item) => item.path === selectedPath);
    if (selectedImageData) {
      setSelectedFlag(selectedImageData.flag);
      setNewFlagValue(selectedImageData.flag); // Set the default flag value
    } else {
      setSelectedFlag(null);
    }
  };

  const handleNewFlagValueChange = (event) => {
    setNewFlagValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(updateFlagUrl, { imagePath: selectedPath, newFlagValue });
      console.log(response.data);
      // Optionally update state or display a success message
    } catch (error) {
      console.error('Error updating flag:', error);
      // Optionally display an error message to the user
    }

    
  };

  return (
    <div>
      <div className="container py-5">
        <h1>Update Flag</h1>
        <div className="dropdown">
          <select className="form-select"  onChange={handleSelectChange} value={selectedPath || ""}>
            <option  value="">Select a path</option>
            {data.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>
        {selectedPath && (
          <div className="image-container py-5">
            <p>Current Flag: {selectedFlag}</p>
            <div className="d-flex flex-row "> 
                <div className="form-group me-5">
                <label htmlFor="newFlagValue">New Flag Value:</label>
                <select id="newFlagValue" className="form-control" value={newFlagValue} onChange={handleNewFlagValueChange}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
                </div>
                <button className="btn btn-info mt-3" onClick={handleSubmit}>Update Flag</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateFlagForm;
