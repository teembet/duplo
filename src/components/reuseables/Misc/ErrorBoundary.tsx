import { Button, Card } from '@mui/material';
import { ReactNode, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';


/** Fallback View for error */
const ErrorFallback = ({
	resetErrorBoundary,
}: {
	error?: Error;
	resetErrorBoundary?: () => void;
}) => {
	return (
		<Card>
			<div className="max-w-md mx-auto space-y-4 my-auto flex flex-col items-center justify-center min-h-[450px]">
				<img
					src={''}
					className="max-w-full w-24 opacity-70"
				/>
				<h4 className='justify-center'>
					Oops! Something broke
				</h4>
				<p>
					It appears something triggered a shutdown of the platform. You can click the "Restart" button
					to jump-start the platform again.
				</p>
				<Button onClick={resetErrorBoundary}>Restart</Button>
			</div>
		</Card>
	);
};

// Boundary component
const AppErrorBoundary = ({ children }: { children?: ReactNode }): JSX.Element => {
	const [errorCount, setErrorCount] = useState(0);

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// Set error count
				setErrorCount(prevCount => (prevCount += 1));

				// Reload app if error persists
				if (errorCount >= 1) {
					window.location.reload();
				}
			}}
		>
			{children}
		</ErrorBoundary>
	);
};

export default AppErrorBoundary;
