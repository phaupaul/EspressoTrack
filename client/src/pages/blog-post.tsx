import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "./blog";
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen relative" style={{ background: 'var(--espresso-bg)' }}>
        <div className="noise-overlay" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4 text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] rounded-lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div className="surface-elevated rounded-xl p-6">
            <p className="text-[var(--espresso-muted)]">Blog post not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--espresso-bg)' }}>
      <div className="noise-overlay" />
      <div className="warm-gradient-radial fixed inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4 text-[var(--espresso-cream-dim)] hover:text-[var(--espresso-cream)] hover:bg-[rgba(200,149,108,0.08)] rounded-lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="surface-elevated rounded-xl p-8">
          <h1 className="text-4xl mb-4 text-[var(--espresso-cream)]">{post.title}</h1>
          <p className="text-lg text-[var(--espresso-muted)] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.description}</p>
          <div className="prose prose-invert max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-[var(--espresso-amber)] hover:text-[var(--espresso-amber-hover)] underline" />
                ),
                h2: ({node, ...props}) => (
                  <h2 {...props} className="text-2xl mt-8 mb-4 text-[var(--espresso-cream)]" style={{ fontFamily: "'Instrument Serif', serif" }} />
                ),
                h3: ({node, ...props}) => (
                  <h3 {...props} className="text-xl mt-6 mb-3 text-[var(--espresso-cream-dim)]" style={{ fontFamily: "'Instrument Serif', serif" }} />
                ),
                ul: ({node, ...props}) => (
                  <ul {...props} className="list-disc pl-6 mb-4 text-[var(--espresso-cream-dim)]" />
                ),
                ol: ({node, ...props}) => (
                  <ol {...props} className="list-decimal pl-6 mb-4 text-[var(--espresso-cream-dim)]" />
                ),
                p: ({node, ...props}) => (
                  <p {...props} className="mb-4 text-[var(--espresso-cream-dim)] leading-relaxed" />
                ),
                strong: ({node, ...props}) => (
                  <strong {...props} className="font-semibold text-[var(--espresso-cream)]" />
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
