import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "./blog";
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <p>Blog post not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="prose prose-amber lg:prose-xl max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
          <ReactMarkdown 
            components={{
              a: ({node, ...props}) => (
                <a {...props} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700" />
              ),
              h2: ({node, ...props}) => (
                <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />
              ),
              h3: ({node, ...props}) => (
                <h3 {...props} className="text-xl font-semibold mt-6 mb-3" />
              ),
              ul: ({node, ...props}) => (
                <ul {...props} className="list-disc pl-6 mb-4" />
              ),
              ol: ({node, ...props}) => (
                <ol {...props} className="list-decimal pl-6 mb-4" />
              ),
              p: ({node, ...props}) => (
                <p {...props} className="mb-4" />
              ),
              strong: ({node, ...props}) => (
                <strong {...props} className="font-semibold" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}