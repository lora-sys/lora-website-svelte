import type { Component } from 'svelte';
import Signature from './signature.svelte';

export interface SignatureProps {
	text?: string;
	color?: string;
	fontSize?: number;
	duration?: number;
	delay?: number;
	class?: string;
	inView?: boolean;
	once?: boolean;
}

export type SignatureComponent = Component<SignatureProps>;

export { Signature };