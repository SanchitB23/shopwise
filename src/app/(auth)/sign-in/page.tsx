'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '@/resources/logo/logo_transparent.png';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { signInValidator, TSignInSchema } from '@/validators/auth-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInputField } from '@/components/common/passwordInputField';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push('?as=seller');
  };

  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined);
  };

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading, mutate: signIn } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success('Signed in successfully');

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push('/sell');
        return;
      }

      router.push('/');
    },
    onError: err => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password.');
      }
    },
  });

  const onSubmit = (values: TSignInSchema) => signIn(values);

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center  lg:px-0 flex-1">
        <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={Logo} alt={'Logo'} className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your {isSeller ? 'Seller' : ''} account
            </h1>
            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-up">
              Don&apos;t have an account? Create one
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInputField placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className={'w-full'} disabled={isLoading}>
                Sign In
              </Button>
            </form>
          </Form>
          <Button type="button" variant={'link'} className={'!mt-0 self-start pl-0'}>
            <Link href={'/forget-password'}>Forget Password?</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
