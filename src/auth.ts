import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { AuthSchema } from './lib/validationSchemas';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import bcrypt from 'bcrypt';
import { registerUser } from './lib/actions/registerUser';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    }),
    Credentials({
      name: 'Credentials',
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
          const { email, password } = await AuthSchema.validate(credentials, { abortEarly: false });

          let user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            user = await registerUser(email, password);
          } else if (!user.password || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect password');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined
          };
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Invalid credentials';
          throw new Error(message);
        }
      }
    })
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, profile }) {
      console.log('JWT callback', { token, user, profile });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = profile?.avatar_url ?? user.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' && !user.email) {
        user.email = `github-${profile?.id}@example.com`;
      }
      return true;
    }
  },
  events: {
    async createUser({ user }) {
      console.log('✅ [NextAuth] User created:', user);
    },
    async signIn({ user, account, profile }) {
      console.log('🔑 [NextAuth] Sign in:', { user, account, profile });
    },
    async session({ session }) {
      console.log('💾 [NextAuth] Session:', session);
    }
  }
});
