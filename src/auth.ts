import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { AuthSchema } from './lib/validationSchemas';

type User = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
};

type UsersDB = User[];

//temporary DB
const db: UsersDB = [
  { id: '1', email: 'test@example.com', password: 'Password1', name: 'Test User' }
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    }),
    Credentials({
      name: 'Credentilas',
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com'
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '********'
        }
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await AuthSchema.validate(credentials, {
            abortEarly: false
          });

          const user = db.find((u) => u.email === email && u.password === password);

          if (!user) throw new Error('Invalid credentials.');

          return user;
        } catch {
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET
});
