import { useNavigate } from 'react-router-dom';

import { Avatar, Card, IconButton, Menu, MenuItem, Slide } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';


import clsx from 'clsx';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

import useHeaderContext from '@/contexts/Header';
import { useUserLogout } from '@/hooks';
import useDeviceType from '@/hooks/useDeviceType';
import APP_PATHS from '@/paths.constants';
import useAuthentication from '@/store/authentication';
import { convertToTitleCase } from '@/utils/libs/charts';

const Header = () => {
	const [store] = useAuthentication();
	const trigger = useScrollTrigger();
	const navigate = useNavigate();
	const { headerState = {}, toggleMobileMenu } = useHeaderContext();
	const { user = {} } = store;
	const logoutUser = useUserLogout();
	const { isMobile } = useDeviceType();
	const { title = '', description = '' } = headerState;
	const { name="",role="" } = user;
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<Card
				className={clsx(
					'flex-row items-center lg:items-start gap-4 !rounded-none bg-transparent pt-4 pl-0 !bg-gray-background',
					isMobile && 'sticky top-0 !py-3 !px-3 z-[999] gap-2',
				)}
			>
				{isMobile && (
					<IconButton sx={{ p: 0.25, ml: -0.5 }} onClick={toggleMobileMenu}>
						{/* <MenuIcon className="text-[40px]" /> */}
					</IconButton>
				)}
				<div className="max-w-fit">
					{title && <p className={clsx('font-semibold', isMobile && 'text-sm')}>{title}</p>}
					{description && !isMobile && (
						<p className={clsx('text-sm text-gray-600', isMobile && 'text-xs')}>
							{description}
						</p>
					)}
				</div>
				<PopupState variant="popover" popupId="headerMenu">
					{popupState => {
						const { close, isOpen, anchorEl } = popupState;
						return (
							<>
								<div
									{...bindTrigger(popupState)}
									role="button"
									className="flex flex-row items-center gap-2 !rounded-none !ml-auto"
								>
									<Avatar
										sx={{ width: 45, height: 45, fontSize: `calc(var(--fluid-0) * 0.8)` }}
										src=""
										className="!text-blue-main !bg-[#EEF3FF]"
									>{`${name.substring(0, 1)}`}</Avatar>
									{!isMobile && (
										<div>
											<p className="font-medium text-sm max-w-[135px] text-ellipsis overflow-hidden whitespace-nowrap">
												{convertToTitleCase(name)}
											</p>
											<p className="text-xs text-gray-600">{convertToTitleCase(role)}</p>
										</div>
									)}
									{/* {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
									{isOpen ? '' : ''}
								</div>
								<Menu
									{...bindMenu(popupState)}
									disableAutoFocusItem
									MenuListProps={{
										sx: {
											display: 'flex',
											flexDirection: 'column',
											gap: 1,
										},
									}}
									PaperProps={{
										elevation: 0,
										sx: {
											mt: 1.5,
											minWidth: (anchorEl as unknown as HTMLDivElement)?.offsetWidth ?? 150,
											borderRadius: 2,
											boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
										},
									}}
								>
									<MenuItem
										// onClick={() => {
										// 	navigate(APP_PATHS.SETTINGS_PROFILE);
										// 	close();
										// }}
									>
										{/* <ProfileIcon className="mr-2 text-gray_main-80" /> */}
										<span className="text-sm">Profile</span>
									</MenuItem>
									<MenuItem
										sx={{
											color: 'error.main',
										}}
										onClick={() => {
											logoutUser(true, false);
											close();
										}}
									>
										{/* <LogoutIcon className="mr-2" /> */}
										<span className="text-sm">Logout</span>
									</MenuItem>
								</Menu>
							</>
						);
					}}
				</PopupState>
			</Card>
		</Slide>
	);
};

export default Header;
