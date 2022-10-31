import {
    Home, OpenInNew, AttachMoney, CameraAlt, PersonAdd, BarChartSharp,
    AutoAwesomeMosaic, Settings, Login
} from '@mui/icons-material'

const sidebar_item = [
    {
        displayName: 'Dashboard',
        route: '/',
        icon: <Home />
    },
    {
        displayName: 'Products',
        route: '/products/list-product',
        icon: <OpenInNew />,
        listItem: [
            {
                name: 'List Product',
                routeItem: '/list-product'
            },
            {
                name: 'Add Product',
                routeItem: '/add-product'
            }
        ]
    },
    {
        displayName: 'Orders',
        route: '/orders',
        icon: <AttachMoney />
    },
    {
        displayName: 'Users',
        route: '/users/users-list',
        icon: <PersonAdd />,
        listItem: [
            {
                name: 'User List',
                routeItem: '/users-list'
            },
            {
                name: 'Create User',
                routeItem: '/create-user'
            }
        ]
    },
    {
        displayName: 'Categories',
        route: '/categories',
        icon: <AutoAwesomeMosaic />
    },
    {
        displayName: 'Media',
        route: '/media',
        icon: <CameraAlt />
    },
    {
        displayName: 'Report',
        route: '/report',
        icon: <BarChartSharp />
    },
    {
        displayName: 'Profile',
        route: '/profile',
        icon: <Settings />
    },
    {
        displayName: 'Login',
        route: '/login',
        icon: <Login />
    },

]

export default sidebar_item;