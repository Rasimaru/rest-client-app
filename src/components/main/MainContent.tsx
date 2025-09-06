import Link from 'next/link';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';
import { JSX } from 'react';

const MainContent = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-10 bg-white text-black px-20 py-10 rounded-md">
        <h2>Welcome!</h2>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href={ROUTES.signin} aria-label="Go to sign-in page">
              Sign In
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.signup} aria-label="Go to sign-up page">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-5 p-5 bg-white rounded-md">
        <Button variant="default" size="sm" asChild>
          <Link href={ROUTES.client} aria-label="Go to rest-client page">
            Rest Client
          </Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={ROUTES.client} aria-label="Go to history page">
            History
          </Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={ROUTES.client} aria-label="Go to variables page">
            Variables
          </Link>
        </Button>
      </div>
    </>
  );
};
export default MainContent;
