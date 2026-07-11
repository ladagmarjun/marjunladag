import React, { useCallback, useEffect, useState } from 'react';

interface ImageLightboxProps {
    images: string[];
    startIndex?: number;
    onClose: () => void;
}

export default function ImageLightbox({ images, startIndex = 0, onClose }: ImageLightboxProps) {
    const [index, setIndex] = useState(startIndex);

    const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    if (images.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-6"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-emerald-500 hover:text-emerald-500"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Main image */}
            <div className="relative flex max-h-[80vh] max-w-5xl items-center" onClick={(e) => e.stopPropagation()}>
                {images.length > 1 && (
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute -left-4 md:-left-16 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-emerald-500 hover:text-emerald-500 bg-black/40"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}

                <img
                    src={images[index]}
                    alt={`Image ${index + 1}`}
                    className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
                />

                {images.length > 1 && (
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute -right-4 md:-right-16 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-emerald-500 hover:text-emerald-500 bg-black/40"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
            </div>

            {/* Thumbnails / counter */}
            {images.length > 1 && (
                <div className="mt-6 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-14 w-14 overflow-hidden rounded-md border-2 transition ${i === index ? 'border-emerald-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
