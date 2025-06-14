import desktopBgImg from '../assets/image/hero_img.jpg';
import mobileBgImg from '../assets/image/hero_img-sm.jpg';

const BackgroundImage = () => {
  return (
    <>
      {/* background image Desktop */}
      <img
        src={desktopBgImg}
        alt='background img'
        className='w-full h-auto object-cover absolute inset-0 brightness-50 shadow-2xl hidden md:block'
      />
      {/* background image Mobile */}
      <img
        src={mobileBgImg}
        alt='background img'
        className='w-full h-1/2 object-cover absolute inset-0 brightness-50 shadow-2xl block md:hidden'
      />
    </>
  );
};

export default BackgroundImage;
