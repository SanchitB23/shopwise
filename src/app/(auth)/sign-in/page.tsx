import React from 'react';
import Image from 'next/image';
import Logo from '@/resources/logo/logo_transparent.png';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SignIn = () => {
  const isSeller = false;
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={Logo} alt={'Logo'} className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your {isSeller ? 'seller' : ''} account
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

          {/*<div className="grid gap-6">*/}
          {/*  <form /!*onSubmit={handleSubmit(onSubmit)}*!/>*/}
          {/*    <div className="grid gap-2">*/}
          {/*      <div className="grid gap-1 py-2">*/}
          {/*        <Label htmlFor="email">Email</Label>*/}
          {/*        <Input*/}
          {/*          /!*{...register('email')}*!/*/}
          {/*          className={cn({*/}
          {/*            'focus-visible:ring-red-500': errors.email,*/}
          {/*          })}*/}
          {/*          placeholder="you@example.com"*/}
          {/*        />*/}
          {/*        /!*{errors?.email && <p className="text-sm text-red-500">{errors.email.message}</p>}*!/*/}
          {/*      </div>*/}

          {/*      <div className="grid gap-1 py-2">*/}
          {/*        <Label htmlFor="password">Password</Label>*/}
          {/*        <Input*/}
          {/*          /!*{...register('password')}*!/*/}
          {/*          type="password"*/}
          {/*          className={cn({*/}
          {/*            'focus-visible:ring-red-500': errors.password,*/}
          {/*          })}*/}
          {/*          placeholder="Password"*/}
          {/*        />*/}
          {/*        /!*{errors?.password && (*!/*/}
          {/*        /!*  <p className="text-sm text-red-500">{errors.password.message}</p>*!/*/}
          {/*        /!*)}*!/*/}
          {/*      </div>*/}

          {/*      <Button disabled={isLoading}>*/}
          {/*        /!*{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}*!/*/}
          {/*        Sign in*/}
          {/*      </Button>*/}
          {/*    </div>*/}
          {/*  </form>*/}

          {/*  <div className="relative">*/}
          {/*    <div aria-hidden="true" className="absolute inset-0 flex items-center">*/}
          {/*      <span className="w-full border-t" />*/}
          {/*    </div>*/}
          {/*    <div className="relative flex justify-center text-xs uppercase">*/}
          {/*      <span className="bg-background px-2 text-muted-foreground">or</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  /!*{isSeller ? (*!/*/}
          {/*  /!*  <Button onClick={continueAsBuyer} variant="secondary" disabled={isLoading}>*!/*/}
          {/*  /!*    Continue as customer*!/*/}
          {/*  /!*  </Button>*!/*/}
          {/*  /!*) : (*!/*/}
          {/*  /!*  <Button onClick={continueAsSeller} variant="secondary" disabled={isLoading}>*!/*/}
          {/*  /!*    Continue as seller*!/*/}
          {/*  /!*  </Button>*!/*/}
          {/*  /!*)}*!/*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default SignIn;
