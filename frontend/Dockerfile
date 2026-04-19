FROM node:18-alpine

WORKDIR /app

# کپی کردن فایل‌های پکیج
COPY package*.json ./

# نصب پکیج‌ها با میرور
RUN npm install --registry="https://mirror-npm.runflare.com"

# کپی کردن کل پروژه
COPY . .

# پورت پیش‌فرض Vite
EXPOSE 5173

# اجرای پروژه (--host برای دسترسی از بیرون کانتینر در Vite الزامی است)
CMD ["npm", "run", "dev", "--", "--host"]
