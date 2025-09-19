import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme.css";
import { ThemeProvider } from "@/providers/theme-provider";
import MountedProvider from "@/providers/mounted.provider";
import { Toaster } from "@/components/ui/sonner";
// language
import { getLangDir } from "rtl-detect";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DirectionProvider from "@/providers/direction-provider";
import AuthProvider from "@/providers/auth.provider";
import QueryProvider from "@/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import DataProvider from "@/providers/data.provider";
import { GoogleAnalytics } from '@next/third-parties/google';
//
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://fdedeh.info"),
  title: {
    default: "Fernand Dédeh Blog",
    template: "%s | Fernand Dédeh"
  },
  description: "Le blog de Fernand Dédeh : analyses sportives, réflexions médiatiques et prises de position en Côte d'Ivoire.",
  openGraph: {
    title: "Blog de Fernand Dédeh",
    description: "Analyses sportives et engagement médiatique par le journaliste Fernand Dédeh.",
    images: "/og-homepage-info.png",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  const messages = await getMessages();
  const direction = getLangDir(locale);
  const queryClient = getQueryClient();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <NuqsAdapter>
                <AuthProvider>
                  <ThemeProvider attribute="class" defaultTheme="light">
                    <MountedProvider>
                      <DirectionProvider direction={direction}>
                        <DataProvider />
                        {children}
                      </DirectionProvider>
                    </MountedProvider>
                    <Toaster />
                  </ThemeProvider>
                </AuthProvider>
              </NuqsAdapter>
            </HydrationBoundary>
          </QueryProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-SYWNXWW3XW" />
      </body>
    </html>
  );
}
