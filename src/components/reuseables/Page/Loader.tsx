import { useEffect } from 'react';

import { Card, CircularProgress, Stack, Typography } from '@mui/material';



/** Render page loader */
const Loader = ({
	text = 'A moment please',
	useAlternate = false,
}: {
	text?: string;
	useAlternate?: boolean;
}): JSX.Element => {
	// Effect to make scrolling hidden
	useEffect(() => {
		const { body } = document;

		body.classList.add('overflow-hidden');
		return () => {
			body.classList.remove('overflow-hidden');
		};
	}, []);

	if (useAlternate) {
		return (
			<Card>
				<Stack
					spacing={2}
					justifyContent="center"
					alignItems="center"
					textAlign="center"
					sx={{ minHeight: 280 }}
				>
					<CircularProgress size={60} />
					{text && <Typography align="center">{text}</Typography>}
				</Stack>
			</Card>
		);
	}

	return (
		<div className="fixed h-screen w-screen p-4 flex justify-center items-center bg-gray-50 bg-opacity-90 top-0 left-0 z-[2000] overflow-hidden">
			<div className="flex flex-col justify-center items-center max-w-md space-y-3">
			
				<div className="loading-dots"></div>
				{text && (
					<Typography className="!mt-6" align="center" variant="body1">
						{text}
					</Typography>
				)}
			</div>
		</div>
	);
};

export default Loader;
