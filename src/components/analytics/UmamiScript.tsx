import Script from "next/script";

export function UmamiScript() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const recorderUrl = process.env.NEXT_PUBLIC_UMAMI_RECORDER_SCRIPT_URL
  if (!websiteId || !scriptUrl) return null;

  return (
    <>
      <Script id="umami-before-send" strategy="afterInteractive">
        {`window.umamiBeforeSend = (type, payload) => (payload?.url && new URL(payload.url, location.origin).pathname.startsWith('/owner') ? null : payload);`}
      </Script>
      <Script
        id="umami-tracker"
        src={scriptUrl}
        data-website-id={websiteId}
        data-domains="wallacedev.com.br"
        data-do-not-track="true"
        data-before-send="umamiBeforeSend"
        strategy="afterInteractive"
      />
      <Script
        id="umami-recorder-tracker"
        src={recorderUrl}
        data-website-id={websiteId}
        data-domains="wallacedev.com.br"
        data-do-not-track="true"
        data-before-send="umamiBeforeSend"
        strategy="afterInteractive"
      />
    </>
  );
}
