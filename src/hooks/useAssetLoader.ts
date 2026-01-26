import { useState, useEffect } from 'react';

export const useAssetLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                // 1. Get all image URLs from assets folder
                // We use import.meta.glob to dynamically get all assets
                const imageModules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

                // Extract URLs (Vite returns modules with default export as the URL string for assets)
                const imageUrls = Object.values(imageModules).map((mod: any) => mod.default);

                console.log(`[Preloader] Found ${imageUrls.length} images to load.`);

                // 2. Create loading promises for each image
                const imagePromises = imageUrls.map((url) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = url;
                        // We resolve on both load and error to prevent blocking the app if an asset is missing
                        img.onload = () => resolve(url);
                        img.onerror = () => {
                            console.warn(`[Preloader] Failed to load image: ${url}`);
                            resolve(url);
                        };
                    });
                });

                // 3. Wait for fonts
                const fontPromise = document.fonts.ready;

                // 4. Wait for everything
                // We use Promise.allSettled to be extra safe, although the individual promises above handle errors.
                await Promise.all([...imagePromises, fontPromise]);

                // Minimum loading time to prevent flash
                // await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error("[Preloader] Error loading assets:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAssets();
    }, []);

    return isLoading;
};
