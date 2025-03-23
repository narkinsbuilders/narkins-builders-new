import React, { Fragment, useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const AdsCampaign: React.FC = ({
  headline,
  image,
  features,
  onlyForm,
  residency,
}: {
  headline: string;
  image: string;
  onlyForm?: boolean,
  features: Array<string>;
  residency: "Narkin's Boutique Residency" | "Hill Crest Residency" | "General"
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  // const [residency, setResidency] = useState("Narkin's Boutique Residency");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const unitTag = await fetch('https://docs.cloud.kabeers.network/tests/work/theotherdev/contact-form-7.php').then(d => d.text());
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
        },
      );

      const data = await response.json();

      if (data.status === "mail_sent") {
        setResponseMessage(data.message);
      } else {
        setResponseMessage("There was an error sending your message.");
      }
    } catch (error) {
      setResponseMessage("There was an error sending your message.");
    }
  };

  return (
    <div className="container border my-5 rounded bg-white mx-auto py-5 p-4">
      <div className={`grid gap-6 ${onlyForm ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {!onlyForm && (
          <Fragment>
            <div className="image-column">
              <img
                src={image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKae8kU5_6tMlx_wVGwVbbPTMbhekm6x__Sg&s"}
                alt="Residency"
                className="w-full rounded h-auto mb-4"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl tracking-tight mb-2 text-black sm:text-1xl">
                {headline}
              </h2>
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
                {`Available on easy installment plans`}
              </h2>
              <div className="p-2 bg-neutral-100 border my-4 rounded-xl hover:bg-neutral-200">
                Bahria Town Karachi
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-800">
                <ul className="list-disc text-sm text-left pl-5 space-y-2">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </p>
            </div>
          </Fragment>
        )}
        <div className="form-column bg-[#C88A2D] rounded-lg p-4">
          <div className="flex justify-center items-center w-full">
            <img src="/default-avatar.webp" className="rounded-full border-white border-[2.5px]" style={{ width: '5rem', height: 'auto', }} />
          </div>
          <div className="flex justify-center items-center text-center text-white my-4 w-full">
            Fill this form below to schedule your site tour and recieve project details
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-50"
              >
                Name
              </label>
              <input
                type="text"
                name="name" required
                id="name"
                className="mt-1 block w-full rounded-md p-2 bg-tranparent shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-50"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email" required
                className="mt-1 block w-full rounded-md p-2 bg-tranparent border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-neutral-50"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                id="number" required
                className="mt-1 block w-full rounded-md p-2 bg-tranparent border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="Your Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            {/* <div>
              <label
                htmlFor="residency"
                className="block text-sm font-medium text-gray-700"
              >
                Residency
              </label>
              <select
                id="residency"
                name="residency" required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                value={residency}
                onChange={(e) => setResidency(e.target.value)}
              >
                <option value="Narkin's Boutique Residency">
                  Narkin's Boutique Residency
                </option>
                <option value="Hill Crest Residency">
                  Hill Crest Residency
                </option>
              </select>
            </div> */}
            <div className="pt-[5rem]">
              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                {`I am interested`.toUpperCase()}
              </button>
            </div>
          </form>
          {responseMessage && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsCampaign;
