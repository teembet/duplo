import { Skeleton, SkeletonProps } from '@mui/material';

/** Mini loader with default settings */
const SkeletonLoader = ({ sx = {}, ...rest }: SkeletonProps) => {
	return <Skeleton animation="wave" sx={{ transform: 'none', ...sx }} {...rest} />;
};

export default SkeletonLoader;
