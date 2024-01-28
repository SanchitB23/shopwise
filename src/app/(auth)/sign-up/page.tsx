'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Logo from '@/resources/logo/logo_transparent.png';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { countryCodeEnum, signUpValidator, TSignUpSchema } from '@/validators/auth-validator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { PasswordInputField } from '@/components/common/passwordInputField';
import MobileNumberInput from '@/components/common/mobileNumberInput';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get('origin');

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpValidator),
    defaultValues: {
      email: '',
      password: '',
      countryCode: countryCodeEnum.enum.IN,
    },
  });

  const { isLoading, mutate: signUp } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success('Signed in successfully');

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
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

  const onSubmit = (values: TSignUpSchema) => {
    console.log('sign up', values);
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-1 flex-col items-center  lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={Logo} alt={'Logo'} className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-in">
              Already have an account? Sign-in
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInputField placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MobileNumberInput
                form={form}
                countrySelectName={'countryCode'}
                mobileInputName={'mobile'}
              />
              <Button type="submit" className={'w-full'} disabled={isLoading}>
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
