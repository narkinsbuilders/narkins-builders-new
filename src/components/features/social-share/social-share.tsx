// src/components/features/social-share/social-share.tsx
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook size={24} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={24} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={24} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={24} />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="font-semibold text-gray-900">Share this post:</span>
      <div className="flex items-center space-x-3">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 hover:text-primary flex items-center justify-center w-6 h-6"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
