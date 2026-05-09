const Aboutus = () => {
  return (
    <div className="w-full flex justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-3xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          درباره ما
        </h1>

        <p className="text-gray-600 leading-8 text-justify mb-6">
          شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت و
          بدون استرس می‌تونی از مسیر لذت ببری. ما در دنیای برنامه‌نویسی، توی سفر
          به دنیای کدنویسی کنارت هستیم تا با هم رشد کنیم و از نتیجه زحماتمون لذت
          ببریم.
        </p>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-md">
          <p className="text-blue-700 font-semibold">کد لرن • codeLearn.ir</p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
