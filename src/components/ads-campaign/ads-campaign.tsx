import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Input } from "@/components/ui/input"; // shadcn Input
import { Label } from "@/components/ui/label"; // shadcn Label
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn Card
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // shadcn Avatar

const AdsCampaign: React.FC<{
  headline: string;
  image: string;
  onlyForm?: boolean;
  features: Array<string>;
  residency: "Narkin's Boutique Residency" | "Hill Crest Residency" | "General";
}> = ({ headline, image, onlyForm, features, residency }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const unitTag = await fetch(
      "/api/get-contact-form-7-key"
    ).then((d) => d.text());

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
    formData.append("your-property", residency);

    try {
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
      } else {
        setError(true);
        setResponseMessage("There was an error sending your message.");
      }
    } catch (error) {
      setError(true);
      setResponseMessage("There was an error sending your message.");
    } finally {
      setLoading(false);
    }
  };

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
        <div>
          <Label htmlFor="name" className="text-neutral-700">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 bg-transparent text-black placeholder:text-neutral-700"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-neutral-700">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Your Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="mt-1 bg-transparent text-black placeholder:text-neutral-700"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-black text-white hover:bg-black/90"
        >
          {loading ? "Submitting..." : "I AM INTERESTED"}
        </Button>
      </form>
      {responseMessage && (
        <div className={`mt-4 p-4 bg-${error ? "red" : "green"}-100 border border-${error ? "red" : "green"}-400 text-${error ? "red" : "green"}-700 rounded`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default AdsCampaign;