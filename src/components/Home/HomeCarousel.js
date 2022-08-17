import './HomeCarousel.css';
import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
    return (
        <Carousel variant="dark" className="home-carousel">
        <Carousel.Item className='carousel-item'>
        <div className='img-container'>
        <img
            className="d-block w-100"
            src="/images/no-knead-bread-1.jpeg"
            alt="First slide"
          />
          <img
            className="d-block w-100"
            src="/images/vegan-matcha-milkshake-recipe-1.jpeg"
            alt="First slide"
          />
          <img
            className="d-block w-100 chia-img"
            src="/images/chocolate-chia-pudding-1.jpeg"
            alt="First slide"
          />
          </div>
        <Carousel.Caption>
            <p className='carousel-text'>From breads,desserts and bevarages...</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className='img-container'>
        <img
            className="d-block w-100"
            src="/images/best-herbed-potato-salad-.jpeg"
            alt="First slide"
          />
          <img
            className="d-block w-100"
            src="/images/roasted-fennel-and-potato-soup-4.jpeg"
            alt="First slide"
          />
          <img
            className="d-block w-100"
            src="/images/best-raw-sprouted-chickpea-hummus-recipe-6.jpeg"
            alt="First slide"
          />
          </div>
          <Carousel.Caption>
          <p className='carousel-text'>...to soups, salads and snacks</p>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>


    )   
}

