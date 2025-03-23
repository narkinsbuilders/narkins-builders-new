import AdsCampaign from '@/components/ads-campaign/ads-campaign';
import WAButton from '@/components/sticky-wa-button/wa-button';
import { GlobalLeadFormProvider } from '@/contexts/global';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Dialog, { useDialogState } from '@/components/dialog/dialog';
import { createContext } from 'react';
import { useGlobalLeadFormState } from '@/zustand';

export const getMoreInformationContext = createContext
export default function App({ Component, pageProps }: AppProps) {
  const open = useGlobalLeadFormState(state => state.open);
  const setOpen = useGlobalLeadFormState(state => state.setOpen);
  return (
    <div className="text-black dark:text-black">
      <Dialog title={`Get More Information — Narkin's Builders`} open={open} onClose={() => setOpen(false)} body={
        <AdsCampaign
          onlyForm={true} residency="General"
          image={'http://admin.narkinsbuilders.com/wp-content/uploads/2024/06/Picture1.webp'}
          headline={"2, 3 & 4 Bedroom Luxury Apartments"}
          features={[]}
        />} showButtons={false} cancelButton={{
          title: '',
          onClick: function (): void {
            throw new Error('Function not implemented.');
          }
        }} acceptButton={{
          title: '',
          onClick: function (): void {
            throw new Error('Function not implemented.');
          }
        }} />
      <WAButton />
      <GlobalLeadFormProvider>
        <Component {...pageProps} />
      </GlobalLeadFormProvider>
    </div>
  );
}
