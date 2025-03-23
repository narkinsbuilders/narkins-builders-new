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
            <AdsCampaign residency="Hill Crest Residency"
              onlyForm={false}
              image={'http://admin.narkinsbuilders.com/wp-content/uploads/2024/06/Picture1.webp'}
              headline={"2, 3 & 4 Bedroom Luxury Apartments "}
              features={[
                "Main Jinnah Avenue, 2 mins from the main gate",
                "Smart Apartments",
                "High speed lifts, Reception area & standby generators",
                "Gym, community hall, steam bath",
                "Inhouse Mosque"
              ]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
