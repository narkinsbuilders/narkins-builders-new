import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
// Define FAQ interface locally to avoid server-side imports
interface FAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  priority: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  // Data source options
  source?: 'tina' | 'static' | 'mixed';
  collection?: string;           // TinaCMS collection name
  category?: string;             // FAQ category filter
  projectId?: string;            // Project-specific FAQs
  staticFaqs?: FAQItem[];        // Fallback static FAQs
  tags?: string[];               // Filter by tags
  limit?: number;                // Limit number of FAQs shown
  
  // Display options
  title?: string;
  description?: string;
  pageUrl: string;
  contextType?: 'general' | 'property' | 'investment';
  showContactCTA?: boolean;
  searchable?: boolean;
  
  // TinaCMS integration
  tinaFaqs?: any[];              // FAQs from TinaCMS
}

export default function FAQ({ 
  source = 'static',
  collection,
  category,
  projectId,
  staticFaqs = [],
  tags,
  limit,
  title = "Frequently Asked Questions",
  description,
  pageUrl,
  contextType = 'general',
  showContactCTA = true,
  searchable = false,
  tinaFaqs
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [displayFaqs, setDisplayFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);

  // Load FAQs based on provided data
  useEffect(() => {
    let faqs: FAQ[] = [];

    if (tinaFaqs && tinaFaqs.length > 0) {
      // Use TinaCMS data
      faqs = tinaFaqs.map((item, index) => ({
        id: item.id || `tina-${index}`,
        question: item.question,
        answer: item.answer,
        tags: item.tags || [],
        priority: item.priority || index + 1
      }));
    } else if (staticFaqs && staticFaqs.length > 0) {
      // Use static FAQs data
      faqs = staticFaqs.map((item, index) => ({
        id: `static-${index}`,
        question: item.question,
        answer: item.answer,
        tags: [],
        priority: index + 1
      }));
    }

    // Filter by tags if provided
    if (tags && tags.length > 0) {
      faqs = faqs.filter(faq => 
        faq.tags.some(tag => tags.includes(tag))
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      faqs = faqs.slice(0, limit);
    }

    // Sort by priority
    faqs.sort((a, b) => a.priority - b.priority);

    setDisplayFaqs(faqs);
    setFilteredFaqs(faqs);
  }, [staticFaqs, tags, limit, tinaFaqs]);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaqs(displayFaqs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = displayFaqs.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredFaqs(filtered);
    setOpenIndex(null); // Close any open FAQ when searching
  }, [searchQuery, displayFaqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' ? faq.answer : faq.answer
      }
    })),
    "about": {
      "@type": "Thing",
      "name": contextType === 'property' ? "Real Estate Property" : 
             contextType === 'investment' ? "Property Investment" : 
             "Real Estate Services"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Narkin's Builders and Developers",
      "url": "https://narkinsbuilders.com"
    },
    "url": pageUrl
  };

  if (filteredFaqs.length === 0) {
    return null;
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {description ? (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            ) : (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our luxury apartment projects and services.
              </p>
            )}
          </div>

          {/* Search Bar */}
          {searchable && (
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {searchQuery && (
                <p className="text-center mt-2 text-sm text-gray-600">
                  {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 pb-4 text-gray-700 leading-relaxed animate-in slide-in-from-top-2 duration-200"
                  >
                    {typeof faq.answer === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    ) : (
                      <div>{faq.answer}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No FAQs found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
          
          {showContactCTA && (
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Have more questions? We're here to help!
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=923203243970&text=Hi!%20I%20have%20a%20question%20about%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}