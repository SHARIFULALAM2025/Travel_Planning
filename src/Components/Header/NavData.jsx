// icons
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import MapIcon from '@mui/icons-material/Map'
import RateReviewIcon from '@mui/icons-material/RateReview'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LuggageIcon from '@mui/icons-material/Luggage'
import ArticleIcon from '@mui/icons-material/Article'
// nav config
export const navItems = [
  //  Public (Always visible)
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: <HomeIcon></HomeIcon>,
    access: 'public',
  },
  {
    id: 2,
    name: 'Explore',
    path: '/destinations',
    icon: <ExploreIcon></ExploreIcon>,
    access: 'public',
  },
  {
    id: 3,
    name: 'Reviews',
    path: '/reviews',
    icon: <RateReviewIcon></RateReviewIcon>,
    access: 'public',
  },
  {
    id: 4,
    name: 'Blog',
    path: '/blog',
    icon: <ArticleIcon></ArticleIcon>,
    access: 'public',
  },

  //  Private (Only when logged in)
  {
    id: 5,
    name: 'Plan Trip',
    path: '/plan',
    icon: <MapIcon></MapIcon>,
    access: 'private',
  },
  {
    id: 6,
    name: 'My Trips',
    path: '/myTrips',
    icon: <LuggageIcon></LuggageIcon>,
    access: 'private',
  },
  


]
