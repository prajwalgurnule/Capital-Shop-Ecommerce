import { Link } from 'react-router-dom';
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiSearch
} from "react-icons/fi";
import { useState, useEffect } from 'react';
import styles from "./Blog.module.css";

const Blog = () => {
  // Sample blog data
  const featuredPost = {
    id: 1,
    title: "The Future of Sustainable Fashion in 2023",
    excerpt: "Discover how eco-friendly materials and ethical production are shaping the future of the fashion industry.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "June 15, 2023",
    readTime: "5 min read",
    author: "Sarah Johnson",
    category: "Fashion",
  };

  const allBlogPosts = [
    {
      id: 2,
      title: "Top 10 Home Decor Trends for Modern Living",
      excerpt: "Transform your living space with these innovative decor ideas that combine style and functionality.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      date: "June 10, 2023",
      readTime: "4 min read",
      author: "Michael Chen",
      category: "Home Decor",
    },
    {
      id: 3,
      title: "Essential Tech Gadgets for Remote Workers",
      excerpt: "Boost your productivity with these must-have gadgets designed for the modern remote workforce.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "June 5, 2023",
      readTime: "6 min read",
      author: "David Wilson",
      category: "Technology",
    },
    {
      id: 4,
      title: "The Art of Minimalist Wardrobe: Less is More",
      excerpt: "Learn how to build a versatile capsule wardrobe that simplifies your daily routine.",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "May 28, 2023",
      readTime: "7 min read",
      author: "Emma Rodriguez",
      category: "Lifestyle",
    },
    {
      id: 5,
      title: "Sustainable Materials: What to Look for in Eco-Friendly Products",
      excerpt: "A guide to identifying truly sustainable materials when shopping for home and fashion items.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      date: "May 20, 2023",
      readTime: "8 min read",
      author: "James Peterson",
      category: "Sustainability",
    },
    {
      id: 6,
      title: "Smart Home Devices That Will Transform Your Daily Life",
      excerpt: "Discover how these innovative smart home technologies can automate and enhance your living space.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "May 15, 2023",
      readTime: "5 min read",
      author: "Lisa Wong",
      category: "Technology",
    },
  ];

  const categories = [
    { name: "All", count: allBlogPosts.length + 1 }, // +1 for featured post
    { name: "Technology", count: 2 },
    { name: "Home Decor", count: 1 },
    { name: "Lifestyle", count: 1 },
    { name: "Sustainability", count: 1 },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Fashion in 2023",
      date: "June 15, 2023",
    },
    {
      id: 3,
      title: "Essential Tech Gadgets for Remote Workers",
      date: "June 5, 2023",
    },
    {
      id: 5,
      title: "Sustainable Materials: What to Look for in Eco-Friendly Products",
      date: "May 20, 2023",
    },
  ];

  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  // Filter posts based on search term and selected category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Blog</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link> 
          <hr className={styles.hr} />
          <Link to="/blog" className={styles.link}>Blog</Link>
        </div>
      </div>
      
      <div className={styles.main}>
        <div className={styles.blogContainer}>
          {/* Featured Post - only shown when no filters are applied */}
          {(searchTerm === '' && selectedCategory === 'All') && (
            <div className={styles.featuredSection}>
              <h2 className={styles.sectionTitle}>Featured Post</h2>
              <div className={styles.featuredPost}>
                <div className={styles.featuredImage}>
                  <img src={featuredPost.image} alt={featuredPost.title} />
                  <div className={styles.categoryBadge}>{featuredPost.category}</div>
                </div>
                <div className={styles.featuredContent}>
                  <h3>{featuredPost.title}</h3>
                  <p className={styles.excerpt}>{featuredPost.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span><FiCalendar /> {featuredPost.date}</span>
                    <span><FiClock /> {featuredPost.readTime}</span>
                    <span><FiUser /> {featuredPost.author}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`} className={styles.readMoreBtn}>
                    Read more <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Recent Posts */}
          <div className={styles.recentSection}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Recent Posts' : `${selectedCategory} Posts`}
              {searchTerm && ` matching "${searchTerm}"`}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className={styles.noResults}>
                <p>No posts found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className={styles.postsGrid}>
                  {currentPosts.map(post => (
                    <div key={post.id} className={styles.blogCard}>
                      <div className={styles.postImage}>
                        <img src={post.image} alt={post.title} />
                        <div className={styles.categoryBadge}>{post.category}</div>
                      </div>
                      <div className={styles.postContent}>
                        <h3>{post.title}</h3>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.postMeta}>
                          <span><FiCalendar /> {post.date}</span>
                          <span><FiClock /> {post.readTime}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className={styles.readMoreBtn}>
                          Read more <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {filteredPosts.length > postsPerPage && (
                  <div className={styles.pagination}>
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? styles.active : ''}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Search */}
          <div className={styles.sidebarWidget}>
            <h3>Search</h3>
            <div className={styles.searchBox}>
              <FiSearch />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          {/* Categories */}
          <div className={styles.sidebarWidget}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleCategoryChange(category.name)}
                    className={selectedCategory === category.name ? styles.activeCategory : ''}
                  >
                    {category.name}
                    <span>{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Posts */}
          <div className={styles.sidebarWidget}>
            <h3>Popular Posts</h3>
            <ul className={styles.popularPosts}>
              {popularPosts.map(post => (
                <li key={post.id}>
                  <button onClick={scrollToTop}>
                    <h4>{post.title}</h4>
                    <p>{post.date}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;