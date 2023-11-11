import clsx from 'clsx';
import { useEffect } from 'react';
import { SuspenseLoaderProps } from './types';
import { Card } from '@mui/material';


/** Render suspended component loader */
const SuspenseLoader = ({ text = '' }: SuspenseLoaderProps) => {
	useEffect(() => {
		const { body } = document;

		body.classList.toggle('overflow-hidden');
		return () => {
			if (body.classList.contains('overflow-hidden')) {
				body.classList.toggle('overflow-hidden');
			}
		};
	}, []);

	return (
		<Card className="h-screen w-screen fixed !bg-white !bg-opacity-80 !rounded-none flex justify-center items-center top-0 left-0">
			<Card
				className={clsx(
					'flex flex-col justify-center items-center max-w-md !gap-4 w-full !p-10'
				)}
			>
				<img src={''} className="max-w-full w-[80px]" />
				<div className="loading-dots"></div>
				{text && (
					<p className="!mt-4 justify-center">
						{'Just a moment please'}
					</p>
				)}
			</Card>
		</Card>
	);
};

export default SuspenseLoader;