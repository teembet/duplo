import { Fragment, useMemo, useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';

import {
  Card,
	Collapse,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
} from '@mui/material';
import clsx from 'clsx';
import { isEmpty } from 'lodash-es';

import { RouteSignal } from '@/components/router/types';
import useHeaderContext from '@/contexts/Header';
import usePermissionsContext from '@/contexts/Permission';
import useDeviceType from '@/hooks/useDeviceType';
import APP_PATHS from '@/paths.constants';

const { DASHBOARD } = APP_PATHS;

const Navigation = () => {
	const [openSubMenu, toggleSubMenu] = useState('');
	const { showMobileMenu, toggleMobileMenu } = useHeaderContext();
	const { navigationMenuList: ALLOWED_MENU_ITEMS, permissibleRoutes } = usePermissionsContext();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { isMobile } = useDeviceType();

	// Handle clicking of a group menu
	const handleOpenSubMenu = path => e => {
		e.preventDefault();
		toggleSubMenu(path);
	};

	// Push new route on click
	const handleNavigation = path => e => {
		e.preventDefault();
		navigate(path);
		isMobile && showMobileMenu && toggleMobileMenu();
	};

	const isOpenSubMenu = path => {
		if (openSubMenu) {
			return path === openSubMenu;
		}

		return pathname.includes(path);
	};

	// Get the default first route to use
	const DEFAULT_AUTHENTICATED_ROUTE = useMemo(() => {
		const AUTHENTICATED_ROUTES = permissibleRoutes.find(({ id }) => id === RouteSignal.PRIVATE);
		const { children = [] } = AUTHENTICATED_ROUTES ?? {};
		const FIRST_PATH = children?.[0]?.path ?? DASHBOARD;

		return FIRST_PATH;
	}, [permissibleRoutes]);

	const menuView = (
		<Card
			className={clsx(
				'bg-gray-background gap-4 sticky top-0 flex flex-col no-scrollbar overflow-y-scroll w-full h-screen px-3',
				isMobile ? 'max-w-full' : ' max-w-[200px] min-w-[200px]',
			)}

		>
			<Stack direction="row" mb={2} justifyContent="space-between">
				<Link to={DEFAULT_AUTHENTICATED_ROUTE}>
					<img
						src={'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fwoman-s-face-is-made-up-geometric-shapes-cyberpunk-colorful-fractalism-cubism_834088-1.jpg&tbnid=96P-KvD3OlnCJM&vet=12ahUKEwiQuvaL3ruCAxXHmicCHTbkBoMQMygAegQIARBN..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fart&docid=sh41fxbXi3YbwM&w=626&h=626&q=images&ved=2ahUKEwiQuvaL3ruCAxXHmicCHTbkBoMQMygAegQIARBN'}
						alt="logo"
						className="max-w-[100%] w-full px-3"
					/>
				</Link>
				{isMobile && (
					<IconButton sx={{ p: 0.25, mt: -1, mr: -1.5 }} onClick={toggleMobileMenu}>
						{/* <CloseIcon className="text-[40px]" /> */}
					</IconButton>
				)}
			</Stack>

			<List sx={{ width: '100%' }} component="nav" aria-labelledby="admin-menu">
				{ALLOWED_MENU_ITEMS.map(
					(
						{ path, key, icon: Icon, label, subMenus = [], matchingPaths: parentMatchingPaths = [] },
						index,
					) => {
						const isFirstItem = index === 0;
						const isGroupMenu = !!subMenus?.length;
						const open = isOpenSubMenu(path);

						// Setup collapse Icon to render
					//	const CollapseIcon = open ? ExpandMoreIcon : ExpandLessIcon;
						const CollapseIcon = open ? '' : '';

						// Determine if top-level path is active
						let isSelected = pathname.includes(path);

						if (parentMatchingPaths?.length) {
							isSelected = parentMatchingPaths.some(
								matchingPath => !isEmpty(matchPath(matchingPath, pathname)),
							);
						}

						// Construct menu variable to avoid repetition
						const mainMenuElement = (
							<ListItemButton
								component="a"
								{...(!isGroupMenu && {
									href: path,
								})}
								onClick={isGroupMenu ? handleOpenSubMenu(path) : handleNavigation(path)}
								sx={{
									py: 2,
									borderRadius: 1.25,
								}}
								className={clsx(
									'!rounded-lg !gap-1 hover:!no-underline !px-3 !py-1.5 !text-black ',
									!isSelected && 'hover:!bg-white',
									isSelected && isGroupMenu && '!bg-transparent',
									isSelected &&
										!isGroupMenu &&
										'!bg-[#EEF3FF] !text-blue-main hover:!bg-[#EEF3FF] !text-blue-main',
									isFirstItem ? '!mt-0' : '!mt-2',
								)}
								selected={isSelected}
							>
								<ListItemIcon sx={{ minWidth: 'auto', pr: 0.75, color: 'inherit' }}>
									<Icon />
								</ListItemIcon>
								<ListItemText
									primaryTypographyProps={{
										display: 'block',
										color: 'inherit',
										variant: 'body2',
									}}
									primary={label}
								/>

							{/*	{isGroupMenu && <CollapseIcon />} */}
							</ListItemButton>
						);

						return (
							<Fragment key={key}>
								{mainMenuElement}
								{isGroupMenu && (
									<Collapse key={`${key}-group-menu`} in={open} timeout="auto" unmountOnExit>
										<List className="!space-y-2" component="div">
											{subMenus?.map(
												({ path: childPath, key: childKey, label: childLabel, matchingPaths = [] }) => {
													let isChildSelected = pathname.includes(childPath);

													if (matchingPaths?.length) {
														isChildSelected = matchingPaths.some(
															matchingPath => !isEmpty(matchPath(matchingPath, pathname)),
														);
													}
													return (
														<ListItemButton
															key={childKey}
															sx={{
																ml: 0,
																mr: 0,
																pl: 5,
																pr: 2,
																borderRadius: 1.25,
															}}
															component="a"
															href={childPath}
															className={clsx(
																'!gap-1 hover:!no-underline !py-1.5',
																isChildSelected
																	? '!bg-[#EEF3FF] !text-blue-main'
																	: '!text-black !bg-transparent hover:!bg-white',
															)}
															onClick={handleNavigation(childPath)}
															selected={isChildSelected}
														>
															<ListItemText
																primary={childLabel}
																primaryTypographyProps={{
																	display: 'block',
																	color: 'inherit',
																	variant: 'body2',
																	width: '100%',
																	noWrap: true,
																}}
															/>
														</ListItemButton>
													);
												},
											)}
										</List>
									</Collapse>
								)}
							</Fragment>
						);
					},
				)}
			</List>
		</Card>
	);

	// Render mobile view
	if (isMobile) {
		return (
			<Drawer
				anchor="left"
				open={showMobileMenu}
				onClose={toggleMobileMenu}
				ModalProps={{
					keepMounted: true,
				}}
				PaperProps={{
					sx: {
						width: '100%',
						maxWidth: ['75%', '35%'],
					},
				}}
			>
				{menuView}
			</Drawer>
		);
	}

	return <>{menuView}</>;
};

export default Navigation;
