import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/prismaClient";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });
      session.user._id = sessionUser?.id as number;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      const isRegisteredUser = await prisma.user.findUnique({
        where: {
          email: user?.email as string,
        },
      });
      if (isRegisteredUser) {
        return true;
      }
      await prisma.user.create({
        data: {
          name: user?.name as string,
          email: user?.email as string,
          avatar: user?.image as string,
        },
      });
      return true;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
