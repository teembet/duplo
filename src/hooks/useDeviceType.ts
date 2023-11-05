import { useResponsive } from 'ahooks';

/** Get device type > Mobile, Tab or Desktop */
const useDeviceType = () => {
	const responsive = useResponsive();

	const isMobile = !responsive['lg'];
	const isTab = !responsive['xl'];
	const isDesktop = responsive['xl'];

	return {
		isMobile,
		isTab,
		isDesktop,
	};
};

export default useDeviceType;
