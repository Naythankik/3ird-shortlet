import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const blogPosts = [
    {
        id: 1,
        title: "Top 5 Shortlet Apartments in Lagos for Business Travelers",
        excerpt: "Discover the best shortlet apartments in Lagos that combine luxury, convenience, and proximity to major business hubs.",
        image: "https://source.unsplash.com/featured/?apartment,lagos",
        date: "April 15, 2025",
    },
    {
        id: 2,
        title: "Why Shortlets Are the Future of Travel Accommodation in Nigeria",
        excerpt: "Explore the rise of shortlet apartments and why more travelers are choosing them over traditional hotels.",
        image: "https://source.unsplash.com/featured/?apartment,nigeria",
        date: "March 30, 2025",
    },
    {
        id: 3,
        title: "How to Choose the Perfect Shortlet for Your Next Stay",
        excerpt: "Looking for a comfortable, stylish space for your trip? Here's a guide to picking the perfect shortlet apartment.",
        image: "https://source.unsplash.com/featured/?interior,home",
        date: "March 18, 2025",
    },
];

const BlogsPage = () => {
    return (
        <>
            <Header />
            <main className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">Our Blog</h1>
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <a href={`/blogs/${post.id}`} className="text-blue-600 hover:underline font-medium">
                                        Read more →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BlogsPage;
