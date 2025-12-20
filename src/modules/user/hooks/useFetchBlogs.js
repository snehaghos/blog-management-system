import { useState, useCallback } from "react";
import axiosClient from "../../../lib/axios";

export function useFetchBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get("/api/blogs");
      setBlogs(response.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBlogById = useCallback(async (blogId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.get(`/api/blogs/${blogId}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError(err.message || "Failed to fetch blog");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    blogs,
    loading,
    error,
    fetchAllBlogs,
    fetchBlogById,
  };
}
