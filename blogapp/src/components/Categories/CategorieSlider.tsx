import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import CategoryCard from './CategoryCard';

type Category={
  name:string;
  path:string;
  bgcolor:string;
}
function CategorieSlider() {
      const [categories,setCategories]=useState<Category[]>([]);
      const getCategories=()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
        .then((res)=>{
          return res.json();
        })
        .then(async(response)=>{
            const tempcat=await Promise.all(
              response.categories.map(async(category:string)=>({
                name: category,
                path:category,
                bgcolor:'white'

              }))
            );
            setCategories(tempcat);
        })
        .catch((error)=>{
          console.log(error);
        })
      }
      useEffect(()=>{
        getCategories()
      },[])
    // const categories=[
    //     {
    //         name:"Category 1",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 2",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 3",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 4",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 5",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 6",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 7",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 8",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 9",
    //         path:'#',
    //         bgcolor:generate(),
    //     },
    //     {
    //         name:"Category 10",
    //         path:'#',
    //         bgcolor:generate(),
    //     }
    // ]
    // function createHex() {
    //     var hexCode1 = "";
    //     var hexValues1 = "0123456789abcdef";
    
    //     for (var i = 0; i < 6; i++) {
    //       hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
    //     }
    //     return hexCode1;
    //   }
    //   function generate() {

    //     var deg = Math.floor(Math.random() * 360);
    
    //     var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() + ")";
    //     console.log(gradient);
    //     return gradient;
    //   }
  return (
    <div className='sliderout'>
        <h1 >Categories</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            categories.map((category)=>{
                return(
                    <SwiperSlide key={category.name}>
                        <CategoryCard {...category}/>
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </div>
  )
}

export default CategorieSlider
