import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const BlogInfo = () => {
  return (
    <div className="min-h-screen  text-white md:flex block items-center justify-center md:p-6 p-0">
      <div className="w-full   p-10 rounded-lg shadow-lg">
        {/* Blog Image */}
        <img
          src="../imgs/blogOne.png"
          alt="Blog Post"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Blog Info */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm">
            Published on: <span className="text-red-500">February 7, 2025</span>
          </p>
          <div className="md:text-2xl text-xl font-bold text-red-500 mt-2">
            The Future of E-commerce
          </div>
          <p className="text-gray-300 mt-4 md:text-2xl text-base">
            Web developer တစ်ဦးအနေနဲ့ ကျွန်တော်တိုဟာ AI နဲ့ machine learning ရဲ့
            ကိုသုံးပြီး ပိုမို‌ကောင်းမွန် တဲ့ web application
            တွေကိုဖန်တီးလိုရပါတယ်။ ဥပမာတစ်ခု ပြောပြရမယ်ဆိုရင်၊ user experience
            ကိုပိုကောင်းစေဖို recommendation system တွေကို machine learning
            algorithm တွေနဲ့တည်ဆောင်လိုရပါတယ်။ Netflix သိုမဟုတ် Spotify လို
            website တွေမှာ user တစ်ဦးချင်းစီရဲ့ စိတ်ဝင်စားမှု၊ browsing pattern
            တွေကို analyze လုပ်ပြီး personalized recommendation
            တွေပေးနိုင်ပါတယ်။ web developer တစ်ဦးအနေနဲ့ machine learning model
            တွေကို web application မှာ integrate လုပ်တဲ့အခါ TensorFlow.js,
            scikit-learn, PyTorch တိုလိုမျိုး library တွေကိုသုံးလိုရပါတယ်။
            browser ထဲမှာပဲ machine learning model တွေကို train လုပ်လည်းရ၊
            prediction လည်းလုပ်လိုရပါတယ်။ chatbot တွေ၊ image recognition system
            တွေ၊ predictive analytics တွေကို web platform မှာတည်ဆောင်လိုရပါတယ်။
            ဥပမာ - customer support chatbot တစ်ခုဟာ user ရဲ့ query တွေကို
            natural language processing နဲ့ analyze လုပ်ပြီး automated response
            တွေပေးနိုင်ပါတယ်။ သတိထားရမယ့်အချက်က machine learning ဟာ complex
            နည်းပညာဖြစ်တဲ့အတွက် continuous learning နဲ့ practice
            လုပ်ဖိုလိုအပ်ပါတယ်။ API တွေ၊ pre-trained model တွေကို utilize
            လုပ်ပြီး စတင်နိုင်ပါတယ်။ coding skills နဲ့ mathematics understanding
            တွေကလည်း အရေးကြီးပါတယ်။ web development မှာ machine learning ရဲ့
            ပါ၀င်နိုင်မှုဟာ အလွန်ကျယ်ပြန့်ပါတယ်။ user experience ကို customize
            လုပ်ခြင်း၊ data-driven decision making၊ automation တွေကို implement
            လုပ်ခြင်းတိုမှာ machine learning ကတကယ်ကိုအရေးပါတဲ့အရာတစ်ခုဖြစ်ပါတယ်။
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-8 flex items-center border-t border-gray-700 pt-4">
          <img
            src="https://th.bing.com/th/id/OIP.0QRK76n2qxA4EoEA9vDDHwHaNK?w=115&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Author"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <p className="text-red-500 font-semibold text-lg">John Doe</p>
            <p className="text-gray-400 text-sm">E-commerce Expert</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full mr-3">
            #Ecommerce
          </span>
          <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full">
            #Trends
          </span>
        </div>

        {/* Social Share Icons */}
        <div className="flex mt-8 space-x-6 text-red-500 text-2xl">
          <FaFacebook className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
