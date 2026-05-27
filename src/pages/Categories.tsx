import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SectionHeading } from '../components/shared/SectionHeading';
import { motion } from 'framer-motion';
export function Categories() {
  const { categories, products } = useStore();
  const activeCategories = categories.filter((c) => c.isActive);
  const getProductCount = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId && p.isActive).
    length;
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeading
        title="All Categories"
        subtitle="Browse our collections by category." />
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCategories.map((category, i) =>
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.1
          }}
          key={category.id}>
          
            <Link
            to={`/shop?category=${category.slug}`}
            className="group relative block aspect-[4/3] rounded-3xl overflow-hidden glass-card">
            
              <img
              src={
              category.image ||
              'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
              }
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {getProductCount(category.id)} Products
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                {category.description &&
              <p className="text-zinc-300 mt-4 line-clamp-2 text-sm max-w-sm">
                    {category.description}
                  </p>
              }
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>);

}
