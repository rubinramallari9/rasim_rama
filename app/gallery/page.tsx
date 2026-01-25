'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

type Category = 'all' | 'infrastructure' | 'turbine';

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const galleryImages: GalleryImage[] = [
  // Category 1 - Infrastructure (folder 1)
  { src: '/1/work-1.jpeg', alt: 'Hydropower infrastructure installation', category: 'infrastructure' },
  { src: '/1/work-1-1.jpeg', alt: 'Industrial piping system', category: 'infrastructure' },
  { src: '/1/work-1-2.jpeg', alt: 'Hydropower plant equipment', category: 'infrastructure' },
  // Category 2 - Turbine Installation (folder 2)
  { src: '/2/work-2-1.jpeg', alt: 'Generator installation', category: 'turbine' },
  { src: '/2/work-2-2.jpeg', alt: 'Turbine assembly', category: 'turbine' },
  { src: '/2/work-2-3.jpeg', alt: 'Industrial turbine', category: 'turbine' },
  { src: '/2/work-2-4.jpeg', alt: 'Hydropower generator', category: 'turbine' },
  { src: '/2/work-2-5.jpeg', alt: 'Turbine maintenance', category: 'turbine' },
  { src: '/2/work-2-6.jpeg', alt: 'Generator components', category: 'turbine' },
  { src: '/2/work-2-7.jpeg', alt: 'Installation process', category: 'turbine' },
  { src: '/2/work-2-8.jpeg', alt: 'Industrial equipment', category: 'turbine' },
  { src: '/2/work-2-9.jpeg', alt: 'Turbine installation', category: 'turbine' },
  { src: '/2/work-2-10.jpeg', alt: 'Hydropower machinery', category: 'turbine' },
  { src: '/2/work-2-11.jpeg', alt: 'Generator assembly', category: 'turbine' },
  { src: '/2/work-2-12.jpeg', alt: 'Industrial installation', category: 'turbine' },
  { src: '/2/work-2-13.jpeg', alt: 'Turbine components', category: 'turbine' },
  { src: '/2/work-2-14.jpeg', alt: 'Hydropower installation', category: 'turbine' },
  { src: '/2/work-2-15.jpeg', alt: 'Generator installation project', category: 'turbine' },
  { src: '/2/work-2-16.jpeg', alt: 'Industrial turbine system', category: 'turbine' },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setImageIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (imageIndex + 1) % filteredImages.length
      : (imageIndex - 1 + filteredImages.length) % filteredImages.length;
    setImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [imageIndex, filteredImages]);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.gallery.allWork },
    { key: 'infrastructure', label: t.gallery.category1 },
    { key: 'turbine', label: t.gallery.category2 },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 border-b border-gray-100">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
            >
              <span>&larr;</span>
              <span>Back to Home</span>
            </Link>
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mb-4 sm:mb-6">
              Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.08] tracking-tight mb-6">
              {t.gallery.heading}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
              {t.gallery.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 sm:py-10 border-b border-gray-100 sticky top-20 lg:top-24 bg-white z-40">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 6}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900">
                      {t.gallery.viewProject}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Let us bring our expertise to your next hydropower project.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/80 hover:text-white transition-colors z-10"
            aria-label={t.gallery.close}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
            {imageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
