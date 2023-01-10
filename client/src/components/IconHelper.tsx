import { useLocaleState } from 'react-admin';

export default function IconHelper() {
  const [locale] = useLocaleState();
  return (
    <p>
      {locale === 'ar' ? 'اختر ايقونة من ' : 'Choose an icon from'}
      <a href="https://icons.expo.fyi/" target="_blank" rel="noreferrer">
        {' '}
        {locale === 'ar' ? 'هنا' : 'here'}
      </a>{' '}
      {locale === 'ar'
        ? 'و ضعها في الحقل (تاكد انها Material community icons family)'
        : "(Make sure it's Material community icons family) and put it's name in the field"}
    </p>
  );
}
