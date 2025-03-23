import Navigation from "@/components/navigation/navigation";
import AdsCampaign from "@/components/ads-campaign/ads-campaign";
import Footer from "@/components/footer/footer";
export default function AdsLandingPage() {
  return (
    <main>
      <Navigation />
      <div className="bg-white pt-[6rem]">
        <div className="relative isolate overflow-hidden py-20 pt-5 sm:py-[28px]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AdsCampaign residency="Narkin's Boutique Residency"
              onlyForm={false}
              image={'http://admin.narkinsbuilders.com/wp-content/uploads/2024/06/NBR-landing-page-photo.webp'}
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
      <Footer />
    </main>
  );
}
