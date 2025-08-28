import Navigation from "@/components/layout/navigation/navigation";
import AdsCampaign from "@/components/features/ads-campaign/ads-campaign";
import Footer from "@/components/layout/footer/footer";
export default function AdsLandingPage() {
 return (
  <main>
   <Navigation />
   <div className="bg-white pt-[6rem]">
    <div className="relative isolate overflow-hidden py-20 pt-5 sm:py-[28px]">
     <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <AdsCampaign residency="Narkin's Boutique Residency"
       onlyForm={false}
       image={'/media/nbr/exterior/narkins-boutique-residency-navigation-thumbnail.webp'}
       headline={"2, 3 & 4 Bedroom Luxury Apartments"}
       features={[
        "4 mins from the main gate",
        "Construction on full swing",
        "Smart Apartment",
        "Capsule lofts, Reception area & standby generators",
        "Gym, community hall, indoor swimming pool",
        "7 floor carparking",
        "Inhouse Mosque",
       ]}
      />
     </div>
    </div>
   </div>
   <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
  </main>
 );
}
