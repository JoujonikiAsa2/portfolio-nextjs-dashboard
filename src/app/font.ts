import { Sora, Roboto } from 'next/font/google'
 
export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
})

export const sora = Sora({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})