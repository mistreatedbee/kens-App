import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/public/ProductCard';
import { SectionHeading } from '../components/shared/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'trending';
export function Shop() {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showFilters, setShowFilters] = useState(false);
  React.useEffect(() => {
    setSearchQuery(searchParam || '');
    setSelectedCategory(categoryParam || 'all');
  }, [searchParam, categoryParam]);
  // Update URL when category changes
  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };
  const activeProducts = products.filter((p) => p.isActive);
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...activeProducts];
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    // Filter by category
    if (selectedCategory !== 'all') {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        result = result.filter((p) => p.categoryId === category.id);
      }
    }
    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case 'price-desc':
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case 'trending':
        result.sort((a, b) =>
        b.isTrending === a.isTrending ? 0 : b.isTrending ? 1 : -1
        );
        break;
      case 'latest':
      default:
        result.sort(
          (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    return result;
  }, [activeProducts, searchQuery, selectedCategory, sortBy, categories]);
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeading
        title="Shop All"
        subtitle="Discover our complete collection." />
      

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors" />
          
        </div>

        {/* Filter Toggles */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors flex-1 md:flex-none justify-center ${showFilters ? 'bg-primary text-white border-primary' : 'bg-surface border-primary/15 text-fg hover:border-secondary'}`}>
            
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 bg-surface border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors appearance-none flex-1 md:flex-none cursor-pointer">
            
            <option value="latest">Latest Arrivals</option>
            <option value="trending">Trending</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          className="overflow-hidden mb-8">
          
            <div className="p-6 bg-surface border border-primary/15 rounded-2xl">
              <h3 className="text-fg font-medium mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-muted hover:bg-lightblue/20 hover:text-primary'}`}>
                
                  All Products
                </button>
                {categories.
              filter((c) => c.isActive).
              map((category) =>
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.slug ? 'bg-primary text-white' : 'bg-white text-muted hover:bg-lightblue/20 hover:text-primary'}`}>
                
                      {category.name}
                    </button>
              )}
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Results */}
      <div className="mb-6 text-muted text-sm">
        Showing {filteredAndSortedProducts.length} products
      </div>

      {filteredAndSortedProducts.length > 0 ?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) =>
        <ProductCard key={product.id} product={product} />
        )}
        </div> :

      <div className="py-24 text-center glass-card rounded-3xl">
          <div className="w-16 h-16 mx-auto bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-muted mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-medium text-fg mb-2">
            No products found
          </h3>
          <p className="text-muted mb-6">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
          onClick={() => {
            setSearchQuery('');
            handleCategoryChange('all');
          }}
          className="px-6 py-3 bg-black/10 dark:bg-white/10 text-fg rounded-full font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
          
            Clear Filters
          </button>
        </div>
      }
    </div>);

}
