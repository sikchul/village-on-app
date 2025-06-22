import type { PropsWithChildren } from 'react';
import type { RouteComponentProps } from 'react-router-dom';

export interface PropsWithClassName {
  className?: string;
}

// 프로바이더 컴포넌트 props 기본 타입
export interface DefaultProviderProps extends PropsWithChildren {}
// 컴포넌트 props 기본 타입
export interface DefaultComponentProps extends PropsWithChildren, PropsWithClassName {}
// ionic 페이지 컴포넌트 props 기본 타입
export interface DefaultPageComponentProps extends RouteComponentProps {}
