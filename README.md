# Hawk Studio — Portfolio + Admin CMS (Next.js + Prisma)

موقع احترافي لشركة **Hawk Studio** لعرض الأعمال + لوحة إدارة (Admin) لإضافة/تعديل المشاريع، مع خيار **وضع الصيانة**.

## ✅ المميزات
- تصميم سينمائي (أخضر/أسود) + أنيميشن Framer Motion + أيقونات Lucide
- صفحات: الرئيسية، الأعمال، الخدمات، من نحن، تواصل
- Admin CMS:
  - تسجيل دخول (NextAuth Credentials)
  - إدارة المشاريع (CRUD)
  - رفع صور للمشاريع (تُحفظ داخل `public/uploads`)
  - إعدادات عامة + تفعيل/إيقاف وضع الصيانة
- SEO قوي:
  - Metadata + OpenGraph
  - JSON-LD Organization + Website
  - `robots.txt` + `sitemap.xml` ديناميكي
- Contact form:
  - حفظ الرسائل بقاعدة البيانات
  - (اختياري) إرسال بريد عبر Nodemailer إذا وضعت إعدادات SMTP

---

## 1) المتطلبات
- Node.js 18+ (يفضل 20)
- npm أو pnpm
- (اختياري) PostgreSQL للإنتاج — محليًا نستخدم SQLite بشكل افتراضي

---

## 2) تشغيل محلي (SQLite)
1. انسخ ملف البيئة:
```bash
cp .env.example .env
```

2. ثبّت الحزم:
```bash
npm install
```

3. أنشئ قاعدة البيانات وطبّق Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. أنشئ مستخدم أدمن:
```bash
npm run seed
```

5. شغّل السيرفر:
```bash
npm run dev
```

- الموقع: `http://localhost:3000`
- لوحة الإدارة: `http://localhost:3000/admin`

**بيانات الأدمن (افتراضيًا):**
- Email: `admin@hawk.studio`
- Password: `Admin@12345`

> غيّرها فورًا بعد أول تشغيل.

---

## 3) نشر على الإنتاج (مقترح)
### خيار سريع:
- Frontend/Fullstack على **Vercel**
- Database على **Neon (Postgres)** أو **Railway**

غيّر `DATABASE_URL` في `.env` إلى رابط Postgres ثم:
```bash
npx prisma migrate deploy
npx prisma generate
```

> رفع الصور في الإنتاج: إن كنت على Vercel، يفضّل نقل التخزين إلى S3/Supabase Storage. الكود هنا جاهز للبدء محليًا أو على سيرفر Node ثابت (Render/VPS).

---

## 4) أهم متغيرات البيئة
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `ADMIN_EMAIL` (اختياري لتحديد الإيميل المسموح للأدمن)
- SMTP (اختياري): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

---

## 5) أوامر مهمة
```bash
npm run dev
npm run build
npm start
npm run seed
npx prisma studio
```

---

## هيكل المشروع
- `app/` صفحات ومكونات Next.js App Router
- `app/api/` API Routes (auth, projects, settings, contact, upload)
- `prisma/` مخطط قاعدة البيانات + migrations
- `public/uploads/` صور المشاريع (محليًا)
