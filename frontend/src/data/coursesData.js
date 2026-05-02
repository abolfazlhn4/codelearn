export const categories = [
  { id: "frontend", label: "فرانت اند" },
  { id: "backend", label: "بک اند" },
  { id: "android", label: "اندروید" },
  { id: "desktop", label: "دسکتاپ" },
];

export const coursesData = [
  {
    id: 1,
    categoryId: "backend",
    title: "دوره آموزش Node SJ",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "در این دوره به صورت کاملاً عملی و پروژه‌محور با محیط اجرای نود جی‌اس آشنا می‌شویم. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
    teacher: "حسین مفیدی",
    studentsCount: "۲۲۵",
    price: "۲۳۷ هزار تومن",
    duration: "۳۵ ساعت",
    sessionsCount: 65,
    viewType: "دانلودی / آنلاین",
    prerequisites: "تسلط به جاوا اسکریپت",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات Node.js و محیط اجرا",
        episodes: [
          { id: 101, title: "Node.js چیست؟", duration: "12:00", isFree: true },
          { id: 102, title: "نصب Node و NPM", duration: "18:30", isFree: true },
          {
            id: 103,
            title: "ایجاد برنامه ساده با Node",
            duration: "22:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Express و ساخت API",
        episodes: [
          {
            id: 201,
            title: "نصب و تنظیم Express",
            duration: "27:30",
            isFree: false,
          },
          {
            id: 202,
            title: "Routing و Middleware",
            duration: "33:10",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    categoryId: "backend",
    title: "دوره آموزش زبان پایتون",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "پایتون یکی از محبوب‌ترین زبان‌های برنامه‌نویسی دنیاست. در این دوره از صفر مطلق شروع می‌کنیم و تا مباحث پیشرفته پیش می‌رویم. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
    teacher: "امیرحسین حمیدی",
    studentsCount: "۸۵۰",
    price: "رایگان",
    duration: "۴۲ ساعت",
    sessionsCount: 80,
    viewType: "دانلودی",
    prerequisites: "ندارد (مناسب برای مبتدیان)",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی و مقدمات پایتون",
        episodes: [
          {
            id: 101,
            title: "نصب پایتون و محیط کاری",
            duration: "15:00",
            isFree: true,
          },
          {
            id: 102,
            title: "متغیرها و انواع داده",
            duration: "20:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "منطق برنامه‌نویسی در پایتون",
        episodes: [
          {
            id: 201,
            title: "شرط‌ها و حلقه‌ها",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "تابع‌ها و ماژول‌ها",
            duration: "35:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    categoryId: "backend",
    title: "دوره آموزش زبان پی اچ پی",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "زبان PHP قلب تپنده بسیاری از سایت‌های وب است. با گذراندن این دوره می‌توانید سیستم‌های مدیریت محتوای اختصاصی خود را بسازید. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
    teacher: "مسیح مصطفایی",
    studentsCount: "۴۳۰",
    price: "۲۳۷ هزار تومن",
    duration: "۲۸ ساعت",
    sessionsCount: 45,
    viewType: "دانلودی",
    prerequisites: "آشنایی با HTML و CSS",
    syllabus: [
      {
        chapterId: 1,
        title: "آشنایی و شروع کار با PHP",
        episodes: [
          {
            id: 101,
            title: "مبانی و تاریخچه PHP",
            duration: "10:00",
            isFree: true,
          },
          {
            id: 102,
            title: "سینتکس و متغیرها",
            duration: "18:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "اتصال به دیتابیس و ساخت فرم‌ها",
        episodes: [
          {
            id: 201,
            title: "ارتباط با MySQL",
            duration: "24:00",
            isFree: false,
          },
          {
            id: 202,
            title: "عملیات CRUD و اعتبارسنجی فرم",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    categoryId: "backend",
    title: "دوره آموزش زبان جاوا",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "جاوا زبانی قدرتمند برای توسعه سیستم‌های بزرگ و سازمانی است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    teacher: "ابوالفضل هادی نژاد",
    studentsCount: "۳۲۰",
    price: "۳۰۰ هزار تومن",
    duration: "۵۰ ساعت",
    sessionsCount: 95,
    viewType: "دانلودی / آنلاین",
    prerequisites: "مبانی برنامه‌نویسی",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی زبان Java",
        episodes: [
          {
            id: 101,
            title: "JVM و ساختار زبان",
            duration: "15:00",
            isFree: true,
          },
          {
            id: 102,
            title: "کلاس‌ها و متدها",
            duration: "25:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "برنامه‌نویسی شی‌گرا در Java",
        episodes: [
          {
            id: 201,
            title: "Inheritance و Polymorphism",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Interface و Abstract Class",
            duration: "35:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    categoryId: "backend",
    title: "دوره آموزش جنگو (Django)",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "فریم‌ورک جنگو توسعه وب با پایتون را بسیار سریع و لذت‌بخش می‌کند. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
    teacher: "علی محمدی",
    studentsCount: "۱۸۰",
    price: "۲۵۰ هزار تومن",
    duration: "۳۰ ساعت",
    sessionsCount: 55,
    viewType: "دانلودی",
    prerequisites: "تسلط بر پایتون",
    syllabus: [
      {
        chapterId: 1,
        title: "شروع کار با Django",
        episodes: [
          {
            id: 101,
            title: "ساخت پروژه و تنظیمات",
            duration: "15:00",
            isFree: true,
          },
          { id: 102, title: "View و URL ها", duration: "22:00", isFree: true },
        ],
      },
      {
        chapterId: 2,
        title: "مدل‌ها و دیتابیس در Django",
        episodes: [
          {
            id: 201,
            title: "ایجاد Models و Migration",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "کار با پنل ادمین",
            duration: "20:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    categoryId: "backend",
    title: "دوره آموزش ASP.NET Core",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "بهترین انتخاب برای ورود به بازار کار شرکت‌های بزرگ و سازمانی. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
    teacher: "رضا احمدی",
    studentsCount: "۲۰۰",
    price: "۲۸۰ هزار تومن",
    duration: "۴۸ ساعت",
    sessionsCount: 85,
    viewType: "دانلودی / آنلاین",
    prerequisites: "آشنایی با #C",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی ASP.NET Core و معماری MVC",
        episodes: [
          {
            id: 101,
            title: "ایجاد پروژه جدید",
            duration: "20:00",
            isFree: true,
          },
          {
            id: 102,
            title: "Controller و Routing",
            duration: "25:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Entity Framework و امنیت",
        episodes: [
          {
            id: 201,
            title: "مدل‌سازی دیتا با EF Core",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "احراز هویت و JWT",
            duration: "35:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    categoryId: "backend",
    title: "دوره جامع فریم‌ورک لاراول",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "محبوب‌ترین فریم‌ورک PHP که بازار کار فوق‌العاده‌ای دارد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان.",
    teacher: "سینا کریمی",
    studentsCount: "۵۴۰",
    price: "۴۰۰ هزار تومن",
    duration: "۶۰ ساعت",
    sessionsCount: 110,
    viewType: "دانلودی",
    prerequisites: "تسلط بر PHP و شی‌گرایی",
    syllabus: [
      {
        chapterId: 1,
        title: "شروع کار با Laravel",
        episodes: [
          {
            id: 101,
            title: "نصب و راه‌اندازی پروژه",
            duration: "18:00",
            isFree: true,
          },
          {
            id: 102,
            title: "Routing و Controller ها",
            duration: "25:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Eloquent ORM و احراز هویت",
        episodes: [
          {
            id: 201,
            title: "مدیریت داده‌ها با Eloquent",
            duration: "35:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Authentication در Laravel",
            duration: "40:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    categoryId: "backend",
    title: "آموزش گولنگ (Golang)",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "زبان برنامه‌نویسی توسعه یافته توسط گوگل، با سرعت بالا و مناسب برای میکروسرویس‌ها. لورم ایپسوم متن ساختگی با تولید سادگی.",
    teacher: "پدرام شریفی",
    studentsCount: "۱۱۰",
    price: "۳۵۰ هزار تومن",
    duration: "۲۵ ساعت",
    sessionsCount: 40,
    viewType: "دانلودی",
    prerequisites: "تجربه برنامه‌نویسی با یک زبان دیگر",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی زبان Go",
        episodes: [
          { id: 101, title: "ساختار زبان Go", duration: "12:00", isFree: true },
          {
            id: 102,
            title: "توابع و متغیرها",
            duration: "18:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "ساخت سرویس و API با Go",
        episodes: [
          {
            id: 201,
            title: "ایجاد HTTP Server",
            duration: "25:00",
            isFree: false,
          },
          {
            id: 202,
            title: "کار با JSON و REST",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  // ----------- فرانت اند -----------
  {
    id: 9,
    categoryId: "frontend",
    title: "دوره جامع React JS",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "با ریکت می‌توانید رابط‌های کاربری پیچیده و تعاملی را به سادگی بسازید. این دوره دقیقاً همان چیزی است که برای ورود به بازار کار نیاز دارید. لورم ایپسوم متن ساختگی.",
    teacher: "علی رضایی",
    studentsCount: "۱۴۰۰",
    price: "۵۰۰ هزار تومن",
    duration: "۵۵ ساعت",
    sessionsCount: 100,
    viewType: "دانلودی / آنلاین",
    prerequisites: "جاوا اسکریپت مدرن (ES6)",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی و ساختار React",
        episodes: [
          {
            id: 101,
            title: "چیست و چرا React؟",
            duration: "14:00",
            isFree: true,
          },
          {
            id: 102,
            title: "کامپوننت‌ها و JSX",
            duration: "25:00",
            isFree: true,
          },
          {
            id: 103,
            title: "مدیریت state و props",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Hookها و مدیریت وضعیت",
        episodes: [
          {
            id: 201,
            title: "useState و useEffect",
            duration: "28:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Context API و Custom Hooks",
            duration: "33:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    categoryId: "frontend",
    title: "آموزش مقدماتی HTML و CSS",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "دروازه ورود به دنیای طراحی وب. در این دوره صفحات وب را از صفر ساختاردهی و استایل‌دهی می‌کنیم. لورم ایپسوم متن ساختگی.",
    teacher: "سارا احمدی",
    studentsCount: "۲۵۰۰",
    price: "رایگان",
    duration: "۱۵ ساعت",
    sessionsCount: 25,
    viewType: "دانلودی",
    prerequisites: "ندارد",
    syllabus: [
      {
        chapterId: 1,
        title: "ساختار صفحه با HTML",
        episodes: [
          {
            id: 101,
            title: "تگ‌ها و عناصر پایه",
            duration: "10:00",
            isFree: true,
          },
          {
            id: 102,
            title: "لینک، تصویر و لیست‌ها",
            duration: "12:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "استایل‌دهی با CSS",
        episodes: [
          {
            id: 201,
            title: "انتخابگرها و رنگ‌ها",
            duration: "15:00",
            isFree: true,
          },
          {
            id: 202,
            title: "Flexbox و Layout ها",
            duration: "18:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 11,
    categoryId: "frontend",
    title: "دوره پیشرفته جاوا اسکریپت",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "درک عمیق از مکانیزم‌های جاوا اسکریپت برای تبدیل شدن به یک برنامه‌نویس ارشد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
    teacher: "محمد نوری",
    studentsCount: "۹۶۰",
    price: "۳۲۰ هزار تومن",
    duration: "۳۸ ساعت",
    sessionsCount: 65,
    viewType: "دانلودی",
    prerequisites: "مبانی جاوا اسکریپت",
    syllabus: [
      {
        chapterId: 1,
        title: "توابع و محدوده‌ها در JS",
        episodes: [
          {
            id: 101,
            title: "Scope و Closure",
            duration: "20:00",
            isFree: true,
          },
          {
            id: 102,
            title: "Higher-order Functions",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Async Programming و Promise",
        episodes: [
          {
            id: 201,
            title: "Callback و Promise",
            duration: "28:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Async/Await عمیق",
            duration: "32:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 12,
    categoryId: "frontend",
    title: "آموزش فریم‌ورک Vue JS",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "فریم‌ورکی سبک و دوست‌داشتنی برای توسعه فرانت‌اند. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
    teacher: "نیما حسینی",
    studentsCount: "۳۴۰",
    price: "۲۹۰ هزار تومن",
    duration: "۳۲ ساعت",
    sessionsCount: 50,
    viewType: "دانلودی",
    prerequisites: "آشنایی با جاوا اسکریپت",
    syllabus: [
      {
        chapterId: 1,
        title: "شروع با Vue.js و مفاهیم پایه",
        episodes: [
          {
            id: 101,
            title: "نصب و ایجاد پروژه Vue",
            duration: "14:00",
            isFree: true,
          },
          {
            id: 102,
            title: "کامپوننت‌ها و داده‌ها",
            duration: "22:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "مدیریت وضعیت و Router",
        episodes: [
          {
            id: 201,
            title: "Vuex و State Management",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Routing در Vue",
            duration: "26:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 13,
    categoryId: "frontend",
    title: "دوره متخصص Next.js",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "آموزش رندرینگ سمت سرور (SSR) و بهینه‌سازی سئو برای اپلیکیشن‌های ریکت با استفاده از Next.js. لورم ایپسوم متن ساختگی.",
    teacher: "رضا عظیمی",
    studentsCount: "۵۲۰",
    price: "۴۵۰ هزار تومن",
    duration: "۴۰ ساعت",
    sessionsCount: 75,
    viewType: "دانلودی / آنلاین",
    prerequisites: "تسلط بر React JS",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات و تنظیم پروژه Next.js",
        episodes: [
          {
            id: 101,
            title: "ساخت پروژه و صفحه‌ها",
            duration: "18:00",
            isFree: true,
          },
          {
            id: 102,
            title: "Data Fetching و استاتیک جنریشن",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "رندرینگ و بهینه‌سازی",
        episodes: [
          {
            id: 201,
            title: "SSR و SSG عمیق",
            duration: "33:00",
            isFree: false,
          },
          {
            id: 202,
            title: "SEO و Performance",
            duration: "27:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 14,
    categoryId: "frontend",
    title: "طراحی رابط کاربری با Tailwind",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "یادگیری فریم‌ورک Tailwind CSS برای استایل‌دهی سریع و منعطف پروژه‌های وب. لورم ایپسوم متن ساختگی با تولید سادگی.",
    teacher: "فاطمه سعیدی",
    studentsCount: "۸۹۰",
    price: "۱۵۰ هزار تومن",
    duration: "۱۲ ساعت",
    sessionsCount: 20,
    viewType: "دانلودی",
    prerequisites: "آشنایی با HTML و CSS",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی و ساختار کلاس‌ها در Tailwind",
        episodes: [
          {
            id: 101,
            title: "آشنایی با Utility کلاس‌ها",
            duration: "10:00",
            isFree: true,
          },
          {
            id: 102,
            title: "کار با رنگ‌ها و تایپوگرافی",
            duration: "14:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "لایه‌بندی و طراحی واکنش‌گرا",
        episodes: [
          {
            id: 201,
            title: "Layout و Grid سیستم",
            duration: "18:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Responsive و Dark Mode",
            duration: "20:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  // ----------- اندروید -----------
  {
    id: 15,
    categoryId: "android",
    title: "برنامه‌نویسی اندروید با کاتلین",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "زبان رسمی و پیشنهادی گوگل برای توسعه اپلیکیشن‌های اندروید. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
    teacher: "مهدی طاهری",
    studentsCount: "۶۷۰",
    price: "۴۲۰ هزار تومن",
    duration: "۴۵ ساعت",
    sessionsCount: 85,
    viewType: "دانلودی / آنلاین",
    prerequisites: "آشنایی با شی‌گرایی",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات کاتلین",
        episodes: [
          {
            id: 101,
            title: "معرفی Kotlin و نصب ابزارها",
            duration: "15:00",
            isFree: true,
          },
          {
            id: 102,
            title: "متغیرها و ساختارهای کنترلی",
            duration: "22:00",
            isFree: true,
          },
          {
            id: 103,
            title: "توابع و کلاس‌ها",
            duration: "28:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "توسعه اپلیکیشن اندروید",
        episodes: [
          {
            id: 201,
            title: "Activity و Lifecycle",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "کار با Layout ها",
            duration: "26:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 17,
    categoryId: "android",
    title: "توسعه اپلیکیشن با React Native",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "یک بار کد بنویسید و هم برای اندروید و هم برای iOS خروجی بگیرید. لورم ایپسوم متن ساختگی با تولید سادگی.",
    teacher: "امید رحمانی",
    studentsCount: "۴۳۰",
    price: "۳۸۰ هزار تومن",
    duration: "۵۰ ساعت",
    sessionsCount: 90,
    viewType: "دانلودی",
    prerequisites: "تسلط بر React JS",
    syllabus: [
      {
        chapterId: 1,
        title: "شروع با React Native",
        episodes: [
          {
            id: 101,
            title: "معرفی React Native",
            duration: "14:00",
            isFree: true,
          },
          { id: 102, title: "نصب محیط توسعه", duration: "18:00", isFree: true },
          {
            id: 103,
            title: "ساخت اولین اپلیکیشن",
            duration: "25:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "ساخت رابط کاربری موبایل",
        episodes: [
          {
            id: 201,
            title: "کامپوننت‌های اصلی",
            duration: "28:00",
            isFree: false,
          },
          {
            id: 202,
            title: "Navigation در اپلیکیشن",
            duration: "32:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 18,
    categoryId: "android",
    title: "جاوا برای توسعه‌دهندگان اندروید",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "یادگیری مفاهیم پایه جاوا با رویکرد ورود به دنیای برنامه‌نویسی اندروید. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
    teacher: "حسین مفیدی",
    studentsCount: "۸۲۰",
    price: "رایگان",
    duration: "۲۰ ساعت",
    sessionsCount: 35,
    viewType: "دانلودی",
    prerequisites: "ندارد",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی زبان جاوا",
        episodes: [
          {
            id: 101,
            title: "معرفی Java و نصب JDK",
            duration: "12:00",
            isFree: true,
          },
          {
            id: 102,
            title: "متغیرها و انواع داده",
            duration: "18:00",
            isFree: true,
          },
          {
            id: 103,
            title: "شرط‌ها و حلقه‌ها",
            duration: "20:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "شی‌گرایی در جاوا",
        episodes: [
          { id: 201, title: "کلاس و آبجکت", duration: "22:00", isFree: false },
          {
            id: 202,
            title: "Inheritance و Polymorphism",
            duration: "24:00",
            isFree: false,
          },
        ],
      },
    ],
  },

  // ----------- دسکتاپ -----------
  {
    id: 19,
    categoryId: "desktop",
    title: "برنامه‌نویسی ویندوز با #C",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "آموزش ساخت نرم‌افزارهای دسکتاپ قدرتمند برای سیستم‌عامل ویندوز با زبان سی‌شارپ. لورم ایپسوم متن ساختگی.",
    teacher: "مجید صالحی",
    studentsCount: "۳۹۰",
    price: "۲۶۰ هزار تومن",
    duration: "۳۵ ساعت",
    sessionsCount: 60,
    viewType: "دانلودی",
    prerequisites: "آشنایی با الگوریتم‌ها",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات C# و .NET",
        episodes: [
          {
            id: 101,
            title: "معرفی C# و Visual Studio",
            duration: "15:00",
            isFree: true,
          },
          {
            id: 102,
            title: "انواع داده و عملگرها",
            duration: "20:00",
            isFree: true,
          },
          {
            id: 103,
            title: "کنترل جریان برنامه",
            duration: "25:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Windows Forms Applications",
        episodes: [
          {
            id: 201,
            title: "طراحی رابط کاربری با WinForms",
            duration: "30:00",
            isFree: false,
          },
          {
            id: 202,
            title: "کار با کنترل‌ها و رویدادها",
            duration: "35:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 20,
    categoryId: "desktop",
    title: "ساخت برنامه‌های دسکتاپ با Electron",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "با استفاده از تکنولوژی‌های وب (HTML/CSS/JS) نرم‌افزارهای دسکتاپ کراس‌پلتفرم بسازید. لورم ایپسوم متن ساختگی.",
    teacher: "کیوان مرادی",
    studentsCount: "۲۱۰",
    price: "۳۱۰ هزار تومن",
    duration: "۲۲ ساعت",
    sessionsCount: 40,
    viewType: "دانلودی / آنلاین",
    prerequisites: "جاوا اسکریپت",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات Electron و وب تکنولوژی",
        episodes: [
          {
            id: 101,
            title: "معرفی Electron و کاربردها",
            duration: "18:00",
            isFree: true,
          },
          {
            id: 102,
            title: "HTML, CSS, JS در Electron",
            duration: "22:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "ساخت اپلیکیشن کراس‌پلتفرم",
        episodes: [
          {
            id: 201,
            title: "فایل‌سیستم و APIهای بومی",
            duration: "28:00",
            isFree: false,
          },
          {
            id: 202,
            title: "ساخت و توزیع برنامه",
            duration: "25:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 21,
    categoryId: "desktop",
    title: "دوره جامع ++C و Qt",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "ترکیب قدرت زبان سی‌پلاس‌پلاس با فریم‌ورک Qt برای ساخت رابط‌های کاربری نرم‌افزارهای سنگین و سریع. لورم ایپسوم متن ساختگی.",
    teacher: "بهنام امیری",
    studentsCount: "۱۵۰",
    price: "۴۰۰ هزار تومن",
    duration: "۶۵ ساعت",
    sessionsCount: 120,
    viewType: "دانلودی",
    prerequisites: "آشنایی با مبانی ++C",
    syllabus: [
      {
        chapterId: 1,
        title: "مبانی C++ و Qt Framework",
        episodes: [
          {
            id: 101,
            title: "مرور C++ پیشرفته",
            duration: "30:00",
            isFree: true,
          },
          {
            id: 102,
            title: "معرفی Qt Creator و Widgets",
            duration: "25:00",
            isFree: true,
          },
          {
            id: 103,
            title: "سیگنال‌ها و اسلات‌ها",
            duration: "35:00",
            isFree: false,
          },
        ],
      },
      {
        chapterId: 2,
        title: "طراحی رابط کاربری پیشرفته با Qt",
        episodes: [
          {
            id: 201,
            title: "کار با Layoutها و QML",
            duration: "40:00",
            isFree: false,
          },
          {
            id: 202,
            title: "اتصال به دیتابیس",
            duration: "45:00",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 22,
    categoryId: "desktop",
    title: "رابط کاربری پیشرفته با WPF",
    description:
      "لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم از صنعت چاپ",
    longDescription:
      "طراحی فرم‌های ویندوزی مدرن و زیبا با تکنولوژی WPF در دات‌نت. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
    teacher: "رضا احمدی",
    studentsCount: "۲۸۰",
    price: "۲۲۰ هزار تومن",
    duration: "۲۶ ساعت",
    sessionsCount: 45,
    viewType: "دانلودی",
    prerequisites: "تسلط به #C",
    syllabus: [
      {
        chapterId: 1,
        title: "مقدمات WPF و XAML",
        episodes: [
          {
            id: 101,
            title: "معرفی WPF و ساختار آن",
            duration: "16:00",
            isFree: true,
          },
          {
            id: 102,
            title: "زبان XAML برای UI",
            duration: "20:00",
            isFree: true,
          },
        ],
      },
      {
        chapterId: 2,
        title: "Binding و Data Templates",
        episodes: [
          {
            id: 201,
            title: "Data Binding عمیق",
            duration: "28:00",
            isFree: false,
          },
          {
            id: 202,
            title: "استایل‌دهی و انیمیشن در WPF",
            duration: "30:00",
            isFree: false,
          },
        ],
      },
    ],
  },
];
