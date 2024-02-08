import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function ImageCarousel() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get_image_paths');
            const imageData = response.data;

            // Filter images based on the flag value being true
            const filteredImages = imageData.filter(item => item.flag === 'True');

            // Extract paths from the filtered images
            const imagePaths = filteredImages.map(item => item.path);

            setImages(imagePaths);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    return (
        <div className="container py-5">
            <h2>Image Carousel</h2>
            <OwlCarousel className='owl-theme py-3' loop margin={10} nav>
                {images.map((image, index) => (
                    <div key={index} className='item'>
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </OwlCarousel>
        </div>
    );
}

export default ImageCarousel;
