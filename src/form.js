import React, {useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import File from './File';

function Form() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [flag, setFlag] = useState('True'); // Default value
   // State to store API data length

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFlagChange = (e) => {
    setFlag(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('flag', flag);

    try {
      const response = await axios.post('http://localhost:5000/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      // Reset form fields after successful submission if needed
      setFile(null);
      setCategory('');
      setFlag('True');
      // Set API data length
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='container py-5'>
      <h4>Upload Your Image</h4>
      <form encType="multipart/form-data" className="mt-4">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex justify-content-between">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Select a file to upload:</label>
              <input className="form-control" name="file" type="file" id="formFile" onChange={handleFileChange}  required/>
            </div>
            <div className="form-group mt-4 mx-4">
              <button className="btn btn-info" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <label htmlFor="category" className="form-label">Category:</label>
              <input type="text" name="category" value={category} className="form-control w-75" onChange={handleCategoryChange} required/>
            </div>
            <div>
              <label htmlFor="flag" className="form-label">Flag:</label>
              <select name="flag" id="flag" className="form-control" value={flag} onChange={handleFlagChange} required>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
          </div>
          <div>
           <File />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
