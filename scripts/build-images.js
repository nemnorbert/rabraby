import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [200, 400, 800, 1000, 1200, 1500];
const inDir = path.join(__dirname, '..', 'src', 'media', 'hero');
const outDir = path.join(__dirname, '..', 'public', 'hero');

async function generateImages() {
    console.log("Input directory:", inDir);
    console.log("Output directory:", outDir);
    
    if (!fs.existsSync(inDir)) {
        console.error(`Input directory does not exist: ${inDir}`);
        return;
    }

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    
    try {
        const files = fs.readdirSync(inDir).filter(file =>
            file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.png')
        );
    
        if (files.length === 0) {
            console.log('No images found.');
            return;
        }
        console.log("Found files:", files);
        
        if (files.length === 0) {
            console.log('No images found.');
            return;
        }

        const promises = files.map(async (file) => {
            const filename = path.basename(file, path.extname(file));
            const filePath = path.join(inDir, file);

            return Promise.all(sizes.map(size => 
                sharp(filePath)
                    .resize({
                        width: size,
                        //height: size,
                        //fit: sharp.fit.cover
                    })
                    .toFormat('webp')
                    .toFile(path.join(outDir, `${filename}-${size}.webp`))
                    .then(() => console.log(`Generated ${filename}-${size}.webp`))
                    .catch(err => console.error(`Error resizing image ${file} to size ${size}:`, err))
            ));
        });

        await Promise.all(promises);
        console.log("Image generation completed.");
    } catch (err) {
        console.error('Error finding images:', err);
    }
}

generateImages();