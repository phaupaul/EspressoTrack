import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Blog } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({ title: "Blog post deleted successfully" });
    },
  });

  return (
    <div className="container mx-auto py-4 px-4 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Blog Posts</h1>
        <Button onClick={() => navigate("/blog/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 bg-card rounded-lg border shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
              <div className="mt-4 text-sm text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No blog posts yet. Create your first post!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
