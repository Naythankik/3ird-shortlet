import blogPosts from "../../data/blogs.jsx";

const BlogsPage = () => {
    return (
        <>
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
        </>
    );
};

export default BlogsPage;
