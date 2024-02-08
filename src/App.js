import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const url = "http://127.0.0.1:5000/get_all_paths_and_flags";
  const [data, setData] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const handleSelectChange = (event) => {
    setSelectedPath(event.target.value);
  };

  return (
    <div className="container py-5">
      <h1>Images</h1>
      <div className="dropdown">
        <select className="form-select" onChange={handleSelectChange} value={selectedPath || ""}>
          <option value="">Select a path</option>
          {data.map((item, index) => (
            <option key={index} value={item.path}>
              {item.path}
            </option>
          ))}
        </select>
      </div>
      {selectedPath && (
        <div className="image-container">
          <img className="img-fluid my-5" src={selectedPath} alt="Selected" />
        </div>
      )}
  </div>

  );
}

export default App;
