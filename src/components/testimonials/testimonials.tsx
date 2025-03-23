import React, { FC } from 'react';


interface TestimonialsProps { }

const Testimonials: FC<TestimonialsProps> = () => (
  <section className="bg-neutral-100 border-t -px-5 lg:px-8 py-[4rem]">
    <div className="py-5 -px-5 mx-auto max-w-7xl">
      <div className="mr-auto px-5 my-5 max-w-2xl lg:mx-0">
        <h3 className="text-3xl font-bold tracking-tight text-black sm:text-4xl capitalize mb-4">Testimonials</h3>
      </div>
      <div className="grid mb-8 px-5 max-w-7xl mt-5 lg:mb-12 gap-2 gap-y-2 lg:grid-cols-2">
        {[
          {
            name: "Saad Arshad",
            stars: [true, true, true, true, "half"],
            testimonial:
              "Highly committed to delivering in timelines, I wholeheartedly recommend considering investment in projects by Narkin’s Builders.",
          },
          {
            name: "Arsalan",
            stars: [true, true, true, true, true],
            testimonial:
              "Smooth booking experience, very transparent throughout the process.",
          },
          {
            name: "Umair Iqrar",
            stars: [true, true, true, true, false],
            testimonial:
              "I decided to invest during the initial launch phase, and after just two years, I’ve seen substantial returns. It’s been a fantastic investment opportunity!",
          },
        ].map((item, index) => (
          <figure key={index} className="flex border hover:bg-[#FAFAFA] transition transition-duration-100 cursor-pointer flex-col justify-center items-center p-8 text-center bg-white border-b border-gray-200 md:p-12 lg:border rounded-xl">
            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500">
              <h3 className="text-lg font-semibold text-gray-900 -dark:text-white">

              </h3>
              <ul className="flex justify-center my-4">
                {item.stars.map((star, starIndex) => (
                  <li key={starIndex}>
                    <i
                      className={`fas ${star === true
                        ? "fa-star text-yellow-400"
                        : star === "half"
                          ? "fa-star-half-alt text-yellow-400"
                          : "far fa-star text-yellow-400"
                        }`}
                    />
                  </li>
                ))}
              </ul>
              <p className="my-4">
                {item.testimonial}
              </p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              {/* <img
  className="w-9 h-9 rounded-full"
  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.webp"
  alt="profile picture"
/> */}
              <div className="space-y-0.5 font-medium -dark:text-white text-left">
                <div>{item.name}</div>
                <div className="text-sm font-light text-gray-500 -dark:text-gray-400">
                  Client
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {/* <div className="text-center">
<a href="#" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 -dark:focus:ring-gray-700 -dark:bg-gray-800 -dark:text-gray-400 -dark:border-gray-600 -dark:hover:text-white -dark:hover:bg-gray-700">Show more...</a>
</div> */}
    </div>
  </section>
);

export default Testimonials;
