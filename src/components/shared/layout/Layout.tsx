import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mx-auto bg-neutral-950/95 dark:bg-neutral-950 text-white dark:text-gray-100 min-h-full w-full">
      <Header />
      <main
        role="main"
        className="container xl:w-7xl p-2.5 grow sm:gap-20 gap-15 flex flex-col justify-center items-center w-full"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
