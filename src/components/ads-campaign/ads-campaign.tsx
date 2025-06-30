import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Building2, Building, MapPin } from "lucide-react";
import { useFormAnalytics } from "@/hooks/useAnalytics";
import { event as trackEvent } from "@/lib/gtag";

// Residency options with details
const residencyOptions = [
  {
    id: "nbr",
    value: "Narkins Boutique Residency",
    label: "Narkins Boutique Residency (NBR)",
    shortLabel: "NBR",
    description: "Luxury apartments with modern amenities",
    features: ["2, 3 & 4 Bedroom Apartments", "Premium Location", "Modern Architecture"],
    icon: Building2,
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    id: "hcr",
    value: "Hill Crest Residency",
    label: "Hill Crest Residency (HCR)",
    shortLabel: "HCR",
    description: "Serene hillside living with panoramic views",
    features: ["2, 3 & 4 Bedroom Apartments", "Scenic Hill Views", "Premium Finishes"],
    icon: Building,
    color: "bg-green-50 border-green-200 text-green-800"
  }
];

interface AdsCampaignProps {
  headline?: string;
  image?: string;
  onlyForm: boolean;
  features: Array<string>;
  residency: "Narkins Boutique Residency" | "Hill Crest Residency" | "General";
}

const AdsCampaign: React.FC<AdsCampaignProps> = ({ 
  headline, 
  image, 
  onlyForm, 
  features, 
  residency 
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedResidency, setSelectedResidency] = useState(
    residency === "General" ? residencyOptions[0] : 
    residencyOptions.find(option => option.value === residency) || residencyOptions[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  
  const { trackFormStart, trackFormSubmit, trackFormError } = useFormAnalytics();

  // Track form start when user begins typing
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('quote');
      
      // Track which property they're interested in
      trackEvent({
        action: 'property_interest',
        category: 'Lead Generation',
        label: selectedResidency.value,
      });
    }
  };

  // Handle residency selection
  const handleResidencySelect = (option: typeof residencyOptions[0]) => {
    setSelectedResidency(option);
    setIsDropdownOpen(false);
    
    // Track property selection
    trackEvent({
      action: 'property_selection',
      category: 'Lead Generation',
      label: option.value,
    });
  };

  // Track field completion
  const handleFieldComplete = (fieldName: string) => {
    trackEvent({
      action: 'form_field_complete',
      category: 'Lead Generation',
      label: fieldName,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    // Track form submission attempt
    trackEvent({
      action: 'form_submit_attempt',
      category: 'Lead Generation',
      label: selectedResidency.value,
    });

    try {
      const unitTag = await fetch("/api/get-contact-form-7-key").then((d) => d.text());

      const formData = new FormData();
      formData.append("_wpcf7", "245");
      formData.append("_wpcf7_version", "5.9.5");
      formData.append("_wpcf7_locale", "en_US");
      formData.append("_wpcf7_unit_tag", unitTag);
      formData.append("_wpcf7_container_post", "634");
      formData.append("_wpcf7_posted_data_hash", "");
      formData.append("your-name", name);
      formData.append("your-number", number);
      formData.append("your-email", email);
      formData.append("your-property", selectedResidency.value);

      const response = await fetch(
        "https://admin.narkinsbuilders.com/wp-json/contact-form-7/v1/contact-forms/245/feedback",
        {
          credentials: "include",
          body: formData,
          method: "POST",
          mode: "cors",
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "mail_sent") {
        setResponseMessage(data.message);
        
        // Track successful form submission
        trackFormSubmit('quote', selectedResidency.value);
        
        // Track as conversion
        trackEvent({
          action: 'conversion',
          category: 'Lead Generation',
          label: `Quote Request - ${selectedResidency.value}`,
          value: 1,
        });

        // Reset form
        setName("");
        setEmail("");
        setNumber("");
      } else {
        setError(true);
        setResponseMessage("There was an error sending your message. Please try again.");
        trackFormError('quote', 'submission_failed');
      }
    } catch (error) {
      setError(true);
      setResponseMessage("There was an error sending your message.");
      trackFormError('quote', 'network_error');
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = selectedResidency.icon;

  return (
    <div className={`grid gap-6 ${onlyForm ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
      {!onlyForm && (
        <>
          <div className="image-column">
            <img
              src={image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKae8kU5_6tMlx_wVGwVbbPTMbhekm6x__Sg&s"}
              alt="Residency"
              className="w-full rounded-lg h-auto mb-4"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl tracking-tight mb-2 text-black sm:text-1xl">
              {headline}
            </h2>
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
              Available on easy installment plans
            </h2>
            <div className="p-2 bg-neutral-100 border my-4 rounded-xl hover:bg-neutral-200">
              <MapPin className="inline w-4 h-4 mr-2" />
              Bahria Town Karachi
            </div>
            <ul className="list-disc text-sm text-left pl-5 space-y-2">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        {/* Residency Selection Dropdown */}
        <div>
          <Label htmlFor="residency" className="text-neutral-700 font-medium">
            I'm interested in
          </Label>
          <div className="relative mt-1">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {selectedResidency.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedResidency.description}
                    </div>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </button>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {residencyOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleResidencySelect(option)}
                      className="w-full px-3 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-start space-x-3">
                        <OptionIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-500 mb-2">
                            {option.description}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {option.features.map((feature, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${option.color}`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <Label htmlFor="name" className="text-neutral-700">
            Full Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleFormStart();
            }}
            onBlur={() => name && handleFieldComplete('name')}
            required
            className="mt-1 bg-transparent text-black placeholder:text-neutral-700"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-neutral-700">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleFormStart();
            }}
            onBlur={() => email && handleFieldComplete('email')}
            required
            className="mt-1 bg-transparent text-black placeholder:text-neutral-700"
          />
        </div>
        
        <div>
          <Label htmlFor="number" className="text-neutral-700">
            Phone Number
          </Label>
          <Input
            type="tel"
            id="number"
            placeholder="Enter your phone number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              handleFormStart();
            }}
            onBlur={() => number && handleFieldComplete('phone')}
            required
            className="mt-1 bg-transparent text-black placeholder:text-neutral-700"
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-black text-white hover:bg-black/90 py-3 text-base font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            `Get Information About ${selectedResidency.shortLabel}`
          )}
        </Button>
      </form>
      
      {responseMessage && (
        <div className={`mt-4 p-4 rounded-lg border ${
          error 
            ? "bg-red-50 border-red-200 text-red-700" 
            : "bg-green-50 border-green-200 text-green-700"
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {error ? "❌" : "✅"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {responseMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsCampaign;