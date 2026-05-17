import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type ArcTimelineRenderable = Snippet | string | number | boolean | null | undefined;

export interface ArcTimelineStep {
	icon: ArcTimelineRenderable;
	content: ArcTimelineRenderable;
}

export interface ArcTimelineItem {
	time: ArcTimelineRenderable;
	steps: ArcTimelineStep[];
}

export interface ArcTimelineArcConfig {
	circleWidth?: number;
	angleBetweenMinorSteps?: number;
	lineCountFillBetweenSteps?: number;
	boundaryPlaceholderLinesCount?: number;
}

export interface ArcTimelineDefaultActiveStep {
	time?: ArcTimelineItem['time'];
	stepIndex?: number;
}

export type ArcTimelineProps = HTMLAttributes<HTMLDivElement> & {
	ref?: HTMLDivElement | null;
	data: ArcTimelineItem[];
	arcConfig?: ArcTimelineArcConfig;
	defaultActiveStep?: ArcTimelineDefaultActiveStep;
};
