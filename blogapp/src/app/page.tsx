"use client"
import CategorieSlider from "@/components/Categories/CategorieSlider";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import NavBar from "@/components/NavBar/NavBar";
import BlogSlider from "@/components/Blogcard/BlogSlider";
import Footer from "@/components/Footer/Footer";



export default function Home() {
  return (
    <div >
      <NavBar/>
      <h1>This is a Home Page</h1>
      <HomeSlider/>
      <CategorieSlider/>
      <BlogSlider/>
      <Footer/>
    </div>
  );
}
