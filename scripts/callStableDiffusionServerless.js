// Client-side JavaScript to call Vercel Serverless Function
async function callVercelFunction(imageUrl) {
    try {
      const response = await fetch(`https://treccy-serverside-magnus1000team.vercel.app/api/fetchImagesFromStableDiffusion?imageUrl=${imageUrl}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
  
      const data = await response.text(); 
      console.log('Server says:', data);
      
    } catch (error) {
      console.error('Failed to call Vercel function:', error);
    }
}
  
// Event listener for the button click
document.addEventListener('DOMContentLoaded', function() {
const generateImagesButton = document.getElementById('generate-images');

if (generateImagesButton) {
    generateImagesButton.addEventListener('click', function() {
    const imageUrl = 'https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/213577450_4438434366176827_6784966883954182148_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=ypEj71jsGU4AX_ifcaK&_nc_ht=scontent-ord5-1.xx&oh=00_AfBmmJsNTcXEjKtuLE4niHSm1BeyaBHV5ZLBfeVrXWRMDA&oe=651C4D2C'; // Replace this with the actual image URL
    callVercelFunction(imageUrl);
    });
} else {
    console.error('Button with ID "generate-images" not found');
}
});
  
