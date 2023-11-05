import { Card } from '@mui/material';
import { ReactNode } from 'react';



const UnauthenticatedLayout = ({
	children,
}: {
	
	children: ReactNode;
}) => {
	return (
		<Card
			className={`min-h-screen flex gap-4 flex-col 
			 bg-gray-background 
			bg-blue-dark relative items-center !rounded-none`}
		>
			{children}
			<footer
				className="mt-auto text-white bg-transparent"
				
			/>
		</Card>
	);
};

export default UnauthenticatedLayout;
