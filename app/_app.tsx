import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

// Typage et fonction principale `App`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps & { pageProps: { session: any } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
