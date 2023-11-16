// Client-side JavaScript to call Vercel Serverless Function
async function callVercelFunction(imageUrl) {
try {
    console.log(`Function called with image URL: ${imageUrl}`);
    
    const response = await fetch(`https://treccy-serverside-magnus1000team.vercel.app/api/fetchImagesFromStableDiffusion?imageUrl=${imageUrl}`);
    
    if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json(); 
    console.log('Received data from server:', data);
    
    // Assume data.images is an array of base64-encoded images
    for (let i = 0; i < data.images.length; i++) {
    const imageId = `generated-image-${i + 1}`;
    const imageElement = document.getElementById(imageId);
    
    if (imageElement) {
        const base64Image = `data:image/png;base64,${data.images[i]}`;
        console.log(`Set image for ${imageId}: ${base64Image}`);
        imageElement.src = base64Image;
        imageElement.removeAttribute("srcset"); // Remove srcset to ensure src is used
    } else {
        console.error(`Image element with ID ${imageId} not found`);
    }
    }
    
} catch (error) {
    console.error('Failed to call Vercel function:', error);
}
}

// Event listener for the button click
document.addEventListener('DOMContentLoaded', function() {
const generateImagesButton = document.getElementById('generate-images');

if (generateImagesButton) {
    generateImagesButton.addEventListener('click', function() {
    console.log('Button clicked');
    const imageUrl = 'https://uploads-ssl.webflow.com/6516d9b9463a304f3ebdcc07/6516ef10992eb37e5eb9e667_213577450_4438434366176827_6784966883954182148_n%201.jpg';
    callVercelFunction(imageUrl);
    });
} else {
    console.error('Button with ID "generate-images" not found');
}
});
