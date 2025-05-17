import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-16">
        <div className="animate-pulse">
          <div className="h-[40vh] bg-gray-200" />
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#eb1924] hover:text-[#eb1924]/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#eb1924] transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {post.category}
              </div>
              <span>By {post.author}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose max-w-none">
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 font-medium">
                {post.excerpt}
              </p>
            )}
            <div className="text-gray-600 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}