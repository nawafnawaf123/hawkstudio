# إعداد روابط تحميل تطبيقات APK

صفحة الأعمال مهيأة بطريقتين:

1. **تشغيل محلي أو استضافة تدعم الملفات الكبيرة**  
   احتفظ بالملفين داخل:
   - `public/downloads/hawk-browser.apk`
   - `public/downloads/hawk-gym.apk`

2. **النشر من GitHub إلى Vercel**  
   ارفع ملفات APK إلى GitHub Releases أو خدمة تخزين ملفات، ثم أضف في إعدادات Environment Variables على Vercel:

```env
NEXT_PUBLIC_HAWK_BROWSER_APK_URL=https://example.com/hawk-browser.apk
NEXT_PUBLIC_HAWK_GYM_APK_URL=https://example.com/hawk-gym.apk
```

بعد حفظ المتغيرات أعد نشر الموقع. ستستخدم أزرار التحميل الروابط الخارجية تلقائياً، بينما تبقى الصور داخل المشروع.
