'use client';

import { makeStore } from '@/lib/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={makeStore}>{children}</Provider>;
}