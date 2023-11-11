/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FC, ReactNode, SVGProps } from 'react';

import { MenuItemProps, StackProps } from '@mui/material';


import { SWRResponse } from 'swr';
import { UseDocumentActionDeleteProps, UseDocumentActionUploadProps } from '@/hooks';

export type ToastProps = {
  children: ReactNode;
};

export type ActionButtonMenuListItems = {
	key: string;
	label: string;
	labelInfo: string;
	action?: MenuItemProps['onClick'];
	icon?: FC<SVGProps<SVGSVGElement>>;
	iconProps?: {
		className?: string;
	};
};
export type SuspenseLoaderProps = {
	fullHeight?: boolean;
	text?: string;
};

export type ActionTabLinksProps = {
	disabled?: boolean;
	generatorPath?: Record<string, string>;
	className?: string;
	menuList?: {
		key: string;
		label: string;
		path?: string;
		isSelected: ({ key, url }: { key: string; url: string }) => boolean;
		isRejected?: ({ key, url }: { key: string; url: string }) => boolean;
		generateUrl?: boolean;
		icon?: FC<SVGProps<SVGSVGElement>>;
		iconProps?: {
			className?: string;
		};
		isDivided?: boolean;
		rejected?: boolean;
	}[];
	// displayCount?: number;
};

export type CollapsibleDropdownProps = {
	isLoading?: boolean;
	title?: string;
	description?: string;
	children: ReactNode;
	defaultOpen?: boolean;
};

export interface CollapsibleTogglerProps extends Omit<StackProps, 'onClick'> {
	title: string;
	isLoading?: boolean;
	children: ReactNode;
	defaultOpen?: boolean;
	description?: ReactNode;
}

export type DocumentViewerProps = {
	label: string;
	disabled?: boolean;
	fileUrl?: string;
	isLoading?: boolean;
	onUpload?: ChangeEventHandler<HTMLInputElement>;
	onDelete?: () => void;
	accept?: HTMLInputElement['accept'];
	disableUpload?: boolean;
	disableView?: boolean;
	disableDelete?: boolean;
	uploadProps?: Omit<UseDocumentActionUploadProps, 'event'>;
	deleteProps?: UseDocumentActionDeleteProps;
};



export type InformationDisplayProps = {
	dataCenter: Record<string, any>;
	list: {
		key: string;
		label: string;
		canCopy?: boolean;
		formatter?: (value?: any, dataCenter?: Record<string, any>) => string;
		tooltipFormatter?: (value?: any, dataCenter?: Record<string, any>) => string;
		renderCell?: (value?: any, dataCenter?: Record<string, any>) => ReactNode;
	}[];
	stackProps?: StackProps;
};

export type SuccessModalProps = {
	children?: ({ closeModal, icon }: { closeModal: () => void; icon: ReactNode }) => ReactNode;
	title?: string;
	description?: string;
	onClick?: () => void;
	showIcon?: boolean;
	btnText?: string;
};
