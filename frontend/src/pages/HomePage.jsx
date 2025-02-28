
import HeroSlider from '../components/HeroSlider';
import FeaturedProduts from '../components/FeaturedProduts';
import HomeCategories from '../components/HomeCategories';
import Features from '../components/Features';

const HomePage = () => {
    
  return (
    <div className='bg-gray-100'>
        {/* hero */}
        <HeroSlider></HeroSlider>
        {/* Featured Produts */}
        <FeaturedProduts></FeaturedProduts>
    {/* categories */}
        <HomeCategories></HomeCategories>
    {/* features */}
        <Features></Features>
    </div>
  );
};

export default HomePage;