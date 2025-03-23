import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';


interface TestimonialsProps {
  testimonials: Array<{
    name: string,
    stars: Array<true | "half">,
    testimonial: string,
    avatar: string, // Placeholder avatar
  }>;
}

const Testimonials: FC<TestimonialsProps> = ({ testimonials }: TestimonialsProps) => (
  <div className="mx-auto max-w-7xl">
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
        What Our Clients Say
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Hear from our satisfied clients about their experiences with Narkin’s Builders.
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="flex flex-col items-center text-center p-6">
              <Avatar className="w-16 h-16 mb-4 rounded-full overflow-hidden">
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback>{item.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {item.name}
              </CardTitle>
              <div className="flex justify-center mt-2">
                {item.stars.map((star, starIndex) => (
                  <span
                    key={starIndex}
                    className={`text-xl ${star === true
                      ? "text-yellow-400"
                      : star === "half"
                        ? "text-yellow-400"
                        : "text-gray-300"
                      }`}
                  >
                    {star === true ? "★" : star === "half" ? "½" : "☆"}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="text-center p-6 pt-0">
              <blockquote className="text-gray-600 italic">
                "{item.testimonial}"
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Testimonials;
