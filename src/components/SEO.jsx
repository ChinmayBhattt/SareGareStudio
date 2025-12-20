import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, name, type }) => {
    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='application-name' content='SareGare Studio' />
            <meta name='apple-mobile-web-app-title' content='SareGare Studio' />

            {/* Facebook tags */}
            <meta property='og:type' content={type} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:site_name' content='SareGare Studio' />
            <meta property='og:url' content='https://saregarestudio.vercel.app/' />
            <meta property='og:image' content='https://saregarestudio.vercel.app/og-image.png' />

            {/* Twitter tags */}
            <meta name='twitter:creator' content={name} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content='https://saregarestudio.vercel.app/og-image.png' />

            {/* JSON-LD Structured Data */}
            <script type='application/ld+json'>
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: 'SareGare Studio',
                    alternateName: "SareGare Studio | Music & Film Production | Powered by Hacker's Unity",
                    url: 'https://saregarestudio.vercel.app/',
                })}
            </script>
        </Helmet>
    );
};
