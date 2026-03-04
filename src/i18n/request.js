import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    const activeLocale = locale || "en";
    console.log('Loading locale:', activeLocale);

    return {
        locale: activeLocale,
        messages: (await import(`../messages/${activeLocale}.json`)).default
    };
});
