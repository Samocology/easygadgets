import { removeBackground, loadImage } from './backgroundRemover';

export const processLogoBackground = async (logoPath: string): Promise<string> => {
  try {
    // Load the current logo
    const response = await fetch(logoPath);
    const blob = await response.blob();
    
    // Convert to HTMLImageElement
    const img = await loadImage(blob);
    
    // Remove background
    const processedBlob = await removeBackground(img);
    
    // Create object URL for the processed image
    return URL.createObjectURL(processedBlob);
  } catch (error) {
    console.error('Error processing logo background:', error);
    // Return original logo if processing fails
    return logoPath;
  }
};