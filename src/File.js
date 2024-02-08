import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function File() {
    const [fileCount, setFileCount] = useState(null);

    useEffect(() => {
        fetchFileCount();
    }, []);

    const fetchFileCount = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/file_count');
            setFileCount(response.data);
        } catch (error) {
            console.error('Error fetching file count:', error);
        }
    };

    return (
        <div className='container'>
            <h1>{fileCount}</h1>
        </div>
    );
}

export default File;
