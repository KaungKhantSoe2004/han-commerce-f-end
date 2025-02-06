const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto mt-1 px-4 py-16  rounded-xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">About HAN-COMMERCE</h2>
          <div className="w-20 h-1 bg-red-500"></div>
          <p className="text-gray-300 leading-relaxed">
            We are passionate about providing high-quality sportswear and
            fitness equipment to help you achieve your perfect figure and
            maintain a healthy lifestyle. With years of experience in the
            industry, we understand what athletes and fitness enthusiasts need
            to perform their best.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-500">1M+</h3>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-500">500+</h3>
              <p className="text-gray-400">Premium Products</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-500">50+</h3>
              <p className="text-gray-400">Store Locations</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-500">24/7</h3>
              <p className="text-gray-400">Customer Support</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/imgs/about.jpg"
            alt="About Us"
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="absolute -bottom-6 -left-6 bg-red-500 p-6 rounded-lg">
            <p className="text-2xl  text-blue-400 font-bold">15+ Years</p>
            <p className="text-sm">Of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
