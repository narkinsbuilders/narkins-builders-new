// src/components/seo-image/seo-image.tsx
import Image from 'next/image';
import { FC } from 'react';

// SEO-optimized alt text mappings
const imageAltTexts: Record<string, string> = {
  // Hill Crest Residency Images
  'hill-crest-residency-exterior-view-bahria-town-karachi.webp': 'Hill Crest Residency luxury apartment building exterior view in Bahria Town Karachi',
  'hill-crest-residency-apartment-interior-living-room-luxury.webp': 'Hill Crest Residency luxury apartment living room interior with modern furnishing',
  'hill-crest-residency-apartment-bedroom-master-suite.webp': 'Hill Crest Residency master bedroom with panoramic Bahria Town views',
  'hill-crest-residency-apartment-kitchen-modern-design.webp': 'Hill Crest Residency modern kitchen with premium appliances and granite countertops',
  'hill-crest-residency-apartment-bathroom-luxury-fixtures.webp': 'Hill Crest Residency luxury bathroom with modern fixtures and marble finishes',
  
  // Floor Plans
  'hill-crest-residency-2-bedroom-diamond-plan-1009-sqft.webp': 'Hill Crest Residency 2 bedroom Diamond apartment floor plan - 1009 square feet with Jinnah View',
  'hill-crest-residency-2-bedroom-gold-plan-933-sqft.webp': 'Hill Crest Residency 2 bedroom Gold apartment floor plan - 933 square feet with Safari View',
  'hill-crest-residency-2-bedroom-sapphire-plan-697-sqft.webp': 'Hill Crest Residency 2 bedroom Sapphire apartment floor plan - 697 square feet with Safari View',
  'hill-crest-residency-3-bedroom-platinum-plan-1490-sqft.webp': 'Hill Crest Residency 3 bedroom Platinum apartment floor plan - 1490 square feet with Jinnah View',
  'hill-crest-residency-4-bedroom-rhodium-plan-1996-sqft.webp': 'Hill Crest Residency 4 bedroom Rhodium apartment floor plan - 1996 square feet with Jinnah View',
  'hill-crest-residency-4-bedroom-sapphire-a-plan-1388-sqft.webp': 'Hill Crest Residency 4 bedroom Sapphire-A apartment floor plan - 1388 square feet with Safari View',
  
  // Narkin's Boutique Residency Images
  'narkins-boutique-residency-exterior-heritage-commercial-bahria-town.webp': "Narkin's Boutique Residency exterior view in Heritage Commercial area Bahria Town Karachi",
  'narkins-boutique-residency-amenities-pool-gym-facilities.webp': "Narkin's Boutique Residency premium amenities including swimming pool and gym facilities",
  'narkins-boutique-residency-sky-villa-duplex-penthouse.webp': "Narkin's Boutique Residency Sky Villa Duplex penthouse with private terrace",
  'narkins-boutique-residency-grand-lobby-reception-area.webp': "Narkin's Boutique Residency grand lobby and reception area with luxury finishes",
  
  // NBR Floor Plans
  'narkins-boutique-residency-2-bedroom-gold-1547-sqft-heritage-view.webp': "Narkin's Boutique Residency 2 bedroom Gold apartment - 1547 sq ft with Heritage Club & Safari View",
  'narkins-boutique-residency-3-bedroom-diamond-corner-2184-sqft.webp': "Narkin's Boutique Residency 3 bedroom Diamond Corner apartment - 2184 sq ft with Heritage Club & Theme Park View",
  'narkins-boutique-residency-3-bedroom-diamond-a-2121-sqft.webp': "Narkin's Boutique Residency 3 bedroom Diamond-A apartment - 2121 sq ft with Jinnah & Theme Park View",
  'narkins-boutique-residency-4-bedroom-platinum-a1-corner-2670-sqft.webp': "Narkin's Boutique Residency 4 bedroom Platinum A-1 Corner - 2670 sq ft with Jinnah & Safari View",
  'narkins-boutique-residency-4-bedroom-platinum-a1-boulevard-2486-sqft.webp': "Narkin's Boutique Residency 4 bedroom Platinum A-1 Boulevard - 2486 sq ft with Jinnah & Boulevard View",
  'narkins-boutique-residency-4-bedroom-platinum-a-2597-sqft.webp': "Narkin's Boutique Residency 4 bedroom Platinum-A apartment - 2597 sq ft with Jinnah & Theme Park View",
  
  // Amenities
  'hill-crest-residency-gym-fitness-center-modern-equipment.webp': 'Hill Crest Residency modern gym and fitness center with premium equipment',
  'hill-crest-residency-prayer-area-mosque-facility.webp': 'Hill Crest Residency in-house prayer area and mosque facility for residents',
  'hill-crest-residency-steam-bath-spa-wellness-center.webp': 'Hill Crest Residency steam bath and spa wellness center for residents',
  'hill-crest-residency-grand-lobby-reception-luxury.webp': 'Hill Crest Residency grand lobby and reception area with luxury finishes',
  
  'narkins-boutique-residency-gym-fitness-center.webp': "Narkin's Boutique Residency state-of-the-art gym and fitness center",
  'narkins-boutique-residency-kids-play-area.webp': "Narkin's Boutique Residency dedicated kids play area and children's facilities",
  'narkins-boutique-residency-steam-bath-wellness.webp': "Narkin's Boutique Residency steam bath and wellness center",
  'narkins-boutique-residency-grand-reception-lobby.webp': "Narkin's Boutique Residency grand reception and lobby area",
  'narkins-boutique-residency-snooker-recreation-room.webp': "Narkin's Boutique Residency snooker and recreation room for residents",
  'narkins-boutique-residency-high-speed-elevators.webp': "Narkin's Boutique Residency high-speed elevators and lift facilities",
  'narkins-boutique-residency-swimming-pool-indoor.webp': "Narkin's Boutique Residency indoor swimming pool facility",
  'narkins-boutique-residency-community-hall-seating.webp': "Narkin's Boutique Residency community hall with premium seating",
  'narkins-boutique-residency-underground-parking-5-floors.webp': "Narkin's Boutique Residency 5-floor underground car parking facility",
  
  // Completed Projects
  'al-arz-terrace-completed-project-narkins-builders-karachi.webp': "Al Arz Terrace completed residential project by Narkin's Builders in Karachi",
  'al-arz-homes-completed-project-narkins-builders-karachi.webp': "Al Arz Homes completed residential project by Narkin's Builders in Karachi", 
  'palm-residency-completed-project-frere-town-karachi.webp': "Palm Residency completed residential project in Frere Town Karachi by Narkin's Builders",
  'classic-heights-completed-project-sharfabad-karachi.webp': "Classic Heights completed residential project in Sharfabad Karachi by Narkin's Builders",
  
  // Company Images
  'narkins-builders-logo-30-years-experience.webp': "Narkin's Builders logo - 30 years of construction excellence in Karachi",
  'narkins-textile-industries-manufacturing-facility.webp': "Narkin's Textile Industries manufacturing facility in SITE area Karachi",
  'narkins-builders-eastern-wear-retail-outlet.webp': "Narkin's Builders eastern wear retail outlet in Karachi",
  
  // Innovation Images
  'smart-apartments-reliability-narkins-builders.webp': "Smart apartments and reliability features by Narkin's Builders",
  'smart-door-locks-narkins-apartments.webp': "Smart door lock technology in Narkin's luxury apartments", 
  'smart-wifi-switches-narkins-residency.webp': "Smart WiFi switches and home automation in Narkin's residencies"
};

interface SEOImageProps {
  src: string;
  alt?: string; // Optional override
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

const SEOImage: FC<SEOImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fill = false,
  style,
  onClick,
  loading = 'lazy'
}) => {
  // Extract filename from src path
  const filename = src.split('/').pop() || '';
  
  // Get SEO-optimized alt text or use provided alt or fallback
  const seoAltText = alt || imageAltTexts[filename] || `Narkin's Builders - ${filename.replace(/\.(webp|jpg|jpeg|png)$/i, '').replace(/-/g, ' ')}`;
  
  const imageProps = {
    src,
    alt: seoAltText,
    className,
    priority,
    sizes,
    quality,
    style,
    onClick,
    loading,
    ...(fill ? { fill: true } : { width, height })
  };

  return <Image {...imageProps} />;
};

export default SEOImage;
export { imageAltTexts };