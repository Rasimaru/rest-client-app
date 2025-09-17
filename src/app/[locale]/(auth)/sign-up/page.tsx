import { SignUpForm } from '@/components/auth/SignUpForm';

const SignInPage = () => {
  return (
    <div className="flex min-h-min w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignInPage;
