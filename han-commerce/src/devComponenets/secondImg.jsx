const SecondImgSection = () => {
  return (
    <div className=" bg-red-400  topImgSection">
      <div className="   relative w-full imgContainer">
        <img
          src="../imgs/beauty.jpg"
          // src="https://media-private.canva.com/1QQ9I/MAGdlp1QQ9I/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250129%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250129T032658Z&X-Amz-Expires=55349&X-Amz-Signature=1c9409112cc55eb4b06e70a815a1e2dddfce4b52d4acd34b0b35e21eda016b77&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Wed%2C%2029%20Jan%202025%2018%3A49%3A27%20GMT"
          className=" w-full image"
          alt="d"
        />
      </div>
      <div className=" absolute absoluteText text-white">
        <h4 className=" flex flex-auto "></h4>
        <div className="  text-red-300 gap-4 ">
          <div className="text-5xl text-white">BUILD PERFECT FIGURE</div>
          <div className=" text-5xl mt-1 text-start italic font-bold">
            {" "}
            <span className=" mt-1 text-white">___</span> SHAPE FOR GOOD
          </div>
          <h3 className="   font-bold text-start  ml-10 pl-13 text-2xl text-gray-200 ">
            AND HEALTHY LIFE
          </h3>
        </div>
      </div>
    </div>
  );
};
export default SecondImgSection;
